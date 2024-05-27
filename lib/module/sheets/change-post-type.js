import { FlatList, StyleSheet, View, Text } from "react-native";
import React, { memo, useCallback } from "react";
import { Colors } from "@goodtechsoft/xs-core-native";
import { useNavigation } from "@react-navigation/native";
import { SelectItem } from "../components/layout/select-item";
const ChangePostTypeSheet = /*#__PURE__*/memo(({
  route
}) => {
  const navigation = useNavigation();
  const {
    onChange
  } = route.params;
  const postTypeData = [{
    name: "Шууд нийтлэгдэнэ",
    value: true
  }, {
    name: "Админ зөвшөөрнө",
    value: false
  }];
  const onSelect = useCallback(item => {
    onChange("postType", item);
    navigation.goBack();
  }, [navigation, onChange]);
  const renderItem = useCallback(({
    item
  }) => {
    return /*#__PURE__*/React.createElement(SelectItem, {
      item: item,
      onSelect: () => onSelect(item)
    });
  }, [onSelect]);
  const listHeader = useCallback(() => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, {
      style: styles.description
    }, "\u0422\u0430 \u0431\u04AF\u043B\u0433\u0438\u0439\u043D \u043D\u0443\u0443\u0446\u043B\u0430\u043B\u0430\u0430 \u0437\u04E9\u0432 \u0441\u043E\u043D\u0433\u043E\u043D\u043E \u0443\u0443"), /*#__PURE__*/React.createElement(View, {
      style: styles.h10
    }));
  }, []);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(FlatList, {
    renderItem: renderItem,
    style: styles.container,
    ListHeaderComponent: listHeader,
    onEndReachedThreshold: 0.5,
    data: postTypeData
  }));
});
ChangePostTypeSheet.displayName = "ChangePostTypeSheet";
export { ChangePostTypeSheet };
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white
  },
  container: {
    marginHorizontal: 10,
    flex: 1,
    backgroundColor: Colors.gray101,
    paddingTop: 15,
    paddingHorizontal: 15,
    borderRadius: 12
  },
  description: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
    color: Colors.gray104,
    fontFamily: "Inter",
    textAlign: "center"
  },
  h10: {
    height: 10
  }
});
//# sourceMappingURL=change-post-type.js.map