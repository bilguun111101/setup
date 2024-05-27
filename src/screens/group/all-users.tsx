import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { memo, useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import useSWRInfinite from "swr/infinite";
import { GroupApi } from "../../apis";
import { ListUserCard } from "../../components/card/list-user";
import { RequestListCard } from "../../components/card/request-list";
import { NavigationRoutes, type RootStackParamList } from "../../navigation";
import { SkeletonListUserCard } from "../../components/card/skeleton-list-user";

type Props = NativeStackScreenProps<
  RootStackParamList,
  NavigationRoutes.Group_AllUsersScreen
>;

const AllUsersScreen = memo(({ route }: Props) => {
  const navigation = useNavigation();
  const [value, setValue] = useState<string>("");
  const [nextPage, setNextPage] = useState(false);
  // const query = useDebounce(value, 300);
  const { payload } = route.params;

  const { data, size, setSize, isLoading } = useSWRInfinite(
    index => `${payload._id}${query}swr.group.members.${index}`,
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

  const { data: requestedData } = useSWRInfinite(
    index => `${payload._id}.swr.request.users.${index}`,
    async index => {
      const page = index.split(".").pop() || "";
      const res = await GroupApi.requestList({
        id: payload._id,
        page: parseInt(`${page || 1}`, 10) + 1,
      });
      return res;
    },
    {
      revalidateAll: false,
    },
  );

  const onPress = useCallback((item: any) => {
    navigation.navigate(NavigationRoutes.Group_UserMoreSheet, {
      payload: payload,
      user: item,
    });
  }, []);

  const renderItem = useCallback(
    ({ index, item }: { index: number; item: any }) => {
      return (
        <>
          {index !== 0 && <View style={styles.h15} />}
          <ListUserCard
            onPress={user => onPress(user)}
            more
            user={item}
            isShowAdminReq
          />
        </>
      );
    },
    [],
  );

  const renderEmpty = useCallback(() => {
    if (isLoading) {
      return (
        <View style={styles.empty}>
        </View>
      );
    }

    return (
      <View style={styles.empty}>
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

  const reqData = (requestedData || [])?.map(item => item.rows).flat();

  const flatData = (data || [])?.map(row => row?.rows).flat();

  if (flatData && (flatData || [])[0] === null) {
    return <View />;
  }

  return (
    <View style={styles.root}>
      <View style={styles.header}>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            {reqData!.length > 0 && (
              <View style={styles.requestCard}>
                <RequestListCard data={reqData} payload={payload} />
                <View style={[styles.h10, styles.bgGray]} />
              </View>
            )}
            <View style={styles.borderTopRadius} />
            <View style={styles.inputContainer}>
              {/* <TextInput
                placeholder="Хайх"
                onChangeText={value => setValue(value)}
                style={styles.input}
                prefix={
                  <SearchIcon color={Colors.gray103} size={IconSizes.Medium} />
                }
              /> */}
            </View>
          </View>
        }
        data={flatData}
        ListFooterComponent={listFooter}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        onEndReached={async () => {
          setNextPage(true);
          setSize(size + 1);
          setNextPage(false);
        }}
        contentContainerStyle={styles.listContent}
        style={styles.list}
        contentInset={{ top: 0, bottom: 20, left: 0, right: 0 }}
        contentInsetAdjustmentBehavior="automatic"
      />
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // backgroundColor: Colors.gray101,
  },
  list: {
    flex: 1,
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
    // backgroundColor: Colors.gray101,
  },
  listContent: {
    marginTop: 10,
    // backgroundColor: Colors.white,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 22,
    // color: Colors.primary,
  },
  bgGray: {
    // backgroundColor: Colors.gray101,
  },
  card: {
    // backgroundColor: Colors.white,
    padding: 18,
    borderRadius: 10,
  },
  empty: {
    marginTop: 10,
    borderWidth: 0,
    // backgroundColor: Colors.white,
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
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: Colors.white,
  },
});

AllUsersScreen.displayName = "AllUsersScreen";

export { AllUsersScreen };
