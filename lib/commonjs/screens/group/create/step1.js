"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateScreen = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _native = require("@react-navigation/native");
var _elements = require("@react-navigation/elements");
var _createGroup = require("../../../components/form/create-group");
var _navigation = require("../../../navigation");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const CreateScreen = exports.CreateScreen = /*#__PURE__*/(0, _react.memo)(() => {
  const formRef = (0, _react.useRef)(null);
  const headerHeight = (0, _elements.useHeaderHeight)();
  const onSubmit = async value => {
    const data = {
      name: value.name,
      privacy: value.privacy.value
    };
    navigation.navigate(_navigation.NavigationRoutes.Group_CreateStep2Screen, {
      data: data
    });
  };
  const navigation = (0, _native.useNavigation)();
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_xsCoreNative.AppBar, {
    left: /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
      type: "text",
      icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.ArrowLeftIcon, {
        size: _xsCoreNative.IconSizes.Large,
        color: _xsCoreNative.Colors.primary
      }),
      onPress: () => navigation.goBack()
    }),
    center: /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.title
    }, "\u0411\u04AF\u043B\u044D\u0433 \u04AF\u04AF\u0441\u0433\u044D\u0445")
  }), /*#__PURE__*/_react.default.createElement(_reactNative.KeyboardAvoidingView, {
    style: styles.root,
    behavior: _reactNative.Platform.OS === "ios" ? "padding" : "height",
    keyboardVerticalOffset: headerHeight
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: styles.root
  }, /*#__PURE__*/_react.default.createElement(_createGroup.CreateGroupForm, {
    onSubmit: onSubmit,
    formRef: formRef
  }))));
});
CreateScreen.displayName = "CreateScreen";
const styles = _reactNative.StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: _xsCoreNative.Colors.white
  },
  container: {
    flex: 1,
    backgroundColor: _xsCoreNative.Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10
  },
  title: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "600",
    color: _xsCoreNative.Colors.primary
  }
});
//# sourceMappingURL=step1.js.map