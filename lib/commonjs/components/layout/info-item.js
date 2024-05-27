"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfoItem = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const InfoItem = exports.InfoItem = /*#__PURE__*/(0, _react.memo)(({
  title,
  description,
  onSubmit,
  primary,
  isRemove
}) => {
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: [styles.content, isRemove && styles.redBorder],
    onPress: onSubmit
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.contentTitle, primary && {
      color: _xsCoreNative.Colors.primary
    }, isRemove && styles.redText]
  }, title), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.contentResultContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.contentResult,
    numberOfLines: 1,
    ellipsizeMode: "tail"
  }, description), /*#__PURE__*/_react.default.createElement(_xsCoreNative.ArrowRightIcon, {
    color: isRemove ? _xsCoreNative.Colors.sub200 : _xsCoreNative.Colors.gray103,
    size: 20
  })));
});
InfoItem.displayName = "InfoItem";
const styles = _reactNative.StyleSheet.create({
  content: {
    backgroundColor: _xsCoreNative.Colors.white,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 8,
    alignItems: "center"
  },
  contentTitle: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: _xsCoreNative.Colors.gray103,
    flex: 1
  },
  contentResultContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end"
  },
  contentResult: {
    marginRight: 8,
    fontFamily: "Inter-Medium",
    fontSize: 14,
    lineHeight: 16,
    color: _xsCoreNative.Colors.primary
  },
  redText: {
    color: _xsCoreNative.Colors.sub200
  },
  redBorder: {
    borderColor: _xsCoreNative.Colors.sub200,
    borderWidth: 1
  }
});
//# sourceMappingURL=info-item.js.map