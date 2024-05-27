"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangePrivacySheet = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _native = require("@react-navigation/native");
var _selectItem = require("../components/layout/select-item");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ChangePrivacySheet = exports.ChangePrivacySheet = /*#__PURE__*/(0, _react.memo)(({
  route
}) => {
  const navigation = (0, _native.useNavigation)();
  const {
    onChange
  } = route.params;
  const privacyData = [{
    name: "Нээлттэй",
    value: "PUBLIC"
  }, {
    name: "Нууцлалтай",
    value: "PRIVATE"
  }];
  const onSelect = (0, _react.useCallback)(item => {
    onChange("privacy", item);
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
  const listHeader = (0, _react.useCallback)(() => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.description
    }, "\u0422\u0430 \u0431\u04AF\u043B\u0433\u0438\u0439\u043D \u043D\u0443\u0443\u0446\u043B\u0430\u043B\u0430\u0430 \u0437\u04E9\u0432 \u0441\u043E\u043D\u0433\u043E\u043D\u043E \u0443\u0443"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.h10
    }));
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.root
  }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    renderItem: renderItem,
    style: styles.container,
    ListHeaderComponent: listHeader,
    onEndReachedThreshold: 0.5,
    data: privacyData
  }));
});
ChangePrivacySheet.displayName = "ChangePrivacySheet";
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
  }
});
//# sourceMappingURL=change-privacy.js.map