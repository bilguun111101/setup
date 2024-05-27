import React, { memo, useCallback, useState } from "react";
import { RefreshControl, StyleSheet, Text, View } from "react-native";
import { Colors, CommunityIcon, Empty, IconSizes, Loader, SearchIcon, TextInput, useDebounce } from "@goodtechsoft/xs-core-native";
import { Tabs } from "react-native-collapsible-tab-view";
import { GridGroupCard } from "../card/grid-group";
import useSWRInfinite from "swr/infinite";
import { GroupApi } from "../../apis";
const DiscoveredTabScreen = /*#__PURE__*/memo(() => {
  const [value, setValue] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const query = useDebounce(value, 300);
  const {
    data,
    size,
    setSize,
    isLoading
  } = useSWRInfinite(index => `swr.group.suggest.${index}${query}`, async index => {
    const page = index.split(".").pop() || "";
    const res = await GroupApi.suggestList({
      page: parseInt(`${page || 1}`, 10) + 1,
      query: query
    });
    return res;
  }, {
    revalidateAll: true
  });
  const renderItem = useCallback(({
    index,
    item
  }) => {
    if (!item) {
      return /*#__PURE__*/React.createElement(View, null);
    }
    return /*#__PURE__*/React.createElement(React.Fragment, null, index % 2 !== 0 && /*#__PURE__*/React.createElement(View, {
      style: styles.w10
    }), /*#__PURE__*/React.createElement(GridGroupCard, {
      isModal: true,
      payload: item
    }));
  }, []);
  const renderEmpty = useCallback(() => {
    if (isLoading) {
      return /*#__PURE__*/React.createElement(View, {
        style: styles.empty
      }, /*#__PURE__*/React.createElement(Loader, null));
    }
    return /*#__PURE__*/React.createElement(View, {
      style: styles.empty
    }, query ? /*#__PURE__*/React.createElement(Empty, {
      title: "Хоосон байна",
      description: `'${query}' нэртэй бүлэг байхгүй байна`,
      icon: /*#__PURE__*/React.createElement(CommunityIcon, {
        size: IconSizes.Medium,
        color: Colors.white
      })
    }) : /*#__PURE__*/React.createElement(Empty, {
      title: "Хоосон байна",
      icon: /*#__PURE__*/React.createElement(CommunityIcon, {
        size: IconSizes.Medium,
        color: Colors.white
      })
    }));
  }, [isLoading]);
  const flatData = (data || [])?.map(row => row?.rows).flat();
  if (flatData && (flatData || [])[0] === null) {
    return /*#__PURE__*/React.createElement(View, null);
  }
  return /*#__PURE__*/React.createElement(Tabs.FlatList, {
    ListHeaderComponent: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
      style: styles.card
    }, /*#__PURE__*/React.createElement(Text, {
      style: styles.subTitle
    }, "\u0421\u0430\u043D\u0430\u043B \u0431\u043E\u043B\u0433\u043E\u0445"), /*#__PURE__*/React.createElement(View, {
      style: styles.h15
    }), /*#__PURE__*/React.createElement(TextInput, {
      placeholder: "\u0425\u0430\u0439\u0445",
      onChangeText: value => setValue(value),
      style: styles.input,
      prefix: /*#__PURE__*/React.createElement(SearchIcon, {
        color: Colors.gray103,
        size: IconSizes.Medium
      })
    }))),
    style: styles.root,
    columnWrapperStyle: styles.listColumn,
    contentContainerStyle: styles.content,
    showsVerticalScrollIndicator: false,
    refreshControl: /*#__PURE__*/React.createElement(RefreshControl, {
      onRefresh: async () => {
        setRefreshing(true);
        setSize(1);
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      },
      refreshing: refreshing
    }),
    contentInset: {
      top: 0,
      bottom: 20,
      left: 0,
      right: 0
    },
    contentInsetAdjustmentBehavior: "automatic",
    renderItem: renderItem,
    ListEmptyComponent: renderEmpty,
    data: flatData,
    onEndReached: () => {
      setSize(size + 1);
    },
    numColumns: 2
  });
});
const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    backgroundColor: Colors.gray101
  },
  h15: {
    height: 15
  },
  h10: {
    height: 10
  },
  w10: {
    width: 10
  },
  grid: {
    flex: 1,
    marginBottom: 20
  },
  bgGray: {
    backgroundColor: Colors.gray101
  },
  card: {
    padding: 18
  },
  content: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: Colors.white
  },
  listColumn: {
    paddingHorizontal: 18
  },
  ph18: {
    paddingHorizontal: 18
  },
  input: {
    backgroundColor: Colors.gray101
  },
  inputContainer: {},
  subTitle: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary
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
DiscoveredTabScreen.displayName = "DiscoveredTabScreen";
export { DiscoveredTabScreen };
//# sourceMappingURL=discovered-groups.js.map