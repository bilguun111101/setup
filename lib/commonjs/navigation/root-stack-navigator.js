"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RootStackNavigator = void 0;
Object.defineProperty(exports, "authMainRootStack", {
  enumerable: true,
  get: function () {
    return _xsAuthNative.authMainRootStack;
  }
});
Object.defineProperty(exports, "chatMainRootStack", {
  enumerable: true,
  get: function () {
    return _xsChatNative.chatMainRootStack;
  }
});
exports.groupMainRootStack = void 0;
Object.defineProperty(exports, "pageMainRootStack", {
  enumerable: true,
  get: function () {
    return _xsPageNative.pageMainRootStack;
  }
});
Object.defineProperty(exports, "postMainRootStack", {
  enumerable: true,
  get: function () {
    return _xsPostNative.postMainRootStack;
  }
});
Object.defineProperty(exports, "settingsMainRootStack", {
  enumerable: true,
  get: function () {
    return _xsSettingsNative.settingsMainRootStack;
  }
});
Object.defineProperty(exports, "userMainRootStack", {
  enumerable: true,
  get: function () {
    return _xsUserNative.userMainRootStack;
  }
});
var _react = _interopRequireWildcard(require("react"));
var _nativeStack = require("@react-navigation/native-stack");
var _types = require("./types");
var _native = require("@react-navigation/native");
var _apis = require("../apis");
var _home = require("../screens/home/home");
var _detail = require("../screens/group/detail");
var _settings = require("../screens/group/settings");
var _xsAuthNative = require("@goodtechsoft/xs-auth-native");
var _swr = _interopRequireDefault(require("swr"));
var _info = require("../screens/group/info");
var _allUsers = require("../screens/group/all-users");
var _step = require("../screens/group/create/step1");
var _step2 = require("../screens/group/create/step2");
var _xsUserNative = require("@goodtechsoft/xs-user-native");
var _xsPostNative = require("@goodtechsoft/xs-post-native");
var _xsChatNative = require("@goodtechsoft/xs-chat-native");
var _xsPageNative = require("@goodtechsoft/xs-page-native");
var _requestedUsers = require("../screens/group/requested-users");
var _allPendingPost = require("../screens/group/all-pending-post");
var _inviteUsers = require("../screens/group/invite-users");
var _xsSettingsNative = require("@goodtechsoft/xs-settings-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Stack = (0, _nativeStack.createNativeStackNavigator)();
const {
  Navigator,
  Screen,
  Group
} = Stack;
const groupMainRootStack = () => {
  return /*#__PURE__*/_react.default.createElement(Group, {
    screenOptions: {
      headerShown: false
    }
  }, /*#__PURE__*/_react.default.createElement(Screen, {
    name: _types.NavigationRoutes.Group_HomeScreen,
    component: _home.HomeScreen
  }), /*#__PURE__*/_react.default.createElement(Screen, {
    name: _types.NavigationRoutes.Group_GroupDetailScreen,
    component: _detail.GroupDetailScreen
  }), /*#__PURE__*/_react.default.createElement(Screen, {
    name: _types.NavigationRoutes.Group_SettingsScreen,
    component: _settings.SettingsScreen
  }), /*#__PURE__*/_react.default.createElement(Screen, {
    name: _types.NavigationRoutes.Group_InfoScreen,
    component: _info.InfoScreen
  }), /*#__PURE__*/_react.default.createElement(Screen, {
    name: _types.NavigationRoutes.Group_AllUsersScreen,
    component: _allUsers.AllUsersScreen
  }), /*#__PURE__*/_react.default.createElement(Screen, {
    name: _types.NavigationRoutes.Group_CreateScreen,
    component: _step.CreateScreen
  }), /*#__PURE__*/_react.default.createElement(Screen, {
    name: _types.NavigationRoutes.Group_CreateStep2Screen,
    component: _step2.CreateStep2Screen
  }), /*#__PURE__*/_react.default.createElement(Screen, {
    name: _types.NavigationRoutes.Group_RequestedUsersScreen,
    component: _requestedUsers.RequestedUsersScreen
  }), /*#__PURE__*/_react.default.createElement(Screen, {
    name: _types.NavigationRoutes.Group_AllPendingPostScreen,
    component: _allPendingPost.AllPendingPostScreen
  }), /*#__PURE__*/_react.default.createElement(Screen, {
    name: _types.NavigationRoutes.Group_InviteUsersScreen,
    component: _inviteUsers.InviteUsersScreen
  }));
};
exports.groupMainRootStack = groupMainRootStack;
const RootStackNavigator = () => {
  const navigation = (0, _native.useNavigation)();
  const {
    data: user
  } = (0, _swr.default)("swr.user.me", async () => await _apis.AuthApi.me());
  (0, _react.useEffect)(() => {
    if (user) {
      navigation.navigate(_types.NavigationRoutes.Group_HomeScreen);
    } else {
      navigation.navigate(_xsAuthNative.AuthNavigationRoutes.Auth_LoginScreen);
    }
  }, [user]);
  const navigationOptions = () => {
    return {
      headerShown: false
    };
  };
  return /*#__PURE__*/_react.default.createElement(Navigator, {
    screenOptions: navigationOptions,
    initialRouteName: _types.NavigationRoutes.Group_HomeScreen
  }, (0, _xsAuthNative.authMainRootStack)(), groupMainRootStack());
};
exports.RootStackNavigator = RootStackNavigator;
//# sourceMappingURL=root-stack-navigator.js.map