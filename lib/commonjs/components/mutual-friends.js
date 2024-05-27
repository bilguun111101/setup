"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MutualFriendsItem = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _username = require("../utils/username");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const MutualFriendsItem = exports.MutualFriendsItem = /*#__PURE__*/(0, _react.memo)(props => {
  const {
    data: followers
  } = props;
  if (!followers.length) {
    return null;
  }
  const renderAvatar = (0, _react.useCallback)(() => {
    if (followers.length > 2) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.avatars
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.firstAvatar
      }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Avatar, {
        source: followers[0]?.avatar?.large,
        size: _xsCoreNative.AvatarSizes.ExtraSmall
      })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.secondAvatar
      }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Avatar, {
        source: followers[1]?.avatar?.large,
        size: _xsCoreNative.AvatarSizes.ExtraSmall
      })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.secondAvatar
      }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Avatar, {
        source: followers[2]?.avatar?.large,
        size: _xsCoreNative.AvatarSizes.ExtraSmall
      }))));
    }
    if (followers.length === 2) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.avatars
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.firstAvatar
      }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Avatar, {
        source: followers[0]?.avatar?.large,
        size: _xsCoreNative.AvatarSizes.ExtraSmall
      })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.secondAvatar
      }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Avatar, {
        source: followers[1]?.avatar?.large,
        size: _xsCoreNative.AvatarSizes.ExtraSmall
      }))));
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.firstAvatar
    }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Avatar, {
      source: followers[0]?.avatar?.large,
      size: _xsCoreNative.AvatarSizes.ExtraSmall
    }));
  }, []);
  const renderText = (0, _react.useCallback)(() => {
    if (followers.length > 2) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: styles.mutualText
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: styles.nameText
      }, (0, _username.username)(followers[0])), ` болон таний ${followers.length - 1} дагасан хүн нэгдсэн байна`);
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.mutualText
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.nameText
    }, (0, _username.username)(followers[0])), ` нэгдсэн байна`);
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.root
  }, renderAvatar(), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.w4
  }), renderText());
});
MutualFriendsItem.displayName = "MutualFriendsItem";
const styles = _reactNative.StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center"
  },
  w4: {
    width: 4
  },
  firstAvatar: {
    borderWidth: 2,
    borderColor: _xsCoreNative.Colors.white,
    borderRadius: 13
  },
  secondAvatar: {
    marginLeft: -8,
    borderWidth: 2,
    borderColor: _xsCoreNative.Colors.white,
    borderRadius: 13
  },
  avatars: {
    flexDirection: "row"
  },
  nameText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "600",
    color: _xsCoreNative.Colors.primary
  },
  mutualText: {
    flex: 1,
    fontFamily: "Inter",
    fontSize: 12,
    color: _xsCoreNative.Colors.gray104
  }
});
//# sourceMappingURL=mutual-friends.js.map