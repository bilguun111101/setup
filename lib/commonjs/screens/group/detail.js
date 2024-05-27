"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupDetailScreen = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _types = require("../../navigation/types");
var _native = require("@react-navigation/native");
var _swr = _interopRequireDefault(require("swr"));
var _groupHeader = require("../../components/layout/group-header");
var _reactNativeCollapsibleTabView = require("react-native-collapsible-tab-view");
var _tabBarLabelRender = require("../../components/layout/tab-bar-label-render");
var _users = require("../../components/tab-list/users");
var _info = require("../../components/tab-list/info");
var _apis = require("../../apis");
var _post = require("../../components/tab-list/post");
var _inviteMembers = require("../../components/bottomsheet/invite-members");
var _adminInvited = require("../../components/card/admin-invited");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const SCREEN_WIDTH = _reactNative.Dimensions.get("window").width;
const GroupDetailScreen = exports.GroupDetailScreen = /*#__PURE__*/(0, _react.memo)(({
  route
}) => {
  const [isActive, setIsActive] = (0, _react.useState)(false);
  const [focusChanged, setFocusChanged] = (0, _react.useState)(false);
  const [tabIndex, setTabIndex] = (0, _react.useState)(0);
  const {
    payload,
    notifData
  } = route.params;
  const blurListener = (0, _react.useCallback)(() => {
    setFocusChanged(false);
  }, []);
  (0, _native.useFocusEffect)(() => {
    if (tabIndex === 0) {
      setFocusChanged(true);
    } else {
      setFocusChanged(false);
    }
    navigation.addListener("blur", blurListener);
    return () => {
      navigation.removeListener("blur", blurListener);
    };
  });
  const navigation = (0, _native.useNavigation)();
  (0, _react.useEffect)(() => {
    setTimeout(() => {
      setIsActive(true);
    }, 1000);
  }, []);
  const {
    data,
    isLoading
  } = (0, _swr.default)(`swr.group.${payload._id}`, async () => {
    const res = await _apis.GroupApi.get(payload._id);
    return res;
  });
  if (isLoading) {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.loaderContainer
    }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Loader, null));
  }
  if (!data) {
    return null;
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.root
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.header
  }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.AppBar, {
    style: styles.appBar,
    left: /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
      type: "text",
      icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.ArrowLeftIcon, {
        size: _xsCoreNative.IconSizes.ExtraLarge
      }),
      onPress: () => navigation.goBack()
    }),
    center: /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      numberOfLines: 1,
      style: styles.title
    }, data?.name),
    right: data?.isAdmin && /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
      onPress: () => {
        navigation.navigate(_types.NavigationRoutes.Group_SettingsScreen, {
          payload: data
        });
      },
      type: "text",
      icon: /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_xsCoreNative.SettingIcon, {
        color: _xsCoreNative.Colors.primary,
        size: _xsCoreNative.IconSizes.ExtraLarge
      }), data.pendingMembersCount > 0 && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.badge
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: styles.badgeText
      }, data.pendingMembersCount)))
    })
  }), data?.isAdminInvited && /*#__PURE__*/_react.default.createElement(_adminInvited.AdminInvitedCard, {
    data: data,
    notifData: notifData
  })), /*#__PURE__*/_react.default.createElement(_reactNativeCollapsibleTabView.Tabs.Container, {
    initialTabName: "POST",
    onIndexChange: index => setTabIndex(index),
    allowHeaderOverscroll: true,
    renderHeader: () => /*#__PURE__*/_react.default.createElement(_groupHeader.GroupHeaderItem, {
      data: data,
      joinButton: true,
      notifData: notifData
    }),
    headerContainerStyle: {
      borderBottomStartRadius: 20,
      borderBottomEndRadius: 20,
      shadowOpacity: 0,
      shadowRadius: 0
    },
    lazy: false,
    renderTabBar: props => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        marginHorizontal: 18
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNativeCollapsibleTabView.MaterialTabBar, _extends({}, props, {
      indicatorStyle: {
        backgroundColor: _xsCoreNative.Colors.primary
      },
      width: SCREEN_WIDTH - 30
    })))
  }, /*#__PURE__*/_react.default.createElement(_reactNativeCollapsibleTabView.Tabs.Tab, {
    name: "POST",
    label: props => /*#__PURE__*/_react.default.createElement(_tabBarLabelRender.LabelRenderer, {
      tabProps: props
    })
  }, /*#__PURE__*/_react.default.createElement(_post.PostTabScreen, {
    payload: data,
    focusChanged: focusChanged
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, null)), /*#__PURE__*/_react.default.createElement(_reactNativeCollapsibleTabView.Tabs.Tab, {
    name: "USERS",
    label: props => /*#__PURE__*/_react.default.createElement(_tabBarLabelRender.LabelRenderer, {
      tabProps: props
    })
  }, /*#__PURE__*/_react.default.createElement(_users.UsersTabScreen, {
    payload: data
  })), /*#__PURE__*/_react.default.createElement(_reactNativeCollapsibleTabView.Tabs.Tab, {
    name: "INFO",
    label: props => /*#__PURE__*/_react.default.createElement(_tabBarLabelRender.LabelRenderer, {
      tabProps: props
    })
  }, /*#__PURE__*/_react.default.createElement(_info.InfoTabScreen, {
    data: data
  })))), payload?.isNew && isActive && /*#__PURE__*/_react.default.createElement(_inviteMembers.InviteMemberSheet, {
    payload: data
  }));
});
const styles = _reactNative.StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: _xsCoreNative.Colors.white
  },
  header: {
    zIndex: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
    borderBottomRightRadius: 10
  },
  appBar: {
    gap: 20
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 22,
    color: _xsCoreNative.Colors.primary,
    textAlign: "center"
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  badge: {
    position: "absolute",
    top: -3,
    right: -3,
    backgroundColor: _xsCoreNative.Colors.sub200,
    width: 16,
    height: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  badgeText: {
    fontSize: 10,
    fontFamily: "Inter",
    fontWeight: "600",
    color: _xsCoreNative.Colors.white
  }
});
GroupDetailScreen.displayName = "GroupDetailScreen";
//# sourceMappingURL=detail.js.map