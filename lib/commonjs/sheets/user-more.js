"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserMoreSheet = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _bottomSheet = require("@gorhom/bottom-sheet");
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _types = require("../navigation/types");
var _bottomsheetList = require("../components/card/bottomsheet-list");
var _username = require("../utils/username");
var _native = require("@react-navigation/native");
var _xsUserNative = require("@goodtechsoft/xs-user-native");
var _apis = require("../apis");
var _reactNativeToastNotifications = require("react-native-toast-notifications");
var _swr = _interopRequireWildcard(require("swr"));
var _infinite = _interopRequireDefault(require("swr/infinite"));
var _xsChatNative = require("@goodtechsoft/xs-chat-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const UserMoreSheet = exports.UserMoreSheet = /*#__PURE__*/(0, _react.memo)(({
  route
}) => {
  const {
    user,
    payload
  } = route.params;
  const navigation = (0, _native.useNavigation)();
  const toast = (0, _reactNativeToastNotifications.useToast)();
  const {
    mutate
  } = (0, _swr.useSWRConfig)();
  const {
    data: userMe
  } = (0, _swr.default)("swr.user.me");
  const {
    mutate: adminMutate
  } = (0, _infinite.default)(index => `${payload._id}swr.group.admins.${index}`);
  const {
    mutate: membersMutate
  } = (0, _infinite.default)(index => `${payload._id}swr.group.members.${index}`);
  const inviteAdmin = (0, _react.useCallback)(async () => {
    user.setAdminInvited(mutate, user._id);
    await _apis.GroupApi.inviteAdmin({
      id: payload._id,
      userId: user._id
    });
    navigation.goBack();
    toast.show("Амжилттай илгээлээ", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in"
    });
  }, [navigation]);
  const declineAdminInvite = (0, _react.useCallback)(async () => {
    user.setAdminInvitedCancel(mutate, user._id);
    await _apis.GroupApi.cancelAdminRequest(payload._id, user._id);
    navigation.goBack();
    toast.show("Хүсэлт цуцлагдлаа", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in"
    });
  }, []);
  const leaveGroup = (0, _react.useCallback)(() => {
    navigation.navigate(_types.NavigationRoutes.Group_RemoveSheet, {
      user: user,
      payload: payload
    });
  }, [navigation]);
  const removeGroup = (0, _react.useCallback)(async () => {
    payload.setMinusCount(mutate);
    await _apis.GroupApi.removeGroup(payload._id, user._id);
    navigation.goBack();
    toast.show("Бүлгээс хаслаа", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in"
    });
    setTimeout(() => {
      membersMutate();
    }, 300);
  }, [navigation]);
  const removeAdmin = (0, _react.useCallback)(async () => {
    user.setUnTakeAdmin(mutate, user._id);
    await _apis.GroupApi.removeAdmin(payload._id, user._id);
    navigation.goBack();
    toast.show("Амдинаас хаслаа", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in"
    });
  }, [navigation, user]);
  const refuseAdmin = (0, _react.useCallback)(async () => {
    user.setUnTakeAdmin(mutate, user._id);
    await _apis.GroupApi.refuseAdmin(payload._id);
    navigation.goBack();
    toast.show("Админ эрх ариллаа", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in"
    });
    setTimeout(() => {
      adminMutate();
    }, 300);
  }, [navigation, adminMutate, user]);
  const seeProfile = (0, _react.useCallback)(() => {
    navigation.navigate(_xsUserNative.UserNavigationRoutes.User_ProfileScreen, {
      userId: user._id
    });
  }, [navigation]);
  const goChat = (0, _react.useCallback)(() => {
    navigation.navigate(_xsChatNative.ChatNavigationRoutes.Chat_ChatScreen, {
      user: user,
      type: "SINGLE",
      payload: user._id
    });
  }, [navigation]);
  const renderButtons = (0, _react.useCallback)(() => {
    if (user._id === userMe._id) {
      if (payload.isGroupOwner) {
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
      }
      if (payload.isAdmin) {
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_bottomsheetList.BottomsheetListCard, {
          title: "\u0410\u0434\u043C\u0438\u043D \u044D\u0440\u0445\u044D\u044D \u0430\u0440\u0438\u043B\u0433\u0430\u0445",
          icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.UserNurseIcon, {
            color: _xsCoreNative.Colors.primary,
            size: _xsCoreNative.IconSizes.Medium
          }),
          onPress: refuseAdmin
        }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.h10
        }), /*#__PURE__*/_react.default.createElement(_bottomsheetList.BottomsheetListCard, {
          title: "\u0411\u04AF\u043B\u0433\u044D\u044D\u0441 \u0433\u0430\u0440\u0430\u0445",
          icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.UserMinusIcon, {
            color: _xsCoreNative.Colors.primary,
            size: _xsCoreNative.IconSizes.Medium
          }),
          onPress: leaveGroup
        }));
      }
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_bottomsheetList.BottomsheetListCard, {
        title: "\u0411\u04AF\u043B\u0433\u044D\u044D\u0441 \u0433\u0430\u0440\u0430\u0445",
        icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.UserMinusIcon, {
          color: _xsCoreNative.Colors.primary,
          size: _xsCoreNative.IconSizes.Medium
        }),
        onPress: leaveGroup
      }));
    }
    if (user.isGroupOwner) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_bottomsheetList.BottomsheetListCard, {
        title: "\u041F\u0440\u043E\u0444\u0430\u0439\u043B \u04AF\u0437\u044D\u0445",
        icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.UserCircleIcon, {
          color: _xsCoreNative.Colors.primary,
          size: _xsCoreNative.IconSizes.Medium
        }),
        onPress: seeProfile
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.h10
      }), /*#__PURE__*/_react.default.createElement(_bottomsheetList.BottomsheetListCard, {
        title: "\u0427\u0430\u0442 \u0431\u0438\u0447\u0438\u0445",
        icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.CommentIcon, {
          color: _xsCoreNative.Colors.primary,
          size: _xsCoreNative.IconSizes.Medium
        }),
        onPress: goChat
      }));
    }
    if (user.isAdmin) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_bottomsheetList.BottomsheetListCard, {
        title: "\u0410\u0434\u043C\u0438\u043D\u0430\u0430\u0441 \u0445\u0430\u0441\u0430\u0445",
        icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.UserNurseIcon, {
          color: _xsCoreNative.Colors.primary,
          size: _xsCoreNative.IconSizes.Medium
        }),
        onPress: removeAdmin
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.h10
      }), /*#__PURE__*/_react.default.createElement(_bottomsheetList.BottomsheetListCard, {
        title: "\u0411\u04AF\u043B\u0433\u044D\u044D\u0441 \u0433\u0430\u0440\u0433\u0430\u0445",
        icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.UserMinusIcon, {
          color: _xsCoreNative.Colors.primary,
          size: _xsCoreNative.IconSizes.Medium
        }),
        onPress: removeGroup
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.h10
      }), /*#__PURE__*/_react.default.createElement(_bottomsheetList.BottomsheetListCard, {
        title: "\u041F\u0440\u043E\u0444\u0430\u0439\u043B \u04AF\u0437\u044D\u0445",
        icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.UserCircleIcon, {
          color: _xsCoreNative.Colors.primary,
          size: _xsCoreNative.IconSizes.Medium
        }),
        onPress: seeProfile
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.h10
      }), /*#__PURE__*/_react.default.createElement(_bottomsheetList.BottomsheetListCard, {
        title: "\u0427\u0430\u0442 \u0431\u0438\u0447\u0438\u0445",
        icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.CommentIcon, {
          color: _xsCoreNative.Colors.primary,
          size: _xsCoreNative.IconSizes.Medium
        }),
        onPress: goChat
      }));
    }
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, user.isAdminInvited ? /*#__PURE__*/_react.default.createElement(_bottomsheetList.BottomsheetListCard, {
      title: "\u0410\u0434\u043C\u0438\u043D \u0443\u0440\u0438\u043B\u0433\u0430 \u0446\u0443\u0446\u043B\u0430\u0445",
      icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.UserNurseIcon, {
        color: _xsCoreNative.Colors.primary,
        size: _xsCoreNative.IconSizes.Medium
      }),
      onPress: declineAdminInvite
    }) : /*#__PURE__*/_react.default.createElement(_bottomsheetList.BottomsheetListCard, {
      title: "\u0410\u0434\u043C\u0438\u043D \u0443\u0440\u0438\u043B\u0433\u0430 \u0438\u043B\u0433\u044D\u044D\u0445",
      icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.UserNurseIcon, {
        color: _xsCoreNative.Colors.primary,
        size: _xsCoreNative.IconSizes.Medium
      }),
      onPress: inviteAdmin
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.h10
    }), /*#__PURE__*/_react.default.createElement(_bottomsheetList.BottomsheetListCard, {
      title: "\u0411\u04AF\u043B\u0433\u044D\u044D\u0441 \u0433\u0430\u0440\u0433\u0430\u0445",
      icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.UserMinusIcon, {
        color: _xsCoreNative.Colors.primary,
        size: _xsCoreNative.IconSizes.Medium
      }),
      onPress: removeGroup
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.h10
    }), /*#__PURE__*/_react.default.createElement(_bottomsheetList.BottomsheetListCard, {
      title: "\u041F\u0440\u043E\u0444\u0430\u0439\u043B \u04AF\u0437\u044D\u0445",
      icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.UserCircleIcon, {
        color: _xsCoreNative.Colors.primary,
        size: _xsCoreNative.IconSizes.Medium
      }),
      onPress: seeProfile
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.h10
    }), /*#__PURE__*/_react.default.createElement(_bottomsheetList.BottomsheetListCard, {
      title: "\u0427\u0430\u0442 \u0431\u0438\u0447\u0438\u0445",
      icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.CommentIcon, {
        color: _xsCoreNative.Colors.primary,
        size: _xsCoreNative.IconSizes.Medium
      }),
      onPress: goChat
    }));
  }, [user]);
  return /*#__PURE__*/_react.default.createElement(_bottomSheet.BottomSheetScrollView, {
    style: styles.root,
    showsVerticalScrollIndicator: false
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h15
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.userContainer
  }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Avatar, {
    source: user.avatar?.large,
    size: _xsCoreNative.AvatarSizes.Large
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h10
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.username
  }, (0, _username.username)(user))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h15
  }), renderButtons());
});
UserMoreSheet.displayName = "UserMoreSheet";
const styles = _reactNative.StyleSheet.create({
  root: {
    paddingHorizontal: 18
  },
  h15: {
    height: 15
  },
  h10: {
    height: 10
  },
  userContainer: {
    alignItems: "center"
  },
  username: {
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "500",
    color: _xsCoreNative.Colors.primary
  },
  card: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderColor: _xsCoreNative.Colors.gray101,
    borderWidth: 1,
    padding: 10
  }
});
//# sourceMappingURL=user-more.js.map