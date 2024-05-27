"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JoinSheet = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _types = require("../navigation/types");
var _native = require("@react-navigation/native");
var _groupHeader = require("../components/layout/group-header");
var _apis = require("../apis");
var _swr = _interopRequireWildcard(require("swr"));
var _infinite = _interopRequireDefault(require("swr/infinite"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const JoinSheet = exports.JoinSheet = /*#__PURE__*/(0, _react.memo)(({
  route
}) => {
  const {
    payload
  } = route.params;
  const navigation = (0, _native.useNavigation)();
  const {
    mutate
  } = (0, _swr.useSWRConfig)();
  const {
    data,
    mutate: adMutate
  } = (0, _swr.default)(`swr.group.${payload._id}`, {
    fallbackData: payload
  });
  const {
    mutate: listMutate
  } = (0, _infinite.default)(index => `swr.group.my.${index}`);
  const cancel = (0, _react.useCallback)(async () => {
    await _apis.GroupApi.cancelRequest(data?._id);
    data?.setPending(mutate, false);
  }, []);
  const join = (0, _react.useCallback)(async () => {
    await _apis.GroupApi.join(data?._id);
    if (data?.privacy === "PUBLIC" || data?.isInvited) {
      data?.setJoin(mutate, true);
      navigation.goBack();
      setTimeout(() => {
        listMutate();
        adMutate();
        navigation.navigate(_types.NavigationRoutes.Group_GroupDetailScreen, {
          payload: data
        });
      }, 200);
    } else {
      data?.setPending(mutate, true);
      navigation.goBack();
    }
  }, []);
  const declineInvite = (0, _react.useCallback)(async () => {
    await _apis.GroupApi.inviteDecline(payload._id);
    data?.setInvited(mutate, false);
    navigation.goBack();
  }, []);
  const renderButton = (0, _react.useCallback)(() => {
    if (data?.isInvited) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.row
      }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
        style: styles.button,
        title: "Зөвшөөрөх",
        type: "primary",
        onPress: join
      }), /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
        style: styles.button,
        title: "Хүсэлт цуцлах",
        type: "default",
        onPress: declineInvite
      }));
    }
    if (data?.isPending) {
      return /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
        title: "Хүсэлт цуцлах",
        type: "default",
        onPress: cancel
      });
    }
    return /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
      title: "Нэгдэх",
      type: "primary",
      onPress: join
    });
  }, [data]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.root
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.header
  }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.AppBar, {
    useSafeArea: false,
    left: /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
      type: "text",
      icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.ArrowLeftIcon, {
        size: _xsCoreNative.IconSizes.ExtraLarge
      }),
      onPress: () => navigation.goBack()
    })
  })), /*#__PURE__*/_react.default.createElement(_groupHeader.GroupHeaderItem, {
    joinButton: false,
    data: data
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.absoluteBottom
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.ph18
  }, renderButton()), /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, null)));
});
const styles = _reactNative.StyleSheet.create({
  root: {
    flexGrow: 1,
    backgroundColor: _xsCoreNative.Colors.white
  },
  row: {
    flexDirection: "row",
    gap: 10
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
  h4: {
    height: 4
  },
  w4: {
    width: 4
  },
  ph18: {
    paddingHorizontal: 18
  },
  headerCard: {
    paddingHorizontal: 18,
    backgroundColor: _xsCoreNative.Colors.white,
    paddingBottom: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  listContent: {
    flexGrow: 1,
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
  absoluteBottom: {
    backgroundColor: _xsCoreNative.Colors.white,
    paddingBottom: 25,
    paddingTop: 10,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    flex: 1
  }
});
JoinSheet.displayName = "JoinSheet";
//# sourceMappingURL=join.js.map