import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { HttpRequest as BaseHttpRequest, connectStore } from "@goodtechsoft/xs-core-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { XsNavigationContainer } from "./navigation/navigation-container";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
export class HttpRequest extends BaseHttpRequest {
  uri = "http://localhost:3000/api";
}
connectStore(store);
const App = () => {
  return /*#__PURE__*/React.createElement(Provider, {
    store: store
  }, /*#__PURE__*/React.createElement(PersistGate, {
    persistor: persistor
  }, /*#__PURE__*/React.createElement(SafeAreaProvider, null, /*#__PURE__*/React.createElement(GestureHandlerRootView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(BottomSheetModalProvider, null, /*#__PURE__*/React.createElement(XsNavigationContainer, null))))));
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default App;
//# sourceMappingURL=App.js.map