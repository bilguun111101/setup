"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AvatarIcon = void 0;
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _react = _interopRequireDefault(require("react"));
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const AvatarIcon = ({
  color = _xsCoreNative.Colors.white,
  size = _xsCoreNative.IconSizes.Medium
}) => {
  return /*#__PURE__*/_react.default.createElement(_reactNativeSvg.default, {
    width: size,
    height: size,
    viewBox: "0 0 128 128",
    fill: "none"
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Circle, {
    cx: "64",
    cy: "64",
    r: "64",
    fill: _xsCoreNative.Colors.gray102
  }), /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Path, {
    fill: color,
    d: "M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"
  }), /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Path, {
    fill: color,
    d: "M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"
  }));
};
exports.AvatarIcon = AvatarIcon;
//# sourceMappingURL=avatar.js.map