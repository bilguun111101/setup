import React, { memo, useCallback, useEffect, useState } from "react";
import { RefreshControl, StyleSheet, Text, View } from "react-native";
import {
  Button,
  Colors,
  CommunityIcon,
  Empty,
  IconSizes,
  Loader,
  SearchIcon,
  TextInput,
  useDebounce,
} from "@goodtechsoft/xs-core-native";
import { Tabs } from "react-native-collapsible-tab-view";
import { ListGroupCard } from "../card/list-group";
import { GridGroupCard } from "../card/grid-group";
import useSWRInfinite from "swr/infinite";
import { GroupApi } from "../../apis";
import { type IGroup } from "../../interfaces";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation";

const MyGroupTabScreen = memo(() => {
  const [value, setValue] = useState<string>("");
  const query = useDebounce(value, 300);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const { data, size, setSize, isLoading, mutate } = useSWRInfinite(
    index => `swr.group.my.query=${query}.${index}`,
    async index => {
      const page = index.split(".").pop() || "";

      const res = await GroupApi.groupList({
        page: parseInt(`${page || 1}`, 10) + 1,
        query: query,
      });

      return res;
    },
    {
      revalidateAll: true,
      revalidateOnFocus: false,
      revalidateFirstPage: false,
      revalidateIfStale: true,
    },
  );

  const {
    data: adminGroup,
    isLoading: adminisLoading,
    setSize: adminSetSize,
  } = useSWRInfinite(
    index => `swr.group.admin.${index}`,
    async index => {
      const page = index.split(".").pop() || "";

      const res = await GroupApi.groupList({
        isAdmin: true,
        page: parseInt(`${page || 1}`, 10) + 1,
      });

      return res;
    },
    {
      revalidateAll: true,
    },
  );

  const renderItem = useCallback(
    ({ index, item }: { index: number; item: IGroup }) => {
      if (!item) {
        return null;
      }
      return (
        <>
          {index % 2 !== 0 && <View style={styles.w10} />}
          <GridGroupCard joined payload={item} />
        </>
      );
    },
    [query],
  );

  const renderListItem = useCallback(({ item }: { item: IGroup }) => {
    if (!item) {
      return null;
    }
    return (
      <>
        {<View style={styles.h15} />}
        <ListGroupCard payload={item} />
      </>
    );
  }, []);

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
            description={`'${query}' нэртэй бүлэг байхгүй байна`}
            icon={
              <CommunityIcon size={IconSizes.Medium} color={Colors.white} />
            }
          />
        ) : (
          <Empty
            title={"Хоосон байна"}
            description="Та бүлэгт нэгдээгүй байна"
            icon={
              <CommunityIcon size={IconSizes.Medium} color={Colors.white} />
            }
          />
        )}
      </View>
    );
  }, [isLoading]);

  const flatData = (data || [])?.map(row => row?.rows).flat();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("Screen focused");
      mutate();
    });

    return unsubscribe;
  }, [navigation]);

  if (flatData && (flatData || [])[0] === null) {
    return <View />;
  }

  const adminData = (adminGroup || [])?.map(row => row?.rows).flat();

  if (adminGroup && (adminGroup || [])[0] === null) {
    return <View />;
  }

  return (
    <Tabs.FlatList
      keyboardDismissMode="on-drag"
      ListHeaderComponent={
        <>
          <Tabs.FlatList
            style={styles.adminList}
            ListHeaderComponent={
              <View>
                <Text style={styles.subTitle}>Таны бүлэг</Text>
              </View>
            }
            ListEmptyComponent={
              adminisLoading ? (
                <View style={styles.loader}>
                  <Loader />
                </View>
              ) : (
                <View style={styles.emptyGroup}>
                  <Text style={styles.emptyText}>
                    Таньд удирдаж буй бүлэг байхгүй байна.
                  </Text>
                  <Button
                    onPress={() =>
                      navigation.navigate(NavigationRoutes.Group_CreateScreen)
                    }
                    title={"Бүлэг үүсгэх"}
                  />
                </View>
              )
            }
            data={adminData}
            renderItem={renderListItem}
          />
          <View style={[styles.h10, styles.bgGray]} />
          <View style={styles.bgGray}>
            <View style={styles.borderTopRadius} />
          </View>
          <View style={styles.myGroups}>
            <Text style={styles.subTitle}>Таны нэгдсэн бүлэг</Text>
            <View style={styles.h15} />
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
        </>
      }
      style={styles.root}
      columnWrapperStyle={styles.listColumn}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          onRefresh={async () => {
            setRefreshing(true);
            setSize(1);
            adminSetSize(1);
            setTimeout(() => {
              setRefreshing(false);
            }, 1000);
          }}
          refreshing={refreshing}
        />
      }
      contentContainerStyle={styles.listContent}
      contentInset={{ top: 0, bottom: 20, left: 0, right: 0 }}
      contentInsetAdjustmentBehavior="automatic"
      renderItem={renderItem}
      data={flatData}
      ListEmptyComponent={renderEmpty()}
      onEndReached={() => {
        setSize(size + 1);
      }}
      numColumns={2}
    />
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.gray101,
  },
  h15: {
    height: 15,
  },
  h10: {
    height: 10,
  },
  loader: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  w10: {
    width: 10,
  },
  grid: {
    flex: 1,
    marginBottom: 20,
  },
  inputContainer: {},
  input: {
    backgroundColor: Colors.gray101,
  },
  card: {
    backgroundColor: Colors.white,
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  listContent: {
    marginTop: 10,
    paddingBottom: 20,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  listColumn: {
    flex: 1,
    paddingHorizontal: 18,
  },
  ph18: {
    paddingHorizontal: 18,
  },
  subTitle: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
  },
  bgGray: {
    flex: 1,
    backgroundColor: Colors.gray101,
  },
  borderTopRadius: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.white,
    height: 10,
  },
  myGroups: {
    paddingTop: 10,
    backgroundColor: Colors.white,
    paddingHorizontal: 18,
    paddingBottom: 15,
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
  adminList: {
    width: "100%",
    padding: 18,
  },
  adminContainer: {
    flex: 1,
    borderWidth: 1,
  },
  emptyText: {
    fontFamily: "Inter",
    color: Colors.primary,
    textAlign: "center",
  },
  emptyGroup: {
    flex: 1,
    gap: 15,
    marginTop: 15,
  },
});

MyGroupTabScreen.displayName = "MyGroupTabScreen";

export { MyGroupTabScreen };
