import { FlatList, StyleSheet, View, Text } from "react-native";
import React, { memo, useCallback } from "react";
import { Colors, Empty, Loader } from "@goodtechsoft/xs-core-native";
import { useNavigation } from "@react-navigation/native";
import { SelectItem } from "../components/layout/select-item";
import useSWRInfinite from "swr/infinite";
import { GroupApi } from "../apis";
const ChangeCategorySheet = /*#__PURE__*/memo(({
  route
}) => {
  const navigation = useNavigation();
  const {
    onChange
  } = route.params;
  const {
    data,
    isLoading
  } = useSWRInfinite(index => `swr.group.category.${index}`, async index => {
    const page = index.split(".").pop();
    const res = await GroupApi.categoryList({
      page: parseInt(`${page || 1}`, 10) + 1
    });
    return res;
  }, {
    revalidateAll: true
  });
  const onSelect = useCallback(item => {
    onChange("category", item);
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
  const renderEmpty = useCallback(() => {
    if (isLoading) {
      return /*#__PURE__*/React.createElement(View, {
        style: styles.empty
      }, /*#__PURE__*/React.createElement(Loader, null));
    }
    return /*#__PURE__*/React.createElement(View, {
      style: styles.empty
    }, /*#__PURE__*/React.createElement(Empty, {
      title: "Хоосон байна",
      description: "\u0410\u043D\u0433\u0438\u043B\u0430\u043B \u043E\u0434\u043E\u043E\u0433\u043E\u043E\u0440 \u043E\u0440\u0443\u0443\u043B\u0430\u0430\u0433\u04AF\u0439 \u0431\u0430\u0439\u043D\u0430"
    }));
  }, [isLoading]);
  const listHeader = useCallback(() => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, {
      style: styles.description
    }, "\u0422\u0430 \u0431\u04AF\u043B\u0433\u0438\u0439\u043D \u0430\u043D\u0433\u0438\u043B\u0430\u043B\u0430\u0430 \u0437\u04E9\u0432 \u0441\u043E\u043D\u0433\u043E\u043D\u043E \u0443\u0443"), /*#__PURE__*/React.createElement(View, {
      style: styles.h10
    }));
  }, []);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(FlatList, {
    renderItem: renderItem,
    ListEmptyComponent: renderEmpty,
    style: styles.container,
    ListHeaderComponent: listHeader,
    initialNumToRender: 10,
    onEndReachedThreshold: 0.5,
    data: data ? data.map(item => item.rows).flat() : []
  }));
});
ChangeCategorySheet.displayName = "ChangeCategorySheet";
export { ChangeCategorySheet };
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
  },
  empty: {
    marginTop: 10,
    borderWidth: 0,
    backgroundColor: Colors.white,
    borderRadius: 10,
    height: 180,
    justifyContent: "center",
    alignItems: "center"
  }
});
//# sourceMappingURL=change-category.js.map