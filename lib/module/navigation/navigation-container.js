import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { XsProvider } from "@goodtechsoft/xs-core-native";
import { BottomSheetNavigator } from "./bottom-sheet-navigator";
const XsNavigationContainer = () => {
  return /*#__PURE__*/React.createElement(NavigationContainer, null, /*#__PURE__*/React.createElement(XsProvider, null, /*#__PURE__*/React.createElement(BottomSheetNavigator, null)));
};
export { XsNavigationContainer };
//# sourceMappingURL=navigation-container.js.map