"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionItem = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ActionItem = exports.ActionItem = /*#__PURE__*/(0, _react.memo)(props => {
  const {
    title,
    suffixIcon,
    onPress,
    badgeNumber
  } = props;
  return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    onPress: onPress,
    style: styles.card
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.subTitle
  }, title), badgeNumber > 0 && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.badge
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.badgeText
  }, badgeNumber)), suffixIcon && /*#__PURE__*/_react.default.createElement(_xsCoreNative.ArrowRightIcon, {
    color: _xsCoreNative.Colors.primary
  }));
});
ActionItem.displayName = "ActionItem";
const styles = _reactNative.StyleSheet.create({
  card: {
    backgroundColor: _xsCoreNative.Colors.white,
    paddingVertical: 12,
    borderRadius: 10,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  badge: {
    backgroundColor: _xsCoreNative.Colors.sub200,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  badgeText: {
    fontSize: 10,
    fontFamily: "Inter",
    fontWeight: "600",
    color: _xsCoreNative.Colors.white
  },
  subTitle: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    fontFamily: "Inter",
    color: _xsCoreNative.Colors.primary
  }
});
//# sourceMappingURL=action-item.js.map