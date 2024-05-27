"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequestedUsersScreen = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _native = require("@react-navigation/native");
var _listUser = require("../../components/card/list-user");
var _apis = require("../../apis");
var _infinite = _interopRequireDefault(require("swr/infinite"));
var _reactNativeToastNotifications = require("react-native-toast-notifications");
var _swr = _interopRequireWildcard(require("swr"));
var _skeletonListUser = require("../../components/card/skeleton-list-user");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const RequestedUsersScreen = exports.RequestedUsersScreen = /*#__PURE__*/(0, _react.memo)(({
  route
}) => {
  const navigation = (0, _native.useNavigation)();
  const {
    payload
  } = route.params;
  const toast = (0, _reactNativeToastNotifications.useToast)();
  const [nextPage, setNextPage] = (0, _react.useState)(false);
  const [value, setValue] = (0, _react.useState)("");
  const query = (0, _xsCoreNative.useDebounce)(value, 300);
  const {
    mutate: groupMutate
  } = (0, _swr.useSWRConfig)();
  const {
    data,
    size,
    setSize,
    isLoading,
    mutate
  } = (0, _infinite.default)(index => `${payload._id}.swr.request.users.${index}`, async index => {
    const page = index.split(".").pop() || "";
    const res = await _apis.GroupApi.requestList({
      id: payload._id,
      page: parseInt(`${page || 1}`, 10) + 1,
      query: query
    });
    return res;
  }, {
    revalidateAll: true
  });
  const {
    mutate: memberList
  } = (0, _infinite.default)(index => `${payload._id}swr.group.members.${index}`);
  const {
    data: groupData
  } = (0, _swr.default)(`swr.group.${payload._id}`);
  const acceptRequest = async item => {
    await _apis.GroupApi.acceptMember({
      id: payload._id,
      userId: item._id
    });
    groupData?.setMinusPendingCount(groupMutate);
    toast.show("Зөвшөөрлөө", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in"
    });
    setTimeout(() => {
      mutate();
      memberList();
      groupData?.setSignCount(groupMutate);
    }, 300);
  };
  const renderItem = (0, _react.useCallback)(({
    item
  }) => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.h15
    }), /*#__PURE__*/_react.default.createElement(_listUser.ListUserCard, {
      onPress: async (user, type) => {
        switch (type) {
          case "isJoin":
            return acceptRequest(user);
          default:
            break;
        }
      },
      isJoin: true,
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
      description: `'${query}' нэртэй хэрэглэгч байхгүй байна`,
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
  if (flatData && (flatData || [])[0] === null) {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null);
  }
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
    }, "\u0425\u04AF\u0441\u044D\u043B\u0442\u04AF\u04AF\u0434")
  })), /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    ListHeaderComponent: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
    ListFooterComponent: listFooter,
    onEndReached: async () => {
      setNextPage(true);
      setSize(size + 1);
      setNextPage(false);
    },
    ListEmptyComponent: renderEmpty,
    keyExtractor: item => `${item._id}`,
    renderItem: renderItem,
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
    flexGrow: 1,
    backgroundColor: _xsCoreNative.Colors.gray101
  },
  header: {
    zIndex: 10
  },
  h15: {
    height: 15
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
  listContent: {
    marginTop: 10,
    backgroundColor: _xsCoreNative.Colors.white,
    paddingVertical: 20,
    borderRadius: 10
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    color: _xsCoreNative.Colors.primary
  },
  input: {
    backgroundColor: _xsCoreNative.Colors.gray101
  },
  inputContainer: {
    paddingHorizontal: 18
  },
  card: {
    backgroundColor: _xsCoreNative.Colors.white,
    padding: 18
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
RequestedUsersScreen.displayName = "RequestedUsersScreen";
//# sourceMappingURL=requested-users.js.map