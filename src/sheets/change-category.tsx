import { FlatList, StyleSheet, View, Text } from "react-native";
import React, { memo, useCallback } from "react";
import { Colors, Empty, Loader } from "@goodtechsoft/xs-core-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  type BottomSheetParamList,
  NavigationRoutes,
} from "../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { SelectItem } from "../components/layout/select-item";
import useSWRInfinite from "swr/infinite";
import { GroupApi } from "../apis";

type Props = NativeStackScreenProps<
  BottomSheetParamList,
  NavigationRoutes.Group_ChangeCategorySheet
>;

export type IPrivacyType = {
  name: string;
  value: string;
};

const ChangeCategorySheet = memo(({ route }: Props) => {
  const navigation = useNavigation();
  const { onChange } = route.params;

  const { data, isLoading } = useSWRInfinite(
    index => `swr.group.category.${index}`,
    async index => {
      const page = index.split(".").pop();

      const res = await GroupApi.categoryList({
        page: parseInt(`${page || 1}`, 10) + 1,
      });

      return res;
    },
    {
      revalidateAll: true,
    },
  );

  const onSelect = useCallback(
    (item: IPrivacyType) => {
      onChange("category", item);
      navigation.goBack();
    },
    [navigation, onChange],
  );

  const renderItem = useCallback(
    ({ item }: { item: any }) => {
      return <SelectItem item={item} onSelect={() => onSelect(item)} />;
    },
    [onSelect],
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
        <Empty
          title={"Хоосон байна"}
          description="Ангилал одоогоор оруулаагүй байна"
        />
      </View>
    );
  }, [isLoading]);

  const listHeader = useCallback(() => {
    return (
      <>
        <Text style={styles.description}>
          Та бүлгийн ангилалаа зөв сонгоно уу
        </Text>
        <View style={styles.h10} />
      </>
    );
  }, []);

  return (
    <View style={styles.root}>
      <FlatList
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        style={styles.container}
        ListHeaderComponent={listHeader}
        initialNumToRender={10}
        onEndReachedThreshold={0.5}
        data={data ? data.map(item => item.rows).flat() : []}
      />
    </View>
  );
});

ChangeCategorySheet.displayName = "ChangeCategorySheet";

export { ChangeCategorySheet };

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    marginHorizontal: 10,
    flex: 1,
    backgroundColor: Colors.gray101,
    paddingTop: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
  },
  description: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
    color: Colors.gray104,
    fontFamily: "Inter",
    textAlign: "center",
  },
  h10: {
    height: 10,
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
