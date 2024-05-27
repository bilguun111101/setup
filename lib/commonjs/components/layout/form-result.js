"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResultForm = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ResultForm = exports.ResultForm = /*#__PURE__*/(0, _react.memo)(({
  title,
  description,
  onPress
}) => {
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.root
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.title
  }, title), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h10
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    onPress: onPress,
    style: styles.row
  }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.InfoCircleIcon, {
    color: _xsCoreNative.Colors.primary,
    size: _xsCoreNative.IconSizes.Medium
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.description
  }, description), onPress && /*#__PURE__*/_react.default.createElement(_xsCoreNative.EditIcon, {
    color: _xsCoreNative.Colors.primary,
    size: _xsCoreNative.IconSizes.Medium
  })));
});
ResultForm.displayName = "ResultForm";
const styles = _reactNative.StyleSheet.create({
  root: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: _xsCoreNative.Colors.white,
    borderRadius: 10
  },
  row: {
    flexDirection: "row",
    gap: 10
  },
  h10: {
    height: 10
  },
  title: {
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "600",
    color: _xsCoreNative.Colors.primary
  },
  description: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "400",
    color: _xsCoreNative.Colors.primary
  }
});
//# sourceMappingURL=form-result.js.map