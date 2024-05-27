"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveSheet = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _native = require("@react-navigation/native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _apis = require("../apis");
var _username = require("../utils/username");
var _swr = _interopRequireWildcard(require("swr"));
var _infinite = _interopRequireDefault(require("swr/infinite"));
var _reactNativeToastNotifications = require("react-native-toast-notifications");
var _groupVector = require("../assets/image/group-vector");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const RemoveSheet = exports.RemoveSheet = /*#__PURE__*/(0, _react.memo)(({
  route
}) => {
  const {
    user,
    payload
  } = route.params;
  const sfArea = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const toast = (0, _reactNativeToastNotifications.useToast)();
  const {
    mutate
  } = (0, _swr.useSWRConfig)();
  const {
    data: userMe
  } = (0, _swr.default)("swr.user.me");
  const {
    mutate: suggestMutate
  } = (0, _infinite.default)(index => `swr.group.suggest.${index}`);
  const {
    mutate: myMutate
  } = (0, _infinite.default)(index => `swr.group.my.query=.${index}`);
  const {
    data
  } = (0, _swr.default)(`swr.group.${payload._id}`);
  const {
    mutate: userListMutate
  } = (0, _infinite.default)(index => `${payload._id}swr.group.members.${index}`);
  const {
    mutate: adminGroupMutate
  } = (0, _infinite.default)(index => `swr.group.admin.${index}`);
  const navigation = (0, _native.useNavigation)();
  const removeGroupUser = (0, _react.useCallback)(async () => {
    await _apis.GroupApi.removeUser(payload._id, user._id);
    toast.show("Бүлгээс хаслаа", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in"
    });
    data?.setMinusCount(mutate);
    setTimeout(() => {
      userListMutate();
    }, 300);
  }, [userListMutate]);
  const onPress = (0, _react.useCallback)(async () => {
    data?.setJoin(mutate, false);
    await _apis.GroupApi.leaveGroup(payload._id);
    setTimeout(() => {
      suggestMutate();
      adminGroupMutate();
      myMutate();
    }, 300);
    data?.setMinusCount(mutate);
    toast.show("Бүлгээс гарлаа", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in"
    });
    navigation.dispatch(_native.StackActions.pop(2));
    navigation.goBack();
  }, [data, payload, suggestMutate, myMutate, navigation]);
  const renderText = (0, _react.useCallback)(() => {
    if (user._id === userMe?._id) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: styles.title
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: styles.username
      }, data?.name), " \u0431\u04AF\u043B\u0433\u044D\u044D\u0441 \u0433\u0430\u0440\u0430\u0445 \u0438\u0442\u0433\u044D\u043B\u0442\u044D\u0439 \u0431\u0430\u0439\u043D\u0430 \u0443\u0443?");
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.title
    }, "\u0422\u0430 ", /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.username
    }, (0, _username.username)(user)), "-\u0438\u0439\u0433 \u0431\u04AF\u043B\u0433\u044D\u044D\u0441 \u0445\u0430\u0441\u0430\u0445\u0434\u0430\u0430 \u0438\u0442\u0433\u044D\u043B\u0442\u044D\u0439 \u0431\u0430\u0439\u043D\u0430 \u0443\u0443?");
  }, []);
  const renderButton = (0, _react.useCallback)(() => {
    if (user._id === userMe?._id) {
      return /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
        type: "primary",
        title: "Зөвшөөрөх",
        style: styles.button,
        onPress: onPress
      });
    }
    return /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
      type: "primary",
      title: "Зөвшөөрөх",
      style: styles.button,
      onPress: removeGroupUser
    });
  }, []);
  const renderTitle = (0, _react.useCallback)(() => {
    if (userMe?._id === user._id) {
      return "Бүлгээс гарах";
    }
    return "Бүлгээс хасах";
  }, []);
  const renderAvatar = (0, _react.useCallback)(() => {
    if (!data?.coverImage) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.cover
      }, /*#__PURE__*/_react.default.createElement(_groupVector.GroupVector, {
        width: 45,
        height: 60
      }));
    }
    if (user._id === userMe?._id) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.cover
      }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Image, {
        style: styles.cover,
        source: data?.coverImage,
        size: _xsCoreNative.ImageSizes.Large
      }));
    }
    return /*#__PURE__*/_react.default.createElement(_xsCoreNative.Avatar, {
      source: user.avatar?.large,
      size: _xsCoreNative.AvatarSizes.Large
    });
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.root
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.headerTitle
  }, renderTitle()), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.contentContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.iconContainer
  }, renderAvatar()), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h10
  }), renderText(), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h15
  }), renderButton()), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      height: sfArea.bottom
    }
  }));
});
RemoveSheet.displayName = "RemoveSheet";
const styles = _reactNative.StyleSheet.create({
  root: {
    flexGrow: 1,
    paddingHorizontal: 18
  },
  h10: {
    height: 10
  },
  h15: {
    height: 15
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    lineHeight: 20,
    textAlign: "center",
    color: _xsCoreNative.Colors.primary,
    marginVertical: 12
  },
  contentContainer: {
    backgroundColor: _xsCoreNative.Colors.gray101,
    borderRadius: 12,
    flex: 1
  },
  iconContainer: {
    alignSelf: "center",
    marginTop: 32
  },
  username: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    lineHeight: 18,
    textAlign: "center",
    color: _xsCoreNative.Colors.primary,
    marginHorizontal: 24
  },
  title: {
    fontSize: 14,
    fontFamily: "Inter",
    lineHeight: 18,
    textAlign: "center",
    color: _xsCoreNative.Colors.primary,
    marginHorizontal: 24
  },
  description: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    lineHeight: 15,
    color: _xsCoreNative.Colors.gray103,
    textAlign: "center",
    marginTop: 12,
    marginHorizontal: 24
  },
  button: {
    marginHorizontal: 24
  },
  cover: {
    width: 58,
    height: 58,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: _xsCoreNative.Colors.gray102,
    alignItems: "center",
    justifyContent: "center"
  }
});
//# sourceMappingURL=remove.js.map