"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AllPendingPostScreen = void 0;
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeToastNotifications = require("react-native-toast-notifications");
var _apis = require("../../apis");
var _xsPostNative = require("@goodtechsoft/xs-post-native");
var _infinite = _interopRequireDefault(require("swr/infinite"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const AllPendingPostScreen = exports.AllPendingPostScreen = /*#__PURE__*/(0, _react.memo)(({
  route
}) => {
  const {
    payload
  } = route.params;
  const navigation = (0, _native.useNavigation)();
  const toast = (0, _reactNativeToastNotifications.useToast)();
  const {
    mutate: postListMutate
  } = (0, _infinite.default)((_, _prev) => {
    return `${payload._id}.swr.group|${_prev?.nextPage || ""}`;
  });
  const {
    data,
    size,
    setSize,
    isLoading,
    mutate
  } = (0, _infinite.default)(index => `swr.requested.post.${index}`, async index => {
    const page = index.split(".").pop() || "";
    const res = await _apis.PostApi.postRequestList({
      id: payload._id,
      page: parseInt(`${page || 1}`, 10) + 1,
      limit: 10
    });
    return res;
  }, {
    revalidateAll: true
  });
  const postDelete = (0, _react.useCallback)(async item => {
    await _apis.PostApi.deletePost(item._id);
    setTimeout(() => {
      mutate();
    }, 300);
    toast.show("Амжилттай устлаа", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in"
    });
  }, []);
  const postApprove = (0, _react.useCallback)(async item => {
    await _apis.PostApi.approvePost(payload._id, item._id);
    setTimeout(() => {
      postListMutate();
      mutate();
    }, 300);
    toast.show("Амжилттай нийтлэгдлээ", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in"
    });
  }, []);
  const renderItem = (0, _react.useCallback)(({
    item
  }) => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.postCard
    }, /*#__PURE__*/_react.default.createElement(_xsPostNative.PostCard, {
      useSafeArea: true,
      inGroup: true,
      payload: _xsPostNative.Post.fromJson(item)
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.row
    }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
      style: styles.button,
      onPress: () => postApprove(item),
      title: "Зөвшөөрөх",
      type: "primary"
    }), /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
      style: styles.button,
      onPress: () => postDelete(item),
      title: "Устгах",
      type: "default"
    })));
  }, []);
  const emptyRender = (0, _react.useCallback)(() => {
    if (isLoading) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.empty
      }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Loader, null));
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.empty
    }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Empty, {
      title: "Хоосон байна",
      description: "\u042D\u043D\u044D \u0431\u04AF\u043B\u044D\u0433\u0442 \u043F\u043E\u0441\u0442 \u043D\u0438\u0439\u0442\u043B\u044D\u0433\u0434\u044D\u044D\u0433\u04AF\u0439 \u0431\u0430\u0439\u043D\u0430!",
      icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.UsersIcon, {
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
    }, "\u041D\u0438\u0439\u0442\u043B\u044D\u0445 \u0445\u04AF\u0441\u044D\u043B\u0442\u04AF\u04AF\u0434")
  })), /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    showsVerticalScrollIndicator: false,
    data: flatData,
    initialNumToRender: 7,
    renderItem: renderItem,
    keyExtractor: item => item._id,
    ListEmptyComponent: emptyRender(),
    refreshControl: /*#__PURE__*/_react.default.createElement(_reactNative.RefreshControl, {
      onRefresh: () => {
        setSize(1);
      },
      refreshing: isLoading
    }),
    onEndReached: () => {
      setSize(size + 1);
    },
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
  row: {
    gap: 10,
    paddingHorizontal: 18,
    flexDirection: "row"
  },
  button: {
    flex: 1
  },
  postCard: {
    marginTop: 10,
    backgroundColor: _xsCoreNative.Colors.white,
    borderRadius: 10,
    paddingBottom: 15,
    borderWidth: 1,
    borderColor: _xsCoreNative.Colors.gray102
  }
});
AllPendingPostScreen.displayName = "AllPendingPostScreen";
//# sourceMappingURL=all-pending-post.js.map