"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeCategorySheet = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _native = require("@react-navigation/native");
var _selectItem = require("../components/layout/select-item");
var _infinite = _interopRequireDefault(require("swr/infinite"));
var _apis = require("../apis");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ChangeCategorySheet = exports.ChangeCategorySheet = /*#__PURE__*/(0, _react.memo)(({
  route
}) => {
  const navigation = (0, _native.useNavigation)();
  const {
    onChange
  } = route.params;
  const {
    data,
    isLoading
  } = (0, _infinite.default)(index => `swr.group.category.${index}`, async index => {
    const page = index.split(".").pop();
    const res = await _apis.GroupApi.categoryList({
      page: parseInt(`${page || 1}`, 10) + 1
    });
    return res;
  }, {
    revalidateAll: true
  });
  const onSelect = (0, _react.useCallback)(item => {
    onChange("category", item);
    navigation.goBack();
  }, [navigation, onChange]);
  const renderItem = (0, _react.useCallback)(({
    item
  }) => {
    return /*#__PURE__*/_react.default.createElement(_selectItem.SelectItem, {
      item: item,
      onSelect: () => onSelect(item)
    });
  }, [onSelect]);
  const renderEmpty = (0, _react.useCallback)(() => {
    if (isLoading) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.empty
      }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Loader, null));
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.empty
    }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Empty, {
      title: "Хоосон байна",
      description: "\u0410\u043D\u0433\u0438\u043B\u0430\u043B \u043E\u0434\u043E\u043E\u0433\u043E\u043E\u0440 \u043E\u0440\u0443\u0443\u043B\u0430\u0430\u0433\u04AF\u0439 \u0431\u0430\u0439\u043D\u0430"
    }));
  }, [isLoading]);
  const listHeader = (0, _react.useCallback)(() => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.description
    }, "\u0422\u0430 \u0431\u04AF\u043B\u0433\u0438\u0439\u043D \u0430\u043D\u0433\u0438\u043B\u0430\u043B\u0430\u0430 \u0437\u04E9\u0432 \u0441\u043E\u043D\u0433\u043E\u043D\u043E \u0443\u0443"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.h10
    }));
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.root
  }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
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
const styles = _reactNative.StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: _xsCoreNative.Colors.white
  },
  container: {
    marginHorizontal: 10,
    flex: 1,
    backgroundColor: _xsCoreNative.Colors.gray101,
    paddingTop: 15,
    paddingHorizontal: 15,
    borderRadius: 12
  },
  description: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
    color: _xsCoreNative.Colors.gray104,
    fontFamily: "Inter",
    textAlign: "center"
  },
  h10: {
    height: 10
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
//# sourceMappingURL=change-category.js.map