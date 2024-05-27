"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostTabScreen = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _infinite = _interopRequireDefault(require("swr/infinite"));
var _reactNativeCollapsibleTabView = require("react-native-collapsible-tab-view");
var _apis = require("../../apis");
var _xsPostNative = require("@goodtechsoft/xs-post-native");
var _native = require("@react-navigation/native");
var _swr = _interopRequireDefault(require("swr"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const PostTabScreen = exports.PostTabScreen = /*#__PURE__*/(0, _react.memo)(props => {
  const {
    payload,
    focusChanged
  } = props;
  const navigation = (0, _native.useNavigation)();
  const [blockEndReached, setBlockEndReached] = (0, _react.useState)(false);
  const [refreshing, setRefreshing] = (0, _react.useState)(false);
  const [activeIndex, setActiveIndex] = (0, _react.useState)();
  const taskWorker = (0, _xsCoreNative.useTaskWorker)("Post_Created", payload => {
    console.log("Post_Created done!", payload);
  });
  const {
    data: user
  } = (0, _swr.default)("swr.user.me");
  const {
    data,
    size,
    setSize,
    isLoading
  } = (0, _infinite.default)((_, _prev) => {
    return `${payload._id}.swr.group|${_prev?.nextPage || ""}`;
  }, async url => {
    const nextPage = url.split("|").pop() || undefined;
    let res;
    res = await _apis.PostApi.groupPostList(nextPage, payload._id);
    return res;
  }, {
    revalidateAll: true
  });
  const renderItem = (0, _react.useCallback)(({
    item,
    index
  }) => {
    if (!item) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.card
    }, /*#__PURE__*/_react.default.createElement(_xsPostNative.PostCard, {
      key: item._id,
      useSafeArea: false,
      useTimeline: false,
      inGroup: true,
      focusChanged: focusChanged,
      activeIndex: activeIndex,
      payload: _xsPostNative.Post.fromJson(item),
      focused: index === activeIndex
    }));
  }, [activeIndex, focusChanged]);
  const flatData = (data || [])?.map(row => row?.rows).flat();
  if (flatData && (flatData || [])[0] === null) {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null);
  }
  const createPost = (0, _react.useCallback)(() => {
    navigation.navigate(_xsPostNative.PostNavigationRoutes.Post_NewScreen, {
      group: payload
    });
  }, [navigation]);
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
      icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.PostIcon, {
        size: _xsCoreNative.IconSizes.Medium,
        color: _xsCoreNative.Colors.white
      })
    }));
  }, [isLoading]);
  if (!payload) {
    return null;
  }
  const flatListHeader = () => {
    const {
      activeTask
    } = taskWorker;
    if (activeTask && activeTask.isRunning && activeTask.name === "Post_TaskWorker") {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.loaderContainer
      }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.TaskStatusItem, {
        image: activeTask?.payload.image,
        title: activeTask?.payload.text
      })));
    } else {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null);
    }
  };
  const _onViewableItemsChanged = (0, _react.useRef)(({
    changed
  }) => {
    setActiveIndex(changed[0]?.index || 0);
  });
  (0, _native.useFocusEffect)(() => {
    _reactNative.DeviceEventEmitter.addListener("newsfeed.block.end.reached", value => {
      console.log("liked blocked end reached ");
      setBlockEndReached(value);
    });
  });
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, payload.isJoined || payload.privacy === "PUBLIC" ? /*#__PURE__*/_react.default.createElement(_reactNativeCollapsibleTabView.Tabs.FlatList, {
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
    ListHeaderComponent: payload.isJoined ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
      onPress: createPost,
      style: styles.headerCard
    }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Avatar, {
      source: user?.avatar?.large,
      size: _xsCoreNative.AvatarSizes.Medium
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.createText
    }, "\u041D\u0438\u0439\u0442\u043B\u044D\u043B \u043E\u0440\u0443\u0443\u043B\u0430\u0445"), /*#__PURE__*/_react.default.createElement(_xsCoreNative.ImagePlusIcon, {
      color: _xsCoreNative.Colors.primary,
      size: _xsCoreNative.IconSizes.Large
    })), flatListHeader()) : /*#__PURE__*/_react.default.createElement(_reactNative.View, null),
    style: styles.root,
    showsVerticalScrollIndicator: false,
    contentContainerStyle: styles.listContent,
    ListEmptyComponent: emptyRender(),
    data: flatData,
    windowSize: 5,
    initialNumToRender: 3,
    maxToRenderPerBatch: 3,
    contentInset: {
      top: 0,
      bottom: 20,
      left: 0,
      right: 0
    },
    contentInsetAdjustmentBehavior: "automatic",
    renderItem: renderItem,
    onEndReached: () => {
      if (blockEndReached) {
        return;
      }
      setSize(size + 1);
    },
    onViewableItemsChanged: _onViewableItemsChanged.current,
    viewabilityConfig: {
      itemVisiblePercentThreshold: 110
    },
    removeClippedSubviews: true,
    keyExtractor: item => item?._id,
    onEndReachedThreshold: 0.7
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.root
  }));
});
const styles = _reactNative.StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: _xsCoreNative.Colors.gray101
  },
  header: {
    zIndex: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
    borderBottomRightRadius: 10
  },
  h60: {
    height: 60
  },
  h15: {
    height: 15
  },
  loaderContainer: {
    marginTop: 8
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
  createText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Inter",
    color: _xsCoreNative.Colors.primary
  },
  headerCard: {
    marginTop: 10,
    padding: 18,
    backgroundColor: _xsCoreNative.Colors.white,
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  listContent: {
    backgroundColor: _xsCoreNative.Colors.gray101
  },
  card: {
    marginTop: 8
  },
  flex: {
    flex: 1
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 22,
    color: _xsCoreNative.Colors.primary
  },
  cover: {
    height: 150,
    width: "100%"
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
  },
  empty: {
    marginTop: 8,
    borderWidth: 0,
    backgroundColor: _xsCoreNative.Colors.white,
    borderRadius: 10,
    height: 180,
    justifyContent: "center",
    alignItems: "center"
  }
});
PostTabScreen.displayName = "PostTabScreen";
//# sourceMappingURL=post.js.map