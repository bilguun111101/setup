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
  NavigationRoutes.Group_ChangePrivacySheet
>;

const ChangePrivacySheet = memo(({ route }: Props) => {
  const navigation = useNavigation();
  const { onChange } = route.params;

  const privacyData = [
    { name: "Нээлттэй", value: "PUBLIC" },
    { name: "Нууцлалтай", value: "PRIVATE" },
  ];

  const onSelect = useCallback(
    (item: any) => {
      onChange("privacy", item);
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
        data={privacyData}
      />
    </View>
  );
});

ChangePrivacySheet.displayName = "ChangePrivacySheet";

export { ChangePrivacySheet };

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
