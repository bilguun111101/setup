import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";

if (global._reanimatedWorkletInit === undefined) {
  global._reanimatedWorkletInit = function (worklet) {
    worklet.__worklet = true;
  };
}

AppRegistry.registerComponent(appName, () => App);
