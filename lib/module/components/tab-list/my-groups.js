import React, { memo, useCallback, useEffect, useState } from "react";
import { RefreshControl, StyleSheet, Text, View } from "react-native";
import { Button, Colors, CommunityIcon, Empty, IconSizes, Loader, SearchIcon, TextInput, useDebounce } from "@goodtechsoft/xs-core-native";
import { Tabs } from "react-native-collapsible-tab-view";
import { ListGroupCard } from "../card/list-group";
import { GridGroupCard } from "../card/grid-group";
import useSWRInfinite from "swr/infinite";
import { GroupApi } from "../../apis";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation";
const MyGroupTabScreen = /*#__PURE__*/memo(() => {
  const [value, setValue] = useState("");
  const query = useDebounce(value, 300);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const {
    data,
    size,
    setSize,
    isLoading,
    mutate
  } = useSWRInfinite(index => `swr.group.my.query=${query}.${index}`, async index => {
    const page = index.split(".").pop() || "";
    const res = await GroupApi.groupList({
      page: parseInt(`${page || 1}`, 10) + 1,
      query: query
    });
    return res;
  }, {
    revalidateAll: true,
    revalidateOnFocus: false,
    revalidateFirstPage: false,
    revalidateIfStale: true
  });
  const {
    data: adminGroup,
    isLoading: adminisLoading,
    setSize: adminSetSize
  } = useSWRInfinite(index => `swr.group.admin.${index}`, async index => {
    const page = index.split(".").pop() || "";
    const res = await GroupApi.groupList({
      isAdmin: true,
      page: parseInt(`${page || 1}`, 10) + 1
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
      return null;
    }
    return /*#__PURE__*/React.createElement(React.Fragment, null, index % 2 !== 0 && /*#__PURE__*/React.createElement(View, {
      style: styles.w10
    }), /*#__PURE__*/React.createElement(GridGroupCard, {
      joined: true,
      payload: item
    }));
  }, [query]);
  const renderListItem = useCallback(({
    item
  }) => {
    if (!item) {
      return null;
    }
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
      style: styles.h15
    }), /*#__PURE__*/React.createElement(ListGroupCard, {
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
      description: "\u0422\u0430 \u0431\u04AF\u043B\u044D\u0433\u0442 \u043D\u044D\u0433\u0434\u044D\u044D\u0433\u04AF\u0439 \u0431\u0430\u0439\u043D\u0430",
      icon: /*#__PURE__*/React.createElement(CommunityIcon, {
        size: IconSizes.Medium,
        color: Colors.white
      })
    }));
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
    return /*#__PURE__*/React.createElement(View, null);
  }
  const adminData = (adminGroup || [])?.map(row => row?.rows).flat();
  if (adminGroup && (adminGroup || [])[0] === null) {
    return /*#__PURE__*/React.createElement(View, null);
  }
  return /*#__PURE__*/React.createElement(Tabs.FlatList, {
    keyboardDismissMode: "on-drag",
    ListHeaderComponent: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Tabs.FlatList, {
      style: styles.adminList,
      ListHeaderComponent: /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
        style: styles.subTitle
      }, "\u0422\u0430\u043D\u044B \u0431\u04AF\u043B\u044D\u0433")),
      ListEmptyComponent: adminisLoading ? /*#__PURE__*/React.createElement(View, {
        style: styles.loader
      }, /*#__PURE__*/React.createElement(Loader, null)) : /*#__PURE__*/React.createElement(View, {
        style: styles.emptyGroup
      }, /*#__PURE__*/React.createElement(Text, {
        style: styles.emptyText
      }, "\u0422\u0430\u043D\u044C\u0434 \u0443\u0434\u0438\u0440\u0434\u0430\u0436 \u0431\u0443\u0439 \u0431\u04AF\u043B\u044D\u0433 \u0431\u0430\u0439\u0445\u0433\u04AF\u0439 \u0431\u0430\u0439\u043D\u0430."), /*#__PURE__*/React.createElement(Button, {
        onPress: () => navigation.navigate(NavigationRoutes.Group_CreateScreen),
        title: "Бүлэг үүсгэх"
      })),
      data: adminData,
      renderItem: renderListItem
    }), /*#__PURE__*/React.createElement(View, {
      style: [styles.h10, styles.bgGray]
    }), /*#__PURE__*/React.createElement(View, {
      style: styles.bgGray
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.borderTopRadius
    })), /*#__PURE__*/React.createElement(View, {
      style: styles.myGroups
    }, /*#__PURE__*/React.createElement(Text, {
      style: styles.subTitle
    }, "\u0422\u0430\u043D\u044B \u043D\u044D\u0433\u0434\u0441\u044D\u043D \u0431\u04AF\u043B\u044D\u0433"), /*#__PURE__*/React.createElement(View, {
      style: styles.h15
    }), /*#__PURE__*/React.createElement(View, {
      style: styles.inputContainer
    }, /*#__PURE__*/React.createElement(TextInput, {
      placeholder: "\u0425\u0430\u0439\u0445",
      onChangeText: value => setValue(value),
      style: styles.input,
      prefix: /*#__PURE__*/React.createElement(SearchIcon, {
        color: Colors.gray103,
        size: IconSizes.Medium
      })
    })))),
    style: styles.root,
    columnWrapperStyle: styles.listColumn,
    showsVerticalScrollIndicator: false,
    refreshControl: /*#__PURE__*/React.createElement(RefreshControl, {
      onRefresh: async () => {
        setRefreshing(true);
        setSize(1);
        adminSetSize(1);
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      },
      refreshing: refreshing
    }),
    contentContainerStyle: styles.listContent,
    contentInset: {
      top: 0,
      bottom: 20,
      left: 0,
      right: 0
    },
    contentInsetAdjustmentBehavior: "automatic",
    renderItem: renderItem,
    data: flatData,
    ListEmptyComponent: renderEmpty(),
    onEndReached: () => {
      setSize(size + 1);
    },
    numColumns: 2
  });
});
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.gray101
  },
  h15: {
    height: 15
  },
  h10: {
    height: 10
  },
  loader: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  w10: {
    width: 10
  },
  grid: {
    flex: 1,
    marginBottom: 20
  },
  inputContainer: {},
  input: {
    backgroundColor: Colors.gray101
  },
  card: {
    backgroundColor: Colors.white,
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderRadius: 10
  },
  listContent: {
    marginTop: 10,
    paddingBottom: 20,
    borderRadius: 10,
    backgroundColor: Colors.white
  },
  listColumn: {
    flex: 1,
    paddingHorizontal: 18
  },
  ph18: {
    paddingHorizontal: 18
  },
  subTitle: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary
  },
  bgGray: {
    flex: 1,
    backgroundColor: Colors.gray101
  },
  borderTopRadius: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.white,
    height: 10
  },
  myGroups: {
    paddingTop: 10,
    backgroundColor: Colors.white,
    paddingHorizontal: 18,
    paddingBottom: 15
  },
  empty: {
    marginTop: 10,
    borderWidth: 0,
    backgroundColor: Colors.white,
    borderRadius: 10,
    height: 180,
    justifyContent: "center",
    alignItems: "center"
  },
  adminList: {
    width: "100%",
    padding: 18
  },
  adminContainer: {
    flex: 1,
    borderWidth: 1
  },
  emptyText: {
    fontFamily: "Inter",
    color: Colors.primary,
    textAlign: "center"
  },
  emptyGroup: {
    flex: 1,
    gap: 15,
    marginTop: 15
  }
});
MyGroupTabScreen.displayName = "MyGroupTabScreen";
export { MyGroupTabScreen };
//# sourceMappingURL=my-groups.js.map