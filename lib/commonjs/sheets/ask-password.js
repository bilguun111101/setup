"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AskPasswordSheet = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const AskPasswordSheet = exports.AskPasswordSheet = /*#__PURE__*/(0, _react.memo)(() => {
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.root
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.input
  }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.TextInput, {
    useBottomSheet: true,
    autoFocus: true,
    style: styles.input,
    placeholder: "\u041D\u0443\u0443\u0446 \u04AF\u0433\u044D\u044D \u043E\u0440\u0443\u0443\u043B\u043D\u0430 \u0443\u0443",
    prefix: /*#__PURE__*/_react.default.createElement(_xsCoreNative.LockIcon, {
      color: _xsCoreNative.Colors.gray103,
      size: _xsCoreNative.IconSizes.Medium
    })
  })));
});
AskPasswordSheet.displayName = "AskPasswordSheet";
const styles = _reactNative.StyleSheet.create({
  root: {
    paddingHorizontal: 18
  },
  text: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: _xsCoreNative.Colors.primary
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: _xsCoreNative.Colors.gray101
  }
});
//# sourceMappingURL=ask-password.js.map