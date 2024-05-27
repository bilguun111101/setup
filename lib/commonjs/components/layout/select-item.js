"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectItem = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const SelectItem = exports.SelectItem = /*#__PURE__*/(0, _react.memo)(({
  item,
  onSelect
}) => {
  return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    style: styles.container,
    onPress: onSelect
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.title
  }, item?.name));
});
SelectItem.displayName = "SelectItem";
const styles = _reactNative.StyleSheet.create({
  container: {
    backgroundColor: _xsCoreNative.Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 10,
    borderRadius: 8
  },
  title: {
    fontWeight: "400",
    fontFamily: "Inter",
    fontSize: 12,
    lineHeight: 15,
    color: _xsCoreNative.Colors.primary
  }
});
//# sourceMappingURL=select-item.js.map