"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupHeaderItem = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _mutualFriends = require("../mutual-friends");
var _description = require("../description");
var _native = require("@react-navigation/native");
var _apis = require("../../apis");
var _navigation = require("../../navigation");
var _swr = _interopRequireWildcard(require("swr"));
var _infinite = _interopRequireDefault(require("swr/infinite"));
var _cover = require("./cover");
var _xsChatNative = require("@goodtechsoft/xs-chat-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const GroupHeaderItem = exports.GroupHeaderItem = /*#__PURE__*/(0, _react.memo)(props => {
  const {
    joinButton = false,
    data,
    notifData
  } = props;
  const {
    mutate
  } = (0, _swr.useSWRConfig)();
  const navigation = (0, _native.useNavigation)();
  const {
    data: user
  } = (0, _swr.default)("swr.user.me");
  const {
    mutate: thisGroupMutate
  } = (0, _swr.default)(`swr.group.${data._id}`);
  const {
    mutate: myMutate
  } = (0, _infinite.default)(index => `swr.group.my.${index}`);
  if (!data) {
    return null;
  }
  const onInfo = (0, _react.useCallback)(() => {
    console.log("INFO");
  }, []);
  const onRule = (0, _react.useCallback)(() => {}, [navigation]);
  const onPress = (0, _react.useCallback)(() => {
    navigation.navigate(_navigation.NavigationRoutes.Group_UserMoreSheet, {
      user: user,
      payload: data
    });
  }, []);
  const join = (0, _react.useCallback)(async () => {
    try {
      if (notifData) {
        notifData.setIsDone(mutate);
      }
      await _apis.GroupApi.join(data._id);
      if (data.privacy === "PRIVATE") {
        if (data.isInvited) {
          data.setSignCount(mutate);
          data.setJoin(mutate, true);
          myMutate();
          thisGroupMutate();
        } else {
          data.setPending(mutate, true);
        }
      } else {
        data.setSignCount(mutate);
        data.setJoin(mutate, true);
        myMutate();
        thisGroupMutate();
      }
    } catch (error) {
      console.log(error);
    }
  }, [data, mutate, myMutate, thisGroupMutate]);
  const cancel = (0, _react.useCallback)(async () => {
    try {
      await _apis.GroupApi.cancelRequest(data._id);
      data.setPending(mutate, false);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const inviteUsers = (0, _react.useCallback)(() => {
    navigation.navigate(_navigation.NavigationRoutes.Group_InviteUsersScreen, {
      payload: data
    });
  }, []);
  const goChat = (0, _react.useCallback)(() => {
    navigation.navigate(_xsChatNative.ChatNavigationRoutes.Chat_CommunityListScreen, {
      payload: data
    });
  }, []);
  const renderButton = (0, _react.useCallback)(() => {
    if (data.isAdmin) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.row
      }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
        onPress: inviteUsers,
        type: "primary",
        icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.UserPlusAltIcon, {
          color: _xsCoreNative.Colors.white,
          size: _xsCoreNative.IconSizes.Large
        })
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.w4
      }), /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
        style: styles.actionButton,
        onPress: onPress,
        title: "\u041D\u044D\u0433\u0434\u0441\u044D\u043D",
        type: "default",
        icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.ArrowBottomIcon, {
          color: _xsCoreNative.Colors.primary,
          size: _xsCoreNative.IconSizes.Medium
        })
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.w4
      }), /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
        onPress: goChat,
        type: "primary",
        icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.CommentIcon, {
          color: _xsCoreNative.Colors.white,
          size: _xsCoreNative.IconSizes.Large
        })
      }));
    }
    if (data.isJoined) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.row
      }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
        onPress: inviteUsers,
        type: "primary",
        icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.UserPlusAltIcon, {
          color: _xsCoreNative.Colors.white,
          size: _xsCoreNative.IconSizes.Large
        })
      }), /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
        style: styles.actionButton,
        onPress: onPress,
        title: "\u041D\u044D\u0433\u0434\u0441\u044D\u043D",
        type: "default",
        icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.ArrowBottomIcon, {
          color: _xsCoreNative.Colors.primary,
          size: _xsCoreNative.IconSizes.Medium
        })
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.w4
      }), /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
        onPress: goChat,
        type: "primary",
        icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.CommentIcon, {
          color: _xsCoreNative.Colors.white,
          size: _xsCoreNative.IconSizes.Large
        })
      }));
    }
    if (data.isPending) {
      return /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
        onPress: cancel,
        title: "\u0425\u04AF\u0441\u044D\u043B\u0442 \u0446\u0443\u0446\u043B\u0430\u0445",
        type: "default"
      });
    }
    if (data.isInvited) {
      return /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
        onPress: join,
        title: "\u041D\u044D\u0433\u0434\u044D\u0445",
        type: "primary"
      });
    }
    return /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
      onPress: join,
      title: "\u041D\u044D\u0433\u0434\u044D\u0445",
      type: "primary"
    });
  }, [data]);
  const renderPrivacy = (0, _react.useCallback)(() => {
    if (data.privacy === "PUBLIC") {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.groupPrivacy
      }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.GlobeIcon, {
        color: _xsCoreNative.Colors.gray103,
        size: _xsCoreNative.IconSizes.Small
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.w4
      }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: styles.privacyText
      }, "\u041D\u044D\u044D\u043B\u0442\u0442\u044D\u0439 \u0431\u04AF\u043B\u044D\u0433")));
    }
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.groupPrivacy
    }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.LockIcon, {
      color: _xsCoreNative.Colors.gray103,
      size: _xsCoreNative.IconSizes.Small
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.w4
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.privacyText
    }, "\u041D\u0443\u0443\u0446\u043B\u0430\u043B\u0442\u0430\u0439 \u0431\u04AF\u043B\u044D\u0433")));
  }, [data]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.root
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    pointerEvents: "none",
    style: styles.cover
  }, /*#__PURE__*/_react.default.createElement(_cover.CoverImage, {
    image: data.coverImage,
    width: 230,
    height: 170
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.headerCard,
    pointerEvents: "none"
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h15
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.groupName
  }, data.name), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h4
  }), renderPrivacy(), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h4
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.privacyText
  }, data.membersCount, " \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h15
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    pointerEvents: "box-none",
    style: styles.ph18
  }, joinButton && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, renderButton(), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h15
  })), !data.isJoined && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_description.DescriptionItem, {
    title: "Тухай",
    onPress: onInfo,
    description: data.description
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h15
  }), data.rule && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_description.DescriptionItem, {
    title: "Дүрэм",
    onPress: onRule,
    description: data.rule
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h15
  })), data.followers && /*#__PURE__*/_react.default.createElement(_mutualFriends.MutualFriendsItem, {
    data: data.followers
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h20
  }))));
});
GroupHeaderItem.displayName = "GroupHeaderItem";
const styles = _reactNative.StyleSheet.create({
  root: {
    pointerEvents: "box-none"
  },
  header: {
    zIndex: 10
  },
  row: {
    flexDirection: "row"
  },
  ph18: {
    paddingHorizontal: 18
  },
  h15: {
    height: 15
  },
  h20: {
    height: 20
  },
  h4: {
    height: 4
  },
  w4: {
    width: 4
  },
  actionButton: {
    flex: 1
  },
  headerCard: {
    paddingHorizontal: 18,
    backgroundColor: _xsCoreNative.Colors.white
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 22,
    color: _xsCoreNative.Colors.primary
  },
  cover: {
    height: 210,
    width: "100%",
    backgroundColor: _xsCoreNative.Colors.gray102
  },
  groupName: {
    fontSize: 18,
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 24,
    color: _xsCoreNative.Colors.primary
  },
  groupPrivacy: {
    flexDirection: "row"
  },
  privacyText: {
    fontSize: 12,
    fontFamily: "Inter",
    fontWeight: "400",
    color: _xsCoreNative.Colors.gray103
  }
});
//# sourceMappingURL=group-header.js.map