"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTabScreen = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _reactNativeCollapsibleTabView = require("react-native-collapsible-tab-view");
var _listUser = require("../card/list-user");
var _xsUserNative = require("@goodtechsoft/xs-user-native");
var _apis = require("../../apis");
var _infinite = _interopRequireDefault(require("swr/infinite"));
var _native = require("@react-navigation/native");
var _navigation = require("../../navigation");
var _swr = require("swr");
var _skeletonListUser = require("../card/skeleton-list-user");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const UsersTabScreen = exports.UsersTabScreen = /*#__PURE__*/(0, _react.memo)(props => {
  const {
    payload
  } = props;
  const [refreshing, setRefreshing] = (0, _react.useState)(false);
  const [value, setValue] = (0, _react.useState)("");
  const query = (0, _xsCoreNative.useDebounce)(value, 300);
  const {
    mutate
  } = (0, _swr.useSWRConfig)();
  const [nextPage, setNextPage] = (0, _react.useState)(false);
  const navigation = (0, _native.useNavigation)();
  const {
    data,
    size,
    setSize,
    isLoading
  } = (0, _infinite.default)(index => `${payload._id}swr.group.members.${index}${query}`, async index => {
    const page = index.split(".").pop() || "";
    const res = await _apis.GroupApi.memberList({
      page: parseInt(`${page || 1}`, 10) + 1,
      query: query,
      id: payload._id
    });
    return res;
  }, {
    revalidateAll: true
  });
  const {
    data: adminData,
    isLoading: adminIsLoading
  } = (0, _infinite.default)(index => `${payload._id}swr.group.admins.${index}`, async index => {
    const page = index.split(".").pop() || "";
    const res = await _apis.GroupApi.adminList({
      page: parseInt(`${page || 1}`, 10) + 1,
      id: payload._id
    });
    return res;
  }, {
    revalidateAll: true
  });
  const flatData = (data || [])?.map(row => row?.rows).flat();
  if (flatData && (flatData || [])[0] === null) {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null);
  }
  const flatAdminData = (adminData || [])?.map(row => row?.rows).flat();
  if (flatAdminData && (flatAdminData || [])[0] === null) {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null);
  }
  const onUnFollow = (0, _react.useCallback)(user => {
    const _user = _xsUserNative.User.fromJson(user);
    if (_user.profilePrivacy) {
      navigation.navigate(_xsUserNative.UserNavigationRoutes.User_UnfollowConfirmSheet, {
        payload: user
      });
    } else {
      _user.setUnFollow(mutate);
      _apis.UserApi.unfollow(_user._id);
    }
  }, [mutate, navigation]);
  const onFollow = (0, _react.useCallback)(async user => {
    const _user = _xsUserNative.User.fromJson(user);
    if (_user.profilePrivacy) {
      const res = await _apis.UserApi.follow(_user._id);
      _user.updateRequest(res._id, mutate);
    } else {
      _user.setFollow(mutate);
      await _apis.UserApi.follow(_user._id);
    }
  }, [mutate]);
  const onRemoveRequest = (0, _react.useCallback)(user => {
    const _user = _xsUserNative.User.fromJson(user);
    _user.setRemoveRequest(mutate);
    _apis.UserApi.removeRequestCancel(_user.userRequest);
  }, [mutate]);
  const onLike = (0, _react.useCallback)(user => {
    const _user = _xsUserNative.User.fromJson(user);
    _user.setPageLike(mutate, user._id);
    _apis.UserApi.likePage(user._id);
  }, []);
  const unLike = (0, _react.useCallback)(user => {
    const _user = _xsUserNative.User.fromJson(user);
    _user.setPageUnLike(mutate, user._id);
    _apis.UserApi.unlikePage(user._id);
  }, []);
  const onPress = (0, _react.useCallback)(async (user, type) => {
    switch (type) {
      case "me":
        navigation.navigate(_navigation.NavigationRoutes.Group_UserMoreSheet, {
          user: user,
          payload: payload
        });
        break;
      case "isFollowing":
        onUnFollow(user);
        break;
      case "userRequested":
        onRemoveRequest(user);
        break;
      case "follow":
        onFollow(user);
        break;
      case "isLike":
        onLike(user);
        break;
      case "unLike":
        unLike(user);
        break;
      default:
        break;
    }
  }, []);
  const renderItem = (0, _react.useCallback)(({
    index,
    item
  }) => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, index !== 0 && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.h15
    }), /*#__PURE__*/_react.default.createElement(_listUser.ListUserCard, {
      onPress: onPress,
      user: item
    }));
  }, []);
  const renderEmpty = (0, _react.useCallback)(() => {
    if (isLoading) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.empty
      }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Loader, null));
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.empty
    }, query ? /*#__PURE__*/_react.default.createElement(_xsCoreNative.Empty, {
      title: "Хайсан хэрэглэгч олдсонгүй",
      description: `'${query}' нэртэй хэрэглэгч байхгүй байна`,
      icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.UserIcon, {
        size: _xsCoreNative.IconSizes.Medium,
        color: _xsCoreNative.Colors.white
      })
    }) : /*#__PURE__*/_react.default.createElement(_xsCoreNative.Empty, {
      title: "Хоосон байна",
      description: "\u042D\u043D\u044D \u0431\u04AF\u043B\u044D\u0433\u0442 \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447 \u0431\u0430\u0439\u0445\u0433\u04AF\u0439 \u0431\u0430\u0439\u043D\u0430",
      icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.UsersIcon, {
        size: _xsCoreNative.IconSizes.Medium,
        color: _xsCoreNative.Colors.white
      })
    }));
  }, [isLoading]);
  const listFooter = (0, _react.useCallback)(() => {
    if (nextPage) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.ph18
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.h15
      }), /*#__PURE__*/_react.default.createElement(_skeletonListUser.SkeletonListUserCard, null), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.h15
      }), /*#__PURE__*/_react.default.createElement(_skeletonListUser.SkeletonListUserCard, null));
    } else {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null);
    }
  }, [nextPage]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, payload.isJoined || payload.privacy === "PUBLIC" ? /*#__PURE__*/_react.default.createElement(_reactNativeCollapsibleTabView.Tabs.FlatList, {
    data: flatData,
    renderItem: renderItem,
    style: styles.root,
    refreshControl: /*#__PURE__*/_react.default.createElement(_reactNative.RefreshControl, {
      onRefresh: async () => {
        setRefreshing(true);
        setSize(1);
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      },
      refreshing: refreshing
    }),
    showsVerticalScrollIndicator: false,
    ListHeaderComponent: /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.headerContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.adminCard
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.ph18
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.subTitle
    }, "\u0410\u0434\u043C\u0438\u043D")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.h15
    }), /*#__PURE__*/_react.default.createElement(_reactNativeCollapsibleTabView.Tabs.FlatList, {
      ListEmptyComponent: adminIsLoading ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.loader
      }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Loader, null)) : /*#__PURE__*/_react.default.createElement(_reactNative.View, null),
      data: flatAdminData,
      renderItem: renderItem
    })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.h10, styles.bgGray]
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.borderTopRadius
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.allUser
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.h10
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.subTitle
    }, "\u041D\u0438\u0439\u0442 \u0433\u0438\u0448\u04AF\u04AF\u0434"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.h15
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.inputContainer
    }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.TextInput, {
      placeholder: "\u0425\u0430\u0439\u0445",
      onChangeText: value => setValue(value),
      style: styles.input,
      prefix: /*#__PURE__*/_react.default.createElement(_xsCoreNative.SearchIcon, {
        color: _xsCoreNative.Colors.gray103,
        size: _xsCoreNative.IconSizes.Medium
      })
    })))),
    ListFooterComponent: listFooter,
    ListEmptyComponent: renderEmpty,
    keyExtractor: item => item._id,
    contentContainerStyle: styles.listContent,
    contentInset: {
      top: 0,
      bottom: 20,
      left: 0,
      right: 0
    },
    onEndReached: async () => {
      setNextPage(true);
      setSize(size + 1);
      setNextPage(false);
    },
    contentInsetAdjustmentBehavior: "automatic"
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.root
  }));
});
const styles = _reactNative.StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: _xsCoreNative.Colors.gray101
  },
  h20: {
    height: 20
  },
  h15: {
    height: 15
  },
  h10: {
    height: 10
  },
  h4: {
    height: 4
  },
  w4: {
    width: 4
  },
  ph18: {
    paddingHorizontal: 18
  },
  bgGray: {
    backgroundColor: _xsCoreNative.Colors.gray101
  },
  listContent: {
    marginTop: 0,
    backgroundColor: _xsCoreNative.Colors.white,
    paddingBottom: 20
  },
  subTitle: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "600",
    color: _xsCoreNative.Colors.primary
  },
  allUser: {
    backgroundColor: _xsCoreNative.Colors.white,
    paddingHorizontal: 18,
    paddingBottom: 15
  },
  inputContainer: {},
  input: {
    backgroundColor: _xsCoreNative.Colors.gray101
  },
  headerContainer: {
    backgroundColor: _xsCoreNative.Colors.gray101
  },
  card: {
    backgroundColor: _xsCoreNative.Colors.white,
    padding: 18,
    borderRadius: 10
  },
  loader: {
    width: "100%",
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  borderTopRadius: {
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    backgroundColor: _xsCoreNative.Colors.white,
    height: 10
  },
  adminCard: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: _xsCoreNative.Colors.white,
    paddingVertical: 18
  },
  empty: {
    marginTop: 10,
    borderWidth: 0,
    backgroundColor: _xsCoreNative.Colors.white,
    borderRadius: 10,
    height: 180,
    justifyContent: "center",
    alignItems: "center"
  }
});
UsersTabScreen.displayName = "UsersTabScreen";
//# sourceMappingURL=users.js.map