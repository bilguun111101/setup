"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DescriptionItem = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const DescriptionItem = exports.DescriptionItem = /*#__PURE__*/(0, _react.memo)(props => {
  const {
    title,
    description,
    onPress
  } = props;
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    activeOpacity: 0.9,
    onPress: () => onPress()
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.title
  }, title), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h4
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    numberOfLines: 2,
    style: styles.description
  }, description));
});
DescriptionItem.displayName = "DescriptionItem";
const styles = _reactNative.StyleSheet.create({
  h4: {
    height: 4
  },
  title: {
    fontFamily: "Inter",
    fontWeight: "600",
    color: _xsCoreNative.Colors.primary,
    fontSize: 14
  },
  description: {
    fontFamily: "Inter",
    fontWeight: "400",
    color: _xsCoreNative.Colors.gray104,
    fontSize: 14
  }
});
//# sourceMappingURL=description.js.map