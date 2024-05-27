"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XsNavigationContainer = void 0;
var _react = _interopRequireDefault(require("react"));
var _native = require("@react-navigation/native");
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _bottomSheetNavigator = require("./bottom-sheet-navigator");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const XsNavigationContainer = () => {
  return /*#__PURE__*/_react.default.createElement(_native.NavigationContainer, null, /*#__PURE__*/_react.default.createElement(_xsCoreNative.XsProvider, null, /*#__PURE__*/_react.default.createElement(_bottomSheetNavigator.BottomSheetNavigator, null)));
};
exports.XsNavigationContainer = XsNavigationContainer;
//# sourceMappingURL=navigation-container.js.map