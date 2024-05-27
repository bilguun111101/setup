"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CoverImage = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _groupVector = require("../../assets/image/group-vector");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const CoverImage = exports.CoverImage = /*#__PURE__*/(0, _react.memo)(({
  image,
  style,
  width = 153,
  height = 135
}) => {
  const renderCover = (0, _react.useCallback)(() => {
    if (!image) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.root, style]
      }, /*#__PURE__*/_react.default.createElement(_groupVector.GroupVector, {
        width: width,
        height: height
      }));
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.root, style]
    }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Image, {
      source: image,
      size: _xsCoreNative.ImageSizes.ExtraLarge,
      style: styles.image
    }));
  }, [style, image]);
  return renderCover();
});
CoverImage.displayName = "CoverImage";
const styles = _reactNative.StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: _xsCoreNative.Colors.gray102,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  image: {
    width: "100%",
    height: "100%"
  }
});
//# sourceMappingURL=cover.js.map