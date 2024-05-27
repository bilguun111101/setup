"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListUserCard = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _xsUserNative = require("@goodtechsoft/xs-user-native");
var _native = require("@react-navigation/native");
var _username = require("../../utils/username");
var _swr = _interopRequireDefault(require("swr"));
var _xsPageNative = require("@goodtechsoft/xs-page-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ListUserCard = exports.ListUserCard = /*#__PURE__*/(0, _react.memo)(props => {
  const {
    user,
    more,
    isJoin,
    onPress,
    invite,
    isShowAdminReq
  } = props;
  if (!user) {
    return null;
  }
  const {
    data: userMe
  } = (0, _swr.default)("swr.user.me");
  const navigation = (0, _native.useNavigation)();
  const {
    data
  } = (0, _swr.default)(`swr.user.${user._id}`, {
    fallbackData: user
  });
  if (!data) {
    return null;
  }
  const renderButton = (0, _react.useCallback)(() => {
    if (data.isInvited) {
      return /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
        onPress: () => {
          onPress(data, "invited");
        },
        title: "Урисан"
      });
    }
    if (more) {
      return /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
        onPress: () => {
          onPress(data, "more");
        },
        icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.EllipsisHIcon, null),
        type: "text"
      });
    }
    if (invite && !data.isInvited) {
      return /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
        type: "primary",
        onPress: () => {
          onPress(data, "invite");
        },
        title: "Урих"
      });
    }
    if (isJoin) {
      return /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
        onPress: () => {
          onPress(data, "isJoin");
        },
        title: "Зөвшөөрөх"
      });
    }
    if (data.accountType !== "NORMAL") {
      if (data._id === userMe?._id) {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, null);
      } else {
        if (data.isLiked) {
          return /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
            onPress: () => {
              onPress(data, "unLike");
            },
            title: "Таалагдсан"
          });
        } else {
          return /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
            type: "primary",
            onPress: () => {
              onPress(data, "isLike");
            },
            title: "Таалагдлаа"
          });
        }
      }
    }
    if (data.isFollowing) {
      return /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
        onPress: () => {
          onPress(data, "isFollowing");
        },
        title: "Дагасан"
      });
    }
    if (data.isUserRequested) {
      return /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
        onPress: () => {
          onPress(data, "userRequested");
        },
        title: "Хүсэлт илгээсэн"
      });
    }
    if (data._id === userMe?._id) {
      return /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
        onPress: () => {
          onPress(data, "me");
        },
        icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.EllipsisHIcon, {
          size: _xsCoreNative.IconSizes.Large,
          color: _xsCoreNative.Colors.primary
        })
      });
    }
    if (!data.isFollowing) {
      return /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
        type: "primary",
        onPress: () => {
          onPress(data, "follow");
        },
        title: "Дагах"
      });
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null);
  }, [data]);
  const goProfile = (0, _react.useCallback)(() => {
    if (data.accountType === "NORMAL") {
      navigation.navigate(_xsUserNative.UserNavigationRoutes.User_ProfileScreen, {
        userId: data._id
      });
    } else navigation.navigate(_xsPageNative.PageNavigationRoutes.Page_ProfileScreen, {
      userId: data._id
    });
  }, [data, navigation]);
  const renderAdmin = (0, _react.useCallback)(() => {
    if (data.isAdmin) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.adminContainer
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: styles.adminText
      }, "\u0410\u0434\u043C\u0438\u043D"));
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null);
  }, [data]);
  const renderAvatarInvite = (0, _react.useCallback)(() => {
    if (data.isAdminInvited && isShowAdminReq) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.requestAdmin
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: styles.requestText
      }, "\u0410\u0434\u043C\u0438\u043D \u0445\u04AF\u0441\u044D\u043B\u0442 \u0438\u043B\u0433\u044D\u044D\u0441\u044D\u043D"));
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null);
  }, [data]);
  console.log(`[${(0, _username.username)(data)}]`, data.isLiked, data.isFollowing);
  return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    onPress: goProfile,
    style: styles.card
  }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Avatar, {
    size: _xsCoreNative.AvatarSizes.Large,
    source: data.avatar?.large,
    isPage: data.accountType === "NORMAL" ? false : true
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.username
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.nameText
  }, (0, _username.username)(data)), renderAdmin(), renderAvatarInvite()), renderButton());
});
ListUserCard.displayName = "ListUserCard";
const styles = _reactNative.StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 18
  },
  nameText: {
    fontFamily: "Inter",
    color: _xsCoreNative.Colors.primary,
    fontWeight: "500"
  },
  button: {},
  username: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 5
  },
  adminContainer: {
    paddingVertical: 1,
    paddingHorizontal: 3,
    backgroundColor: _xsCoreNative.Colors.primary,
    borderRadius: 4
  },
  requestAdmin: {
    paddingVertical: 1.5,
    backgroundColor: _xsCoreNative.Colors.gray101,
    borderRadius: 4,
    paddingHorizontal: 4
  },
  adminText: {
    fontSize: 11,
    color: _xsCoreNative.Colors.white,
    fontFamily: "Inter",
    fontWeight: "500"
  },
  requestText: {
    fontSize: 11,
    color: _xsCoreNative.Colors.primary,
    fontFamily: "Inter",
    fontWeight: "500"
  }
});
//# sourceMappingURL=list-user.js.map