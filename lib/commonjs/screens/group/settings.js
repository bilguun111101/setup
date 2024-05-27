"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsScreen = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _native = require("@react-navigation/native");
var _apis = require("../../apis");
var _actionItem = require("../../components/layout/action-item");
var _navigation = require("../../navigation");
var _reactNativeToastNotifications = require("react-native-toast-notifications");
var _infinite = _interopRequireDefault(require("swr/infinite"));
var _xsPostNative = require("@goodtechsoft/xs-post-native");
var _swr = _interopRequireDefault(require("swr"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const SettingsScreen = exports.SettingsScreen = /*#__PURE__*/(0, _react.memo)(({
  route
}) => {
  const {
    payload
  } = route.params;
  const navigation = (0, _native.useNavigation)();
  const toast = (0, _reactNativeToastNotifications.useToast)();
  const {
    mutate: myGroupMutate
  } = (0, _infinite.default)(index => `swr.group.my.${index}`);
  const {
    mutate: groupAdminMutate
  } = (0, _infinite.default)(index => `swr.group.admin.${index}`);
  const {
    mutate: postListMutate
  } = (0, _infinite.default)((_, _prev) => {
    return `${payload._id}.swr.group|${_prev?.nextPage || ""}`;
  });
  const {
    data: groupData
  } = (0, _swr.default)(`swr.group.${payload._id}`, {
    fallbackData: payload
  });
  if (!groupData) {
    return null;
  }
  const {
    data,
    isLoading,
    mutate
  } = (0, _swr.default)(`swr.requested.post.${groupData._id}`, async _ => {
    const res = await _apis.PostApi.postRequestList({
      id: groupData._id,
      page: 1,
      limit: 3
    });
    return res;
  });
  const goInfo = (0, _react.useCallback)(() => {
    return navigation.navigate(_navigation.NavigationRoutes.Group_InfoScreen, {
      payload: groupData
    });
  }, [navigation]);
  const goUsersList = (0, _react.useCallback)(() => {
    return navigation.navigate(_navigation.NavigationRoutes.Group_AllUsersScreen, {
      payload: groupData
    });
  }, [navigation]);
  const deleteGroup = (0, _react.useCallback)(async () => {
    navigation.navigate(_navigation.NavigationRoutes.Group_DeleteConfirmSheet, {
      onChange: async () => {
        await _apis.GroupApi.deleteGroup(groupData._id);
        navigation.dispatch(_native.StackActions.pop(2));
        setTimeout(() => {
          myGroupMutate();
          groupAdminMutate();
        }, 300);
      }
    });
  }, [navigation]);
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
    await _apis.PostApi.approvePost(groupData._id, item._id);
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
  const renderEmpty = (0, _react.useCallback)(() => {
    if (isLoading) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.empty
      }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Loader, null));
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.empty
    }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Empty, {
      title: "Хоосон байна",
      description: "\u0425\u04AF\u043B\u044D\u044D\u0433\u0434\u044D\u0436 \u0431\u0443\u0439 \u043F\u043E\u0441\u0442 \u0431\u0430\u0439\u0445\u0433\u04AF\u0439 \u0431\u0430\u0439\u043D\u0430",
      icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.PostIcon, {
        size: _xsCoreNative.IconSizes.Medium,
        color: _xsCoreNative.Colors.white
      })
    }));
  }, [isLoading]);
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
  const goPendingPost = (0, _react.useCallback)(() => {
    navigation.navigate(_navigation.NavigationRoutes.Group_AllPendingPostScreen, {
      payload: groupData
    });
  }, [navigation]);
  const renderFooter = (0, _react.useCallback)(() => {
    if (data?.rows.length > 3) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.footer
      }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
        onPress: goPendingPost,
        title: "Бусад постыг харах",
        type: "primary"
      }));
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null);
  }, []);
  if (!data) {
    return null;
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
    }, "\u0422\u043E\u0445\u0438\u0440\u0433\u043E\u043E")
  })), /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    ListHeaderComponent: /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.ph18
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.h15
    }), /*#__PURE__*/_react.default.createElement(_actionItem.ActionItem, {
      onPress: goInfo,
      title: "Бүлгийн мэдээлэл",
      suffixIcon: true
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.h10
    }), /*#__PURE__*/_react.default.createElement(_actionItem.ActionItem, {
      onPress: goUsersList,
      title: "Нийт гишүүд болон админ",
      badgeNumber: groupData.pendingMembersCount,
      suffixIcon: true
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.h10
    }), /*#__PURE__*/_react.default.createElement(_actionItem.ActionItem, {
      onPress: deleteGroup,
      title: "Бүлэг устгах",
      suffixIcon: true
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.h15
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.title
    }, `Нийтлэх хүсэлт (${data.count})`)),
    data: data ? data.rows.flat() : [],
    renderItem: renderItem,
    ListEmptyComponent: renderEmpty,
    ListFooterComponent: renderFooter,
    contentInset: {
      top: 0,
      bottom: 20,
      left: 0,
      right: 0
    },
    contentInsetAdjustmentBehavior: "automatic",
    initialNumToRender: 3
  }));
});
const styles = _reactNative.StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: _xsCoreNative.Colors.gray101
  },
  row: {
    gap: 10,
    paddingHorizontal: 18,
    flexDirection: "row"
  },
  ph18: {
    paddingHorizontal: 18
  },
  header: {
    zIndex: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
    borderBottomRightRadius: 10
  },
  h15: {
    height: 15
  },
  h10: {
    height: 10
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    color: _xsCoreNative.Colors.primary
  },
  postCard: {
    marginTop: 10,
    backgroundColor: _xsCoreNative.Colors.white,
    borderRadius: 10,
    paddingBottom: 15,
    borderWidth: 1,
    borderColor: _xsCoreNative.Colors.gray102
  },
  button: {
    flex: 1
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
  footer: {
    marginTop: 10,
    marginHorizontal: 18
  }
});
SettingsScreen.displayName = "SettingsScreen";
//# sourceMappingURL=settings.js.map