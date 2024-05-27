"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyGroupTabScreen = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _reactNativeCollapsibleTabView = require("react-native-collapsible-tab-view");
var _listGroup = require("../card/list-group");
var _gridGroup = require("../card/grid-group");
var _infinite = _interopRequireDefault(require("swr/infinite"));
var _apis = require("../../apis");
var _native = require("@react-navigation/native");
var _navigation = require("../../navigation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const MyGroupTabScreen = exports.MyGroupTabScreen = /*#__PURE__*/(0, _react.memo)(() => {
  const [value, setValue] = (0, _react.useState)("");
  const query = (0, _xsCoreNative.useDebounce)(value, 300);
  const [refreshing, setRefreshing] = (0, _react.useState)(false);
  const navigation = (0, _native.useNavigation)();
  const {
    data,
    size,
    setSize,
    isLoading,
    mutate
  } = (0, _infinite.default)(index => `swr.group.my.query=${query}.${index}`, async index => {
    const page = index.split(".").pop() || "";
    const res = await _apis.GroupApi.groupList({
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
  } = (0, _infinite.default)(index => `swr.group.admin.${index}`, async index => {
    const page = index.split(".").pop() || "";
    const res = await _apis.GroupApi.groupList({
      isAdmin: true,
      page: parseInt(`${page || 1}`, 10) + 1
    });
    return res;
  }, {
    revalidateAll: true
  });
  const renderItem = (0, _react.useCallback)(({
    index,
    item
  }) => {
    if (!item) {
      return null;
    }
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, index % 2 !== 0 && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.w10
    }), /*#__PURE__*/_react.default.createElement(_gridGroup.GridGroupCard, {
      joined: true,
      payload: item
    }));
  }, [query]);
  const renderListItem = (0, _react.useCallback)(({
    item
  }) => {
    if (!item) {
      return null;
    }
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.h15
    }), /*#__PURE__*/_react.default.createElement(_listGroup.ListGroupCard, {
      payload: item
    }));
  }, []);
  const renderEmpty = (0, _react.useCallback)(() => {
    if (isLoading) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.empty
      }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Loader, null));
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.empty
    }, query ? /*#__PURE__*/_react.default.createElement(_xsCoreNative.Empty, {
      title: "Хоосон байна",
      description: `'${query}' нэртэй бүлэг байхгүй байна`,
      icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.CommunityIcon, {
        size: _xsCoreNative.IconSizes.Medium,
        color: _xsCoreNative.Colors.white
      })
    }) : /*#__PURE__*/_react.default.createElement(_xsCoreNative.Empty, {
      title: "Хоосон байна",
      description: "\u0422\u0430 \u0431\u04AF\u043B\u044D\u0433\u0442 \u043D\u044D\u0433\u0434\u044D\u044D\u0433\u04AF\u0439 \u0431\u0430\u0439\u043D\u0430",
      icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.CommunityIcon, {
        size: _xsCoreNative.IconSizes.Medium,
        color: _xsCoreNative.Colors.white
      })
    }));
  }, [isLoading]);
  const flatData = (data || [])?.map(row => row?.rows).flat();
  (0, _react.useEffect)(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("Screen focused");
      mutate();
    });
    return unsubscribe;
  }, [navigation]);
  if (flatData && (flatData || [])[0] === null) {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null);
  }
  const adminData = (adminGroup || [])?.map(row => row?.rows).flat();
  if (adminGroup && (adminGroup || [])[0] === null) {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null);
  }
  return /*#__PURE__*/_react.default.createElement(_reactNativeCollapsibleTabView.Tabs.FlatList, {
    keyboardDismissMode: "on-drag",
    ListHeaderComponent: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNativeCollapsibleTabView.Tabs.FlatList, {
      style: styles.adminList,
      ListHeaderComponent: /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: styles.subTitle
      }, "\u0422\u0430\u043D\u044B \u0431\u04AF\u043B\u044D\u0433")),
      ListEmptyComponent: adminisLoading ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.loader
      }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Loader, null)) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.emptyGroup
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: styles.emptyText
      }, "\u0422\u0430\u043D\u044C\u0434 \u0443\u0434\u0438\u0440\u0434\u0430\u0436 \u0431\u0443\u0439 \u0431\u04AF\u043B\u044D\u0433 \u0431\u0430\u0439\u0445\u0433\u04AF\u0439 \u0431\u0430\u0439\u043D\u0430."), /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
        onPress: () => navigation.navigate(_navigation.NavigationRoutes.Group_CreateScreen),
        title: "Бүлэг үүсгэх"
      })),
      data: adminData,
      renderItem: renderListItem
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.h10, styles.bgGray]
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.bgGray
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.borderTopRadius
    })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.myGroups
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.subTitle
    }, "\u0422\u0430\u043D\u044B \u043D\u044D\u0433\u0434\u0441\u044D\u043D \u0431\u04AF\u043B\u044D\u0433"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.h15
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.inputContainer
    }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.TextInput, {
      placeholder: "\u0425\u0430\u0439\u0445",
      onChangeText: value => setValue(value),
      style: styles.input,
      prefix: /*#__PURE__*/_react.default.createElement(_xsCoreNative.SearchIcon, {
        color: _xsCoreNative.Colors.gray103,
        size: _xsCoreNative.IconSizes.Medium
      })
    })))),
    style: styles.root,
    columnWrapperStyle: styles.listColumn,
    showsVerticalScrollIndicator: false,
    refreshControl: /*#__PURE__*/_react.default.createElement(_reactNative.RefreshControl, {
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
const styles = _reactNative.StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: _xsCoreNative.Colors.gray101
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
    backgroundColor: _xsCoreNative.Colors.gray101
  },
  card: {
    backgroundColor: _xsCoreNative.Colors.white,
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderRadius: 10
  },
  listContent: {
    marginTop: 10,
    paddingBottom: 20,
    borderRadius: 10,
    backgroundColor: _xsCoreNative.Colors.white
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
    color: _xsCoreNative.Colors.primary
  },
  bgGray: {
    flex: 1,
    backgroundColor: _xsCoreNative.Colors.gray101
  },
  borderTopRadius: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: _xsCoreNative.Colors.white,
    height: 10
  },
  myGroups: {
    paddingTop: 10,
    backgroundColor: _xsCoreNative.Colors.white,
    paddingHorizontal: 18,
    paddingBottom: 15
  },
  empty: {
    marginTop: 10,
    borderWidth: 0,
    backgroundColor: _xsCoreNative.Colors.white,
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
    color: _xsCoreNative.Colors.primary,
    textAlign: "center"
  },
  emptyGroup: {
    flex: 1,
    gap: 15,
    marginTop: 15
  }
});
MyGroupTabScreen.displayName = "MyGroupTabScreen";
//# sourceMappingURL=my-groups.js.map