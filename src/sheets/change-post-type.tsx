import { FlatList, StyleSheet, View, Text } from "react-native";
import React, { memo, useCallback } from "react";
import { Colors } from "@goodtechsoft/xs-core-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type {
  BottomSheetParamList,
  NavigationRoutes,
} from "../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { SelectItem } from "../components/layout/select-item";

type Props = NativeStackScreenProps<
  BottomSheetParamList,
  NavigationRoutes.Group_ChangePostTypeSheet
>;

export type IPostType = {
  name: string;
  value: boolean;
};

const ChangePostTypeSheet = memo(({ route }: Props) => {
  const navigation = useNavigation();
  const { onChange } = route.params;

  const postTypeData = [
    { name: "Шууд нийтлэгдэнэ", value: true },
    { name: "Админ зөвшөөрнө", value: false },
  ];

  const onSelect = useCallback(
    (item: any) => {
      onChange("postType", item);
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

  const listHeader = useCallback(() => {
    return (
      <>
        <Text style={styles.description}>
          Та бүлгийн нууцлалаа зөв сонгоно уу
        </Text>
        <View style={styles.h10} />
      </>
    );
  }, []);

  return (
    <View style={styles.root}>
      <FlatList
        renderItem={renderItem}
        style={styles.container}
        ListHeaderComponent={listHeader}
        onEndReachedThreshold={0.5}
        data={postTypeData}
      />
    </View>
  );
});

ChangePostTypeSheet.displayName = "ChangePostTypeSheet";

export { ChangePostTypeSheet };

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
});
