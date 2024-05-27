"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequestListCard = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _native = require("@react-navigation/native");
var _navigation = require("../../navigation");
var _username = require("../../utils/username");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const RequestListCard = exports.RequestListCard = /*#__PURE__*/(0, _react.memo)(props => {
  const navigation = (0, _native.useNavigation)();
  const {
    data,
    payload
  } = props;
  const renderUserImage = (0, _react.useMemo)(() => {
    if (data.length > 1) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.avatarImages
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.image1
      }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Avatar, {
        source: data[0] && data[0]?.avatar?.large || "",
        size: _xsCoreNative.AvatarSizes.Medium
      })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.image2
      }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Avatar, {
        source: data[1] && data[1]?.avatar?.large || "",
        size: _xsCoreNative.AvatarSizes.Medium
      })));
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.image
    }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Avatar, {
      source: data[0] && data[0].avatar?.large || "",
      size: _xsCoreNative.AvatarSizes.Large
    }));
  }, [data]);
  if (!data?.length) {
    return null;
  }
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: () => navigation.navigate(_navigation.NavigationRoutes.Group_RequestedUsersScreen, {
      payload: payload
    }),
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.contentContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.avatarImages
  }, renderUserImage), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.textContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.title
  }, "\u041D\u044D\u0433\u0434\u044D\u0445 \u0445\u04AF\u0441\u044D\u043B\u0442"), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    numberOfLines: 1,
    style: styles.descriptionContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.boldDescription,
    numberOfLines: 1
  }, (0, _username.username)(data[0])), data.length > 1 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.description
  }, " \u0431\u043E\u043B\u043E\u043D "), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.boldDescription
  }, data.length - 1), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.description
  }, " \u0445\u04AF\u043D \u0431\u0430\u0439\u043D\u0430"))))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.rightIcon
  }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.ArrowRightIcon, {
    color: _xsCoreNative.Colors.gray103,
    size: 30
  })));
});
RequestListCard.displayName = "RequestListCard";
const styles = _reactNative.StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: _xsCoreNative.Colors.gray101,
    backgroundColor: _xsCoreNative.Colors.white,
    borderRadius: 10,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  w4: {
    width: 4
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  textContainer: {
    marginLeft: 12,
    flex: 1
  },
  avatarImages: {
    position: "relative",
    height: 62,
    width: 62
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  image1: {},
  image2: {
    position: "absolute",
    left: 15,
    top: 15,
    borderWidth: 1.5,
    borderColor: _xsCoreNative.Colors.white,
    borderRadius: _xsCoreNative.AvatarSizes.Medium / 2.5
  },
  title: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    lineHeight: 18,
    color: _xsCoreNative.Colors.primary
  },
  descriptionContainer: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center"
  },
  boldDescription: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: _xsCoreNative.Colors.gray103,
    lineHeight: 17
  },
  description: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: _xsCoreNative.Colors.gray103,
    lineHeight: 17
  },
  rightIcon: {}
});
//# sourceMappingURL=request-list.js.map