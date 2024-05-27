"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddItem = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const AddItem = exports.AddItem = /*#__PURE__*/(0, _react.memo)(({
  title,
  onPress
}) => {
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onPress,
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.PlusIcon, {
    size: _xsCoreNative.IconSizes.Medium,
    color: _xsCoreNative.Colors.base700
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.w10
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.title
  }, title));
});
AddItem.displayName = "AddItem";
const styles = _reactNative.StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: _xsCoreNative.Colors.white,
    borderRadius: 10,
    padding: 18
  },
  title: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Inter",
    lineHeight: 17,
    color: _xsCoreNative.Colors.base700
  },
  w10: {
    width: 10
  }
});
//# sourceMappingURL=add-item.js.map