"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscoveredTabScreen = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _reactNativeCollapsibleTabView = require("react-native-collapsible-tab-view");
var _gridGroup = require("../card/grid-group");
var _infinite = _interopRequireDefault(require("swr/infinite"));
var _apis = require("../../apis");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const DiscoveredTabScreen = exports.DiscoveredTabScreen = /*#__PURE__*/(0, _react.memo)(() => {
  const [value, setValue] = (0, _react.useState)("");
  const [refreshing, setRefreshing] = (0, _react.useState)(false);
  const query = (0, _xsCoreNative.useDebounce)(value, 300);
  const {
    data,
    size,
    setSize,
    isLoading
  } = (0, _infinite.default)(index => `swr.group.suggest.${index}${query}`, async index => {
    const page = index.split(".").pop() || "";
    const res = await _apis.GroupApi.suggestList({
      page: parseInt(`${page || 1}`, 10) + 1,
      query: query
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
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null);
    }
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, index % 2 !== 0 && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.w10
    }), /*#__PURE__*/_react.default.createElement(_gridGroup.GridGroupCard, {
      isModal: true,
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
      icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.CommunityIcon, {
        size: _xsCoreNative.IconSizes.Medium,
        color: _xsCoreNative.Colors.white
      })
    }));
  }, [isLoading]);
  const flatData = (data || [])?.map(row => row?.rows).flat();
  if (flatData && (flatData || [])[0] === null) {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null);
  }
  return /*#__PURE__*/_react.default.createElement(_reactNativeCollapsibleTabView.Tabs.FlatList, {
    ListHeaderComponent: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.card
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.subTitle
    }, "\u0421\u0430\u043D\u0430\u043B \u0431\u043E\u043B\u0433\u043E\u0445"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.h15
    }), /*#__PURE__*/_react.default.createElement(_xsCoreNative.TextInput, {
      placeholder: "\u0425\u0430\u0439\u0445",
      onChangeText: value => setValue(value),
      style: styles.input,
      prefix: /*#__PURE__*/_react.default.createElement(_xsCoreNative.SearchIcon, {
        color: _xsCoreNative.Colors.gray103,
        size: _xsCoreNative.IconSizes.Medium
      })
    }))),
    style: styles.root,
    columnWrapperStyle: styles.listColumn,
    contentContainerStyle: styles.content,
    showsVerticalScrollIndicator: false,
    refreshControl: /*#__PURE__*/_react.default.createElement(_reactNative.RefreshControl, {
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
const styles = _reactNative.StyleSheet.create({
  root: {
    flexGrow: 1,
    backgroundColor: _xsCoreNative.Colors.gray101
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
    backgroundColor: _xsCoreNative.Colors.gray101
  },
  card: {
    padding: 18
  },
  content: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: _xsCoreNative.Colors.white
  },
  listColumn: {
    paddingHorizontal: 18
  },
  ph18: {
    paddingHorizontal: 18
  },
  input: {
    backgroundColor: _xsCoreNative.Colors.gray101
  },
  inputContainer: {},
  subTitle: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "600",
    color: _xsCoreNative.Colors.primary
  },
  empty: {
    marginTop: 10,
    borderWidth: 0,
    backgroundColor: _xsCoreNative.Colors.white,
    borderRadius: 10,
    height: 180,
    justifyContent: "center",
    alignItems: "center"
  }
});
DiscoveredTabScreen.displayName = "DiscoveredTabScreen";
//# sourceMappingURL=discovered-groups.js.map