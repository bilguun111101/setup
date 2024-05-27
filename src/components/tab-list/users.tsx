import React, { memo, useCallback, useState } from "react";
import { RefreshControl, StyleSheet, Text, View } from "react-native";
import {
  Colors,
  Empty,
  IconSizes,
  Loader,
  SearchIcon,
  TextInput,
  UserIcon,
  UsersIcon,
  useDebounce,
} from "@goodtechsoft/xs-core-native";
import { Tabs } from "react-native-collapsible-tab-view";
import { ListUserCard } from "../card/list-user";
import { type IUser, User } from "@goodtechsoft/xs-user-native";
import { GroupApi, UserApi } from "../../apis";
import useSWRInfinite from "swr/infinite";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation";
import { UserNavigationRoutes } from "@goodtechsoft/xs-user-native";
import { useSWRConfig } from "swr";
import type { IGroup } from "../../interfaces";
import { SkeletonListUserCard } from "../card/skeleton-list-user";

type Props = {
  payload: IGroup;
};

const UsersTabScreen = memo((props: Props) => {
  const { payload } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [value, setValue] = useState<string>("");
  const query = useDebounce(value, 300);
  const { mutate } = useSWRConfig();
  const [nextPage, setNextPage] = useState(false);
  const navigation = useNavigation();

  const { data, size, setSize, isLoading } = useSWRInfinite(
    index => `${payload._id}swr.group.members.${index}${query}`,
    async index => {
      const page = index.split(".").pop() || "";

      const res = await GroupApi.memberList({
        page: parseInt(`${page || 1}`, 10) + 1,
        query: query,
        id: payload._id,
      });

      return res;
    },
    {
      revalidateAll: true,
    },
  );

  const { data: adminData, isLoading: adminIsLoading } = useSWRInfinite(
    index => `${payload._id}swr.group.admins.${index}`,
    async index => {
      const page = index.split(".").pop() || "";

      const res = await GroupApi.adminList({
        page: parseInt(`${page || 1}`, 10) + 1,
        id: payload._id,
      });

      return res;
    },
    {
      revalidateAll: true,
    },
  );

  const flatData = (data || [])?.map(row => row?.rows).flat();

  if (flatData && (flatData || [])[0] === null) {
    return <View />;
  }

  const flatAdminData = (adminData || [])?.map(row => row?.rows).flat();

  if (flatAdminData && (flatAdminData || [])[0] === null) {
    return <View />;
  }

  const onUnFollow = useCallback(
    (user: IUser) => {
      const _user = User.fromJson(user);
      if (_user.profilePrivacy) {
        navigation.navigate(UserNavigationRoutes.User_UnfollowConfirmSheet, {
          payload: user,
        });
      } else {
        _user.setUnFollow(mutate);
        UserApi.unfollow(_user._id);
      }
    },
    [mutate, navigation],
  );

  const onFollow = useCallback(
    async (user: IUser) => {
      const _user = User.fromJson(user);
      if (_user.profilePrivacy) {
        const res = await UserApi.follow(_user._id);
        _user.updateRequest(res._id, mutate);
      } else {
        _user.setFollow(mutate);
        await UserApi.follow(_user._id);
      }
    },
    [mutate],
  );

  const onRemoveRequest = useCallback(
    (user: IUser) => {
      const _user = User.fromJson(user);
      _user.setRemoveRequest(mutate);
      UserApi.removeRequestCancel(_user.userRequest as string);
    },
    [mutate],
  );

  const onLike = useCallback((user: IUser) => {
    const _user = User.fromJson(user);
    _user.setPageLike(mutate, user._id);
    UserApi.likePage(user._id);
  }, []);

  const unLike = useCallback((user: IUser) => {
    const _user = User.fromJson(user);
    _user.setPageUnLike(mutate, user._id);
    UserApi.unlikePage(user._id);
  }, []);

  const onPress = useCallback(async (user: IUser, type: string) => {
    switch (type) {
      case "me":
        navigation.navigate(NavigationRoutes.Group_UserMoreSheet, {
          user: user,
          payload: payload,
        });
        break;
      case "isFollowing":
        onUnFollow(user);
        break;
      case "userRequested":
        onRemoveRequest(user);
        break;
      case "follow":
        onFollow(user);
        break;
      case "isLike":
        onLike(user);
        break;
      case "unLike":
        unLike(user);
        break;
      default:
        break;
    }
  }, []);

  const renderItem = useCallback(
    ({ index, item }: { index: number; item: IUser }) => {
      return (
        <>
          {index !== 0 && <View style={styles.h15}></View>}
          <ListUserCard onPress={onPress} user={item} />
        </>
      );
    },
    [],
  );

  const renderEmpty = useCallback(() => {
    if (isLoading) {
      return (
        <View style={styles.empty}>
          <Loader />
        </View>
      );
    }

    return (
      <View style={styles.empty}>
        {query ? (
          <Empty
            title={"Хайсан хэрэглэгч олдсонгүй"}
            description={`'${query}' нэртэй хэрэглэгч байхгүй байна`}
            icon={<UserIcon size={IconSizes.Medium} color={Colors.white} />}
          />
        ) : (
          <Empty
            title={"Хоосон байна"}
            description="Энэ бүлэгт хэрэглэгч байхгүй байна"
            icon={<UsersIcon size={IconSizes.Medium} color={Colors.white} />}
          />
        )}
      </View>
    );
  }, [isLoading]);

  const listFooter = useCallback(() => {
    if (nextPage) {
      return (
        <View style={styles.ph18}>
          <View style={styles.h15} />
          <SkeletonListUserCard />
          <View style={styles.h15} />
          <SkeletonListUserCard />
        </View>
      );
    } else {
      return <View />;
    }
  }, [nextPage]);

  return (
    <>
      {payload.isJoined || payload.privacy === "PUBLIC" ? (
        <Tabs.FlatList
          data={flatData}
          renderItem={renderItem}
          style={styles.root}
          refreshControl={
            <RefreshControl
              onRefresh={async () => {
                setRefreshing(true);
                setSize(1);
                setTimeout(() => {
                  setRefreshing(false);
                }, 1000);
              }}
              refreshing={refreshing}
            />
          }
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <View style={styles.adminCard}>
                <View style={styles.ph18}>
                  <Text style={styles.subTitle}>Админ</Text>
                </View>
                <View style={styles.h15} />
                <Tabs.FlatList
                  ListEmptyComponent={
                    adminIsLoading ? (
                      <View style={styles.loader}>
                        <Loader />
                      </View>
                    ) : (
                      <View />
                    )
                  }
                  data={flatAdminData}
                  renderItem={renderItem}
                />
              </View>
              <View style={[styles.h10, styles.bgGray]} />
              <View style={styles.borderTopRadius}></View>
              <View style={styles.allUser}>
                <View style={styles.h10} />
                <Text style={styles.subTitle}>Нийт гишүүд</Text>
                <View style={styles.h15} />
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Хайх"
                    onChangeText={value => setValue(value)}
                    style={styles.input}
                    prefix={
                      <SearchIcon
                        color={Colors.gray103}
                        size={IconSizes.Medium}
                      />
                    }
                  />
                </View>
              </View>
            </View>
          }
          ListFooterComponent={listFooter}
          ListEmptyComponent={renderEmpty}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.listContent}
          contentInset={{ top: 0, bottom: 20, left: 0, right: 0 }}
          onEndReached={async () => {
            setNextPage(true);
            setSize(size + 1);
            setNextPage(false);
          }}
          contentInsetAdjustmentBehavior="automatic"
        />
      ) : (
        <View style={styles.root} />
      )}
    </>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.gray101,
  },
  h20: {
    height: 20,
  },
  h15: {
    height: 15,
  },
  h10: {
    height: 10,
  },
  h4: {
    height: 4,
  },
  w4: {
    width: 4,
  },
  ph18: {
    paddingHorizontal: 18,
  },
  bgGray: {
    backgroundColor: Colors.gray101,
  },
  listContent: {
    marginTop: 0,
    backgroundColor: Colors.white,
    paddingBottom: 20,
  },
  subTitle: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
  },
  allUser: {
    backgroundColor: Colors.white,
    paddingHorizontal: 18,
    paddingBottom: 15,
  },
  inputContainer: {},
  input: {
    backgroundColor: Colors.gray101,
  },
  headerContainer: {
    backgroundColor: Colors.gray101,
  },
  card: {
    backgroundColor: Colors.white,
    padding: 18,
    borderRadius: 10,
  },
  loader: {
    width: "100%",
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  borderTopRadius: {
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    backgroundColor: Colors.white,
    height: 10,
  },
  adminCard: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: Colors.white,
    paddingVertical: 18,
  },
  empty: {
    marginTop: 10,
    borderWidth: 0,
    backgroundColor: Colors.white,
    borderRadius: 10,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
});

UsersTabScreen.displayName = "UsersTabScreen";

export { UsersTabScreen };
