"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InviteUsersScreen = void 0;
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _xsUserNative = require("@goodtechsoft/xs-user-native");
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _apis = require("../../apis");
var _listUser = require("../../components/card/list-user");
var _infinite = _interopRequireDefault(require("swr/infinite"));
var _swr = _interopRequireWildcard(require("swr"));
var _skeletonListUser = require("../../components/card/skeleton-list-user");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const InviteUsersScreen = exports.InviteUsersScreen = /*#__PURE__*/(0, _react.memo)(({
  route
}) => {
  const [value, setValue] = (0, _react.useState)("");
  const [nextPage, setNextPage] = (0, _react.useState)(false);
  const query = (0, _xsCoreNative.useDebounce)(value, 300);
  const navigation = (0, _native.useNavigation)();
  const {
    payload
  } = route.params;
  const {
    mutate
  } = (0, _swr.useSWRConfig)();
  const {
    data: user
  } = (0, _swr.default)("swr.user.me");
  const {
    data,
    size,
    setSize,
    isLoading
  } = (0, _infinite.default)(index => {
    return `${user?._id}.${query}.swr.followers|${index}`;
  }, async url => {
    const nextPage = url.split("|").pop() || undefined;
    const res = await _apis.GroupApi.invitationList({
      limit: 10,
      page: parseInt(`${nextPage || 1}`, 10) + 1,
      query: query,
      id: payload._id
    });
    return res;
  }, {
    revalidateAll: true
  });
  const onPress = (0, _react.useCallback)(async user => {
    const _user = _xsUserNative.User.fromJson(user);
    const sendData = {
      user: _user._id
    };
    if (!_user.isInvited) {
      _user.setGroupInvite(mutate);
      await _apis.GroupApi.inviteMember({
        id: payload._id,
        data: sendData
      });
    } else {
      _user.setGroupUnInvite(mutate);
      await _apis.GroupApi.inviteCancel({
        id: payload._id,
        data: sendData
      });
    }
  }, []);
  const renderItem = (0, _react.useCallback)(({
    index,
    item
  }) => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, index !== 0 && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.h15
    }), /*#__PURE__*/_react.default.createElement(_listUser.ListUserCard, {
      onPress: user => onPress(user),
      invite: true,
      user: item
    }));
  }, []);
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
  const renderEmpty = (0, _react.useCallback)(() => {
    if (isLoading) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.empty
      }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Loader, null));
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.empty
    }, query ? /*#__PURE__*/_react.default.createElement(_xsCoreNative.Empty, {
      title: "Хоосон байна",
      description: `'${query}' нэртэй хэрэглэгчт байхгүй байна`,
      icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.UserIcon, {
        size: _xsCoreNative.IconSizes.Medium,
        color: _xsCoreNative.Colors.white
      })
    }) : /*#__PURE__*/_react.default.createElement(_xsCoreNative.Empty, {
      title: "Хоосон байна",
      icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.UserIcon, {
        size: _xsCoreNative.IconSizes.Medium,
        color: _xsCoreNative.Colors.white
      })
    }));
  }, [isLoading]);
  const flatData = (data || [])?.map(row => row?.rows).flat();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.root
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
    center: /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.title
    }, "\u0413\u0438\u0448\u04AF\u04AF\u043D \u0443\u0440\u0438\u0445")
  })), /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    showsVerticalScrollIndicator: false,
    ListHeaderComponent: /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.headerContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.inputContainer
    }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.TextInput, {
      placeholder: "\u0425\u0430\u0439\u0445",
      onChangeText: value => setValue(value),
      style: styles.input,
      prefix: /*#__PURE__*/_react.default.createElement(_xsCoreNative.SearchIcon, {
        color: _xsCoreNative.Colors.gray103,
        size: _xsCoreNative.IconSizes.Medium
      })
    }))),
    data: flatData,
    renderItem: renderItem,
    ListEmptyComponent: renderEmpty(),
    ListFooterComponent: listFooter,
    onEndReached: async () => {
      setNextPage(true);
      setSize(size + 1);
      setNextPage(false);
    },
    contentContainerStyle: styles.listContent,
    contentInset: {
      top: 0,
      bottom: 20,
      left: 0,
      right: 0
    },
    contentInsetAdjustmentBehavior: "automatic"
  }));
});
const styles = _reactNative.StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: _xsCoreNative.Colors.gray101
  },
  header: {
    zIndex: 10
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
  headerContainer: {
    backgroundColor: _xsCoreNative.Colors.gray101
  },
  listContent: {
    marginTop: 10,
    backgroundColor: _xsCoreNative.Colors.white,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingBottom: 20
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 22,
    color: _xsCoreNative.Colors.primary
  },
  bgGray: {
    backgroundColor: _xsCoreNative.Colors.gray101
  },
  card: {
    backgroundColor: _xsCoreNative.Colors.white,
    padding: 18,
    borderRadius: 10
  },
  empty: {
    marginTop: 10,
    borderWidth: 0,
    backgroundColor: _xsCoreNative.Colors.white,
    borderRadius: 10,
    height: 180,
    justifyContent: "center",
    alignItems: "center"
  },
  requestCard: {},
  borderTopRadius: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: _xsCoreNative.Colors.white,
    height: 10
  },
  input: {
    backgroundColor: _xsCoreNative.Colors.gray101
  },
  inputContainer: {
    padding: 18,
    backgroundColor: _xsCoreNative.Colors.white
  }
});
InviteUsersScreen.displayName = "InviteUsersScreen";
//# sourceMappingURL=invite-users.js.map