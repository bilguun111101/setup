"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkeletonListUserCard = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNativeSkeletonPlaceholder = _interopRequireDefault(require("react-native-skeleton-placeholder"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const SkeletonListUserCard = exports.SkeletonListUserCard = /*#__PURE__*/(0, _react.memo)(() => {
  return /*#__PURE__*/_react.default.createElement(_reactNativeSkeletonPlaceholder.default, {
    borderRadius: 4
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSkeletonPlaceholder.default.Item, {
    flexDirection: "row",
    alignItems: "center"
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSkeletonPlaceholder.default.Item, {
    width: 58,
    height: 58,
    borderRadius: 24
  }), /*#__PURE__*/_react.default.createElement(_reactNativeSkeletonPlaceholder.default.Item, {
    marginLeft: 10
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSkeletonPlaceholder.default.Item, {
    width: 120,
    height: 15
  }))));
});
SkeletonListUserCard.displayName = "SkeletonListUserCard";
//# sourceMappingURL=skeleton-list-user.js.map