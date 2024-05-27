import React, { memo, useCallback, useState } from "react";
import { RefreshControl, StyleSheet, Text, View } from "react-native";
import {
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
import { GridGroupCard } from "../card/grid-group";
import useSWRInfinite from "swr/infinite";
import { GroupApi } from "../../apis";
import type { IGroup } from "../../interfaces";

const DiscoveredTabScreen = memo(() => {
  const [value, setValue] = useState<string>("");
  const [refreshing, setRefreshing] = useState(false);
  const query = useDebounce(value, 300);

  const { data, size, setSize, isLoading } = useSWRInfinite(
    index => `swr.group.suggest.${index}${query}`,
    async index => {
      const page = index.split(".").pop() || "";

      const res = await GroupApi.suggestList({
        page: parseInt(`${page || 1}`, 10) + 1,
        query: query,
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
        return <View />;
      }
      return (
        <>
          {index % 2 !== 0 && <View style={styles.w10} />}
          <GridGroupCard isModal payload={item} />
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
            title={"Хоосон байна"}
            description={`'${query}' нэртэй бүлэг байхгүй байна`}
            icon={
              <CommunityIcon size={IconSizes.Medium} color={Colors.white} />
            }
          />
        ) : (
          <Empty
            title={"Хоосон байна"}
            icon={
              <CommunityIcon size={IconSizes.Medium} color={Colors.white} />
            }
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
    <Tabs.FlatList
      ListHeaderComponent={
        <>
          <View style={styles.card}>
            <Text style={styles.subTitle}>Санал болгох</Text>
            <View style={styles.h15} />
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
      style={styles.root}
      columnWrapperStyle={styles.listColumn}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
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
      contentInset={{ top: 0, bottom: 20, left: 0, right: 0 }}
      contentInsetAdjustmentBehavior="automatic"
      renderItem={renderItem}
      ListEmptyComponent={renderEmpty}
      data={flatData}
      onEndReached={() => {
        setSize(size + 1);
      }}
      numColumns={2}
    />
  );
});

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    backgroundColor: Colors.gray101,
  },
  h15: {
    height: 15,
  },
  h10: {
    height: 10,
  },
  w10: {
    width: 10,
  },
  grid: {
    flex: 1,
    marginBottom: 20,
  },
  bgGray: {
    backgroundColor: Colors.gray101,
  },
  card: {
    padding: 18,
  },
  content: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  listColumn: {
    paddingHorizontal: 18,
  },
  ph18: {
    paddingHorizontal: 18,
  },
  input: {
    backgroundColor: Colors.gray101,
  },
  inputContainer: {},
  subTitle: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
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

DiscoveredTabScreen.displayName = "DiscoveredTabScreen";

export { DiscoveredTabScreen };
