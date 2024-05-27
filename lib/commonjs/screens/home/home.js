"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomeScreen = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _reactNativeCollapsibleTabView = require("react-native-collapsible-tab-view");
var _types = require("../../navigation/types");
var _native = require("@react-navigation/native");
var _discoveredGroups = require("../../components/tab-list/discovered-groups");
var _myGroups = require("../../components/tab-list/my-groups");
var _tabBarLabelRender = require("../../components/layout/tab-bar-label-render");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const width = _reactNative.Dimensions.get("window").width;
const HomeScreen = exports.HomeScreen = /*#__PURE__*/(0, _react.memo)(() => {
  const navigation = (0, _native.useNavigation)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.header
  }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.AppBar, {
    left: /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
      type: "text",
      icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.ArrowLeftIcon, {
        size: _xsCoreNative.IconSizes.ExtraLarge
      }),
      onPress: () => navigation.goBack()
    }),
    right: /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
      type: "text",
      icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.PlusIcon, {
        size: _xsCoreNative.IconSizes.ExtraLarge
      }),
      onPress: () => navigation.navigate(_types.NavigationRoutes.Group_CreateScreen)
    }),
    center: /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.title
    }, "\u0411\u04AF\u043B\u044D\u0433")
  })), /*#__PURE__*/_react.default.createElement(_reactNativeCollapsibleTabView.Tabs.Container, {
    initialTabName: "MY",
    renderHeader: () => /*#__PURE__*/_react.default.createElement(_reactNative.View, null),
    headerContainerStyle: {
      borderBottomStartRadius: 20,
      borderBottomEndRadius: 20,
      shadowOpacity: 0,
      shadowRadius: 0
    },
    lazy: true,
    renderTabBar: props => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        marginHorizontal: 18
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNativeCollapsibleTabView.MaterialTabBar, _extends({}, props, {
      indicatorStyle: {
        backgroundColor: _xsCoreNative.Colors.primary
      },
      width: width - 30
    })))
  }, /*#__PURE__*/_react.default.createElement(_reactNativeCollapsibleTabView.Tabs.Tab, {
    name: "MY",
    label: props => /*#__PURE__*/_react.default.createElement(_tabBarLabelRender.LabelRenderer, {
      tabProps: props
    })
  }, /*#__PURE__*/_react.default.createElement(_myGroups.MyGroupTabScreen, null)), /*#__PURE__*/_react.default.createElement(_reactNativeCollapsibleTabView.Tabs.Tab, {
    name: "DISCOVER",
    label: props => /*#__PURE__*/_react.default.createElement(_tabBarLabelRender.LabelRenderer, {
      tabProps: props
    })
  }, /*#__PURE__*/_react.default.createElement(_discoveredGroups.DiscoveredTabScreen, null))));
});
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    zIndex: 10,
    overflow: "hidden"
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    color: _xsCoreNative.Colors.primary
  }
});
HomeScreen.displayName = "UserHomeScreen";
//# sourceMappingURL=home.js.map