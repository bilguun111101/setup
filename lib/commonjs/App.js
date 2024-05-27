"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.HttpRequest = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _store = require("./store");
var _react2 = require("redux-persist/integration/react");
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNative = require("react-native");
var _navigationContainer = require("./navigation/navigation-container");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _bottomSheet = require("@gorhom/bottom-sheet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class HttpRequest extends _xsCoreNative.HttpRequest {
  uri = "http://localhost:3000/api";
}
exports.HttpRequest = HttpRequest;
(0, _xsCoreNative.connectStore)(_store.store);
const App = () => {
  return /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    store: _store.store
  }, /*#__PURE__*/_react.default.createElement(_react2.PersistGate, {
    persistor: _store.persistor
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaProvider, null, /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureHandlerRootView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_bottomSheet.BottomSheetModalProvider, null, /*#__PURE__*/_react.default.createElement(_navigationContainer.XsNavigationContainer, null))))));
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  }
});
var _default = exports.default = App;
//# sourceMappingURL=App.js.map