"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RowButton = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const RowButton = exports.RowButton = /*#__PURE__*/(0, _react.memo)(({
  onCancel,
  onPress
}) => {
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
    title: "Болих",
    onPress: onCancel
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.w10
  }), /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
    title: "Хадгалах",
    onPress: onPress,
    type: "primary"
  }));
});
RowButton.displayName = "RowButton";
const styles = _reactNative.StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end"
  },
  w10: {
    width: 10
  }
});
//# sourceMappingURL=row-button.js.map