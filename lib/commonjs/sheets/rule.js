"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RuleSheet = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _native = require("@react-navigation/native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const RuleSheet = exports.RuleSheet = /*#__PURE__*/(0, _react.memo)(({
  route
}) => {
  const sfArea = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const {
    onPress
  } = route.params;
  const navigation = (0, _native.useNavigation)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.root
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.headerTitle
  }, "\u0411\u04AF\u043B\u0433\u0438\u0439\u043D \u0434\u04AF\u0440\u044D\u043C"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.contentContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h10
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.title
  }, "\u0411\u04AF\u043B\u0433\u0438\u0439\u043D \u0434\u04AF\u0440\u044D\u043C"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h15
  }), /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
    type: "primary",
    title: "Зөвшөөрөх",
    style: styles.button,
    onPress: () => {
      onPress(navigation);
    }
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      height: sfArea.bottom
    }
  }));
});
RuleSheet.displayName = "RuleSheet";
const styles = _reactNative.StyleSheet.create({
  root: {
    flexGrow: 1,
    paddingHorizontal: 18
  },
  h10: {
    height: 10
  },
  h15: {
    height: 15
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    lineHeight: 20,
    textAlign: "center",
    color: _xsCoreNative.Colors.primary,
    marginVertical: 12
  },
  contentContainer: {
    backgroundColor: _xsCoreNative.Colors.gray101,
    borderRadius: 12,
    flex: 1
  },
  iconContainer: {
    alignSelf: "center",
    marginTop: 32
  },
  username: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    lineHeight: 18,
    textAlign: "center",
    color: _xsCoreNative.Colors.primary,
    marginHorizontal: 24
  },
  title: {
    fontSize: 14,
    fontFamily: "Inter",
    lineHeight: 18,
    textAlign: "center",
    color: _xsCoreNative.Colors.primary,
    marginHorizontal: 24
  },
  description: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    lineHeight: 15,
    color: _xsCoreNative.Colors.gray103,
    textAlign: "center",
    marginTop: 12,
    marginHorizontal: 24
  },
  button: {
    marginHorizontal: 24
  }
});
//# sourceMappingURL=rule.js.map