"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridGroupCard = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _native = require("@react-navigation/native");
var _types = require("../../navigation/types");
var _swr = _interopRequireWildcard(require("swr"));
var _apis = require("../../apis");
var _infinite = _interopRequireDefault(require("swr/infinite"));
var _cover = require("../layout/cover");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const SCREEN_WIDTH = _reactNative.Dimensions.get("window").width;
const GridGroupCard = exports.GridGroupCard = /*#__PURE__*/(0, _react.memo)(props => {
  const {
    payload,
    isModal,
    joined,
    onAction
  } = props;
  const {
    mutate
  } = (0, _swr.useSWRConfig)();
  const {
    data
  } = (0, _swr.default)(`swr.group.${payload._id}`, {
    fallbackData: payload
  });
  if (!data) {
    return null;
  }
  const {
    mutate: listMutate
  } = (0, _infinite.default)(index => `swr.group.my.${index}`);
  const navigation = (0, _native.useNavigation)();
  const onPress = (0, _react.useCallback)(() => {
    if (isModal && !data?.isJoined) {
      return navigation.navigate(_types.NavigationRoutes.Group_JoinSheet, {
        payload: data
      });
    } else {
      return navigation.navigate(_types.NavigationRoutes.Group_GroupDetailScreen, {
        payload: payload
      });
    }
  }, [navigation, data, payload]);
  if (!data) {
    return null;
  }
  const join = (0, _react.useCallback)(async () => {
    if (data.privacy === "PUBLIC" || data.isInvited) {
      data.setSignCount(mutate);
      data.setJoin(mutate, true);
    } else {
      data.setPending(mutate, true);
    }
    await _apis.GroupApi.join(data._id);
    setTimeout(() => {
      listMutate();
    }, 200);
  }, [data, mutate, listMutate]);
  const cancel = (0, _react.useCallback)(async () => {
    try {
      data.setPending(mutate, false);
      await _apis.GroupApi.cancelRequest(data._id);
    } catch (error) {
      console.log(error);
    }
  }, [data]);
  const renderButton = (0, _react.useCallback)(() => {
    if (data.isJoined || joined) {
      return /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
        type: "default",
        title: "Үзэх",
        style: styles.button,
        onPress: () => navigation.navigate(_types.NavigationRoutes.Group_GroupDetailScreen, {
          payload: data
        })
      });
    }
    if (data.isPending) {
      return /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
        type: "default",
        title: "Хүсэлт цуцлах",
        style: styles.button,
        onPress: cancel
      });
    }
    return /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
      type: "primary",
      title: "Нэгдэх",
      style: styles.button,
      onPress: join
    });
  }, [data]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    onPress: onAction || onPress,
    style: [styles.root, {
      width: SCREEN_WIDTH / 2 - 23
    }]
  }, /*#__PURE__*/_react.default.createElement(_cover.CoverImage, {
    image: data.coverImage,
    style: styles.cover,
    width: 120,
    height: 70
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.ph10, styles.between]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h10
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    numberOfLines: 2,
    style: styles.name
  }, data.name), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h4
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.memberCount
  }, `${data.membersCount} хэрэглэгчтэй`), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h10
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, renderButton(), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h10
  }))));
});
GridGroupCard.displayName = "GridGroupCard";
const styles = _reactNative.StyleSheet.create({
  root: {
    backgroundColor: _xsCoreNative.Colors.white,
    flexDirection: "column",
    borderWidth: 1,
    borderColor: _xsCoreNative.Colors.gray101,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15
  },
  between: {
    justifyContent: "space-between",
    flex: 1
  },
  ph10: {
    paddingHorizontal: 10
  },
  h4: {
    height: 4
  },
  h10: {
    height: 10
  },
  name: {
    fontFamily: "Inter",
    fontWeight: "500",
    color: _xsCoreNative.Colors.primary,
    fontSize: 14
  },
  memberCount: {
    fontSize: 12,
    fontFamily: "Inter",
    fontWeight: "400",
    color: _xsCoreNative.Colors.gray103
  },
  button: {
    width: "100%"
  },
  cover: {
    height: 60
  }
});
//# sourceMappingURL=grid-group.js.map