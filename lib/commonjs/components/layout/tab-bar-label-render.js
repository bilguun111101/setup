"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LabelRenderer = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const LabelRenderer = exports.LabelRenderer = /*#__PURE__*/_react.default.memo(props => {
  const {
    tabProps
  } = props;
  const {
    name
  } = tabProps;
  if (name === "MY") {
    return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.title
    }, "\u0422\u0430\u043D\u044B \u0431\u04AF\u043B\u044D\u0433");
  }
  if (name === "DISCOVER") {
    return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.title
    }, "\u0421\u0430\u043D\u0430\u043B \u0431\u043E\u043B\u0433\u043E\u0445");
  }
  if (name === "POST") {
    return /*#__PURE__*/_react.default.createElement(_xsCoreNative.PostIcon, {
      color: _xsCoreNative.Colors.primary,
      size: _xsCoreNative.IconSizes.Large
    });
  }
  if (name === "USERS") {
    return /*#__PURE__*/_react.default.createElement(_xsCoreNative.UsersIcon, {
      color: _xsCoreNative.Colors.primary,
      size: _xsCoreNative.IconSizes.Large
    });
  }
  if (name === "INFO") {
    return /*#__PURE__*/_react.default.createElement(_xsCoreNative.InfoCircleIcon, {
      color: _xsCoreNative.Colors.primary,
      size: _xsCoreNative.IconSizes.Large
    });
  }
  return /*#__PURE__*/_react.default.createElement(_reactNative.Text, null);
});
const styles = _reactNative.StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Inter",
    color: _xsCoreNative.Colors.primary
  }
});
LabelRenderer.displayName = "LabelRenderer";
//# sourceMappingURL=tab-bar-label-render.js.map