import { HttpRequest as BaseHttpRequest } from "@goodtechsoft/xs-core-native";
import { DeviceEventEmitter } from "react-native";
export class HttpRequest extends BaseHttpRequest {
  uri = "https://app.xotsocial.mn/app";
  errorHandler = (statusCode, error) => {
    DeviceEventEmitter.emit("http.handler.error", {
      error: error,
      statusCode: statusCode
    });
  };
}
//# sourceMappingURL=index.js.map