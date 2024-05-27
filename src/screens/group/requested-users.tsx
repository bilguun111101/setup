import React, { memo, useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
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
import { useNavigation } from "@react-navigation/native";
import { ListUserCard } from "../../components/card/list-user";
import type { IUser } from "@goodtechsoft/xs-user-native";
import { GroupApi } from "../../apis";
import type { NavigationRoutes, RootStackParamList } from "../../navigation";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import useSWRInfinite from "swr/infinite";
import { useToast } from "react-native-toast-notifications";
import type { IGroup } from "../../interfaces";
import useSwr, { useSWRConfig } from "swr";
import { SkeletonListUserCard } from "../../components/card/skeleton-list-user";

type Props = NativeStackScreenProps<
  RootStackParamList,
  NavigationRoutes.Group_RequestedUsersScreen
>;

const RequestedUsersScreen = memo(({ route }: Props) => {
  const navigation = useNavigation();
  const { payload } = route.params;
  const toast = useToast();
  const [nextPage, setNextPage] = useState(false);
  const [value, setValue] = useState<string>("");
  const query = useDebounce(value, 300);
  const { mutate: groupMutate } = useSWRConfig();

  const { data, size, setSize, isLoading, mutate } = useSWRInfinite(
    index => `${payload._id}.swr.request.users.${index}`,
    async index => {
      const page = index.split(".").pop() || "";

      const res = await GroupApi.requestList({
        id: payload._id,
        page: parseInt(`${page || 1}`, 10) + 1,
        query: query,
      });

      return res;
    },
    {
      revalidateAll: true,
    },
  );

  const { mutate: memberList } = useSWRInfinite(
    index => `${payload._id}swr.group.members.${index}`,
  );
  const { data: groupData } = useSwr<IGroup>(`swr.group.${payload._id}`);

  const acceptRequest = async (item: IUser) => {
    await GroupApi.acceptMember({ id: payload._id, userId: item._id });
    groupData?.setMinusPendingCount(groupMutate);
    toast.show("Зөвшөөрлөө", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in",
    });
    setTimeout(() => {
      mutate();
      memberList();
      groupData?.setSignCount(groupMutate);
    }, 300);
  };

  const renderItem = useCallback(({ item }: { item: IUser }) => {
    return (
      <>
        <View style={styles.h15} />
        <ListUserCard
          onPress={async (user, type) => {
            switch (type) {
              case "isJoin":
                return acceptRequest(user);
              default:
                break;
            }
          }}
          isJoin
          user={item}
        />
      </>
    );
  }, []);

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
            description={`'${query}' нэртэй хэрэглэгч байхгүй байна`}
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

  if (flatData && (flatData || [])[0] === null) {
    return <View />;
  }

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
          center={<Text style={styles.title}>Хүсэлтүүд</Text>}
        />
      </View>
      <FlatList
        ListHeaderComponent={
          <>
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
          </>
        }
        data={flatData}
        ListFooterComponent={listFooter}
        onEndReached={async () => {
          setNextPage(true);
          setSize(size + 1);
          setNextPage(false);
        }}
        ListEmptyComponent={renderEmpty}
        keyExtractor={(item: IUser) => `${item._id}`}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        contentInset={{ top: 0, bottom: 20, left: 0, right: 0 }}
        contentInsetAdjustmentBehavior="automatic"
      />
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    backgroundColor: Colors.gray101,
  },
  header: {
    zIndex: 10,
  },
  h15: {
    height: 15,
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
  listContent: {
    marginTop: 10,
    backgroundColor: Colors.white,
    paddingVertical: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    color: Colors.primary,
  },
  input: {
    backgroundColor: Colors.gray101,
  },
  inputContainer: {
    paddingHorizontal: 18,
  },
  card: {
    backgroundColor: Colors.white,
    padding: 18,
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

RequestedUsersScreen.displayName = "RequestedUsersScreen";

export { RequestedUsersScreen };
