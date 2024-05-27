"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListGroupCard = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _native = require("@react-navigation/native");
var _navigation = require("../../navigation");
var _swr = _interopRequireDefault(require("swr"));
var _groupVector = require("../../assets/image/group-vector");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ListGroupCard = exports.ListGroupCard = /*#__PURE__*/(0, _react.memo)(props => {
  const {
    payload
  } = props;
  const navigation = (0, _native.useNavigation)();
  const {
    data
  } = (0, _swr.default)(`swr.group.${payload._id}`, {
    fallbackData: payload
  });
  if (!data) {
    return null;
  }
  const imageRender = (0, _react.useCallback)(() => {
    if (!data.coverImage) {
      return /*#__PURE__*/_react.default.createElement(_groupVector.GroupVector, {
        width: 45,
        height: 60
      });
    }
    return /*#__PURE__*/_react.default.createElement(_xsCoreNative.Image, {
      size: _xsCoreNative.ImageSizes.Large,
      source: data.coverImage
    });
  }, [data]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    onPress: () => navigation.navigate(_navigation.NavigationRoutes.Group_GroupDetailScreen, {
      payload: data
    }),
    style: styles.root
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.cover
  }, imageRender()), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.w10
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.secondCol
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    numberOfLines: 2,
    style: styles.name
  }, data.name), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h4
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.memberCount
  }, data.membersCount, " \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447")));
});
ListGroupCard.displayName = "ListGroupCard";
const styles = _reactNative.StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center"
  },
  w10: {
    width: 10
  },
  h4: {
    height: 4
  },
  secondCol: {
    flex: 1
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
  cover: {
    width: 50,
    height: 50,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: _xsCoreNative.Colors.gray102
  }
});
//# sourceMappingURL=list-group.js.map