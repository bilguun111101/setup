"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteConfirmSheet = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _native = require("@react-navigation/native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const DeleteConfirmSheet = exports.DeleteConfirmSheet = /*#__PURE__*/(0, _react.memo)(({
  route
}) => {
  const {
    onChange
  } = route.params;
  const navigation = (0, _native.useNavigation)();
  const sfArea = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.root
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.headerTitle
  }, "\u0411\u04AF\u043B\u044D\u0433 \u0443\u0441\u0442\u0433\u0430\u0445"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.contentContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h15
  }), /*#__PURE__*/_react.default.createElement(_xsCoreNative.Result, {
    title: "Бүлэг устгах",
    subTitle: "Та энэ бүлгээ устгахдаа итгэлтэй байна уу?",
    icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.CommunityIcon, {
      color: _xsCoreNative.Colors.white
    })
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h15
  }), /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
    type: "primary",
    title: "Зөвшөөрөх",
    style: styles.button,
    onPress: () => {
      navigation.goBack();
      onChange();
    }
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      height: sfArea.bottom
    }
  }));
});
DeleteConfirmSheet.displayName = "DeleteConfirmSheet";
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
    marginHorizontal: 18
  }
});
//# sourceMappingURL=delete-confirm.js.map