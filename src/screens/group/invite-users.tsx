import {
  AppBar,
  ArrowLeftIcon,
  Button,
  Colors,
  Empty,
  IconSizes,
  Loader,
  SearchIcon,
  TextInput,
  UserIcon,
  useDebounce,
} from "@goodtechsoft/xs-core-native";
import { type IUser, User } from "@goodtechsoft/xs-user-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { memo, useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { GroupApi } from "../../apis";
import { ListUserCard } from "../../components/card/list-user";
import type { NavigationRoutes, RootStackParamList } from "../../navigation";
import useSWRInfinite from "swr/infinite";
import useSWR, { useSWRConfig } from "swr";
import { SkeletonListUserCard } from "../../components/card/skeleton-list-user";

type Props = NativeStackScreenProps<
  RootStackParamList,
  NavigationRoutes.Group_InviteUsersScreen
>;

const InviteUsersScreen = memo(({ route }: Props) => {
  const [value, setValue] = useState<string>("");
  const [nextPage, setNextPage] = useState(false);
  const query = useDebounce(value, 300);
  const navigation = useNavigation();
  const { payload } = route.params;
  const { mutate } = useSWRConfig();
  const { data: user } = useSWR<IUser>("swr.user.me");

  const { data, size, setSize, isLoading } = useSWRInfinite(
    index => {
      return `${user?._id}.${query}.swr.followers|${index}`;
    },
    async url => {
      const nextPage = url.split("|").pop() || undefined;
      const res = await GroupApi.invitationList({
        limit: 10,
        page: parseInt(`${nextPage || 1}`, 10) + 1,
        query: query,
        id: payload._id,
      });
      return res;
    },
    {
      revalidateAll: true,
    },
  );

  const onPress = useCallback(async (user: IUser) => {
    const _user = User.fromJson(user);
    const sendData = {
      user: _user._id,
    };
    if (!_user.isInvited) {
      _user.setGroupInvite(mutate);
      await GroupApi.inviteMember({ id: payload._id, data: sendData });
    } else {
      _user.setGroupUnInvite(mutate);
      await GroupApi.inviteCancel({ id: payload._id, data: sendData });
    }
  }, []);

  const renderItem = useCallback(
    ({ index, item }: { index: number; item: IUser }) => {
      return (
        <>
          {index !== 0 && <View style={styles.h15} />}
          <ListUserCard onPress={user => onPress(user)} invite user={item} />
        </>
      );
    },
    [],
  );

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
            title={"Хоосон байна"}
            description={`'${query}' нэртэй хэрэглэгчт байхгүй байна`}
            icon={<UserIcon size={IconSizes.Medium} color={Colors.white} />}
          />
        ) : (
          <Empty
            title={"Хоосон байна"}
            icon={<UserIcon size={IconSizes.Medium} color={Colors.white} />}
          />
        )}
      </View>
    );
  }, [isLoading]);

  const flatData = (data || [])?.map(row => row?.rows).flat();

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <AppBar
          left={
            <Button
              type="text"
              icon={<ArrowLeftIcon size={IconSizes.ExtraLarge} />}
              onPress={() => navigation.goBack()}
            />
          }
          center={<Text style={styles.title}>Гишүүн урих</Text>}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Хайх"
                onChangeText={value => setValue(value)}
                style={styles.input}
                prefix={
                  <SearchIcon color={Colors.gray103} size={IconSizes.Medium} />
                }
              />
            </View>
          </View>
        }
        data={flatData}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty()}
        ListFooterComponent={listFooter}
        onEndReached={async () => {
          setNextPage(true);
          setSize(size + 1);
          setNextPage(false);
        }}
        contentContainerStyle={styles.listContent}
        contentInset={{ top: 0, bottom: 20, left: 0, right: 0 }}
        contentInsetAdjustmentBehavior="automatic"
      />
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.gray101,
  },
  header: {
    zIndex: 10,
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
  headerContainer: {
    backgroundColor: Colors.gray101,
  },
  listContent: {
    marginTop: 10,
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 22,
    color: Colors.primary,
  },
  bgGray: {
    backgroundColor: Colors.gray101,
  },
  card: {
    backgroundColor: Colors.white,
    padding: 18,
    borderRadius: 10,
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
  requestCard: {},
  borderTopRadius: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.white,
    height: 10,
  },
  input: {
    backgroundColor: Colors.gray101,
  },
  inputContainer: {
    padding: 18,
    backgroundColor: Colors.white,
  },
});

InviteUsersScreen.displayName = "InviteUsersScreen";

export { InviteUsersScreen };
