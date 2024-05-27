"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImagePermissionScreen = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _native = require("@react-navigation/native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { NavigationRoutes, RootStackParamList } from "../../navigation/types";

// type Props = NativeStackScreenProps<
//   RootStackParamList,
//   NavigationRoutes.Group_ImagePermissionScreen
// >;

const ImagePermissionScreen = exports.ImagePermissionScreen = /*#__PURE__*/(0, _react.memo)(() => {
  const navigation = (0, _native.useNavigation)();
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_xsCoreNative.AppBar, {
    left: /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
      icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.ArrowLeftIcon, {
        color: _xsCoreNative.Colors.primary,
        size: _xsCoreNative.IconSizes.ExtraLarge
      }),
      type: "text",
      onPress: () => navigation.goBack()
    }),
    center: /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.headerTitle
    }, "\u0422\u043E\u0445\u0438\u0440\u0433\u043E\u043E"),
    useBorderRadius: true
  }), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: styles.root
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.card
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h20
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.labelStyle
  }, "\u0422\u043E\u0445\u0438\u0440\u0433\u043E\u043E"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h6
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.descriptionStyle
  }, "\u0422\u0430 \u0437\u0443\u0440\u0430\u0433\u0442\u0430\u0439 \u043F\u043E\u0441\u0442 \u043D\u0438\u0439\u0442\u043B\u044D\u0445\u0438\u0439\u043D \u0442\u0443\u043B\u0434 \u0433\u0430\u043B\u043B\u0435\u0440\u0435\u0439 \u0431\u043E\u043B\u043E\u043D \u043A\u0430\u043C\u0435\u0440\u0430 \u0430\u0448\u0438\u0433\u043B\u0430\u0445 \u044D\u0440\u0445\u0438\u0439\u0433 \u043D\u044D\u044D\u0445 \u0448\u0430\u0430\u0440\u0434\u043B\u0430\u0433\u0430\u0442\u0430\u0439."), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h28
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.wrapper
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h8
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h28
  }), /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
    type: "primary",
    style: styles.btn,
    title: "\u0422\u043E\u0445\u0438\u0440\u0433\u043E\u043E \u0446\u044D\u0441\u0440\u04AF\u04AF \u0448\u0438\u043B\u0436\u0438\u0445",
    onPress: () => {
      _reactNative.Linking.openSettings();
    }
  }))));
});
ImagePermissionScreen.displayName = "ImagePermissionScreen";
const styles = _reactNative.StyleSheet.create({
  headerTitle: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    color: _xsCoreNative.Colors.primary,
    lineHeight: 20
  },
  root: {
    flex: 1,
    backgroundColor: _xsCoreNative.Colors.white,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginTop: 8
  },
  h6: {
    height: 6
  },
  h8: {
    height: 8
  },
  h20: {
    height: 20
  },
  h28: {
    height: 28
  },
  card: {
    backgroundColor: _xsCoreNative.Colors.gray101,
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 28,
    alignSelf: "stretch"
  },
  btn: {
    width: "100%"
  },
  wrapper: {},
  labelStyle: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
    fontFamily: "Inter",
    color: _xsCoreNative.Colors.primary
  },
  descriptionStyle: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "Inter",
    color: _xsCoreNative.Colors.gray103
  }
});
//# sourceMappingURL=image.js.map