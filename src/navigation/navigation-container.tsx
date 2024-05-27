import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { XsProvider } from "@goodtechsoft/xs-core-native";
import { BottomSheetNavigator } from "./bottom-sheet-navigator";

const XsNavigationContainer = () => {
  return (
    <NavigationContainer>
      <XsProvider>
        <BottomSheetNavigator />
      </XsProvider>
    </NavigationContainer>
  );
};

export { XsNavigationContainer };
