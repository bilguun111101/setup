import {
  HttpRequest as BaseHttpRequest,
  HttpHandler,
} from "@goodtechsoft/xs-core-native";
import { DeviceEventEmitter } from "react-native";

export class HttpRequest extends BaseHttpRequest {
  uri = "https://app.xotsocial.mn/app";
  errorHandler = (statusCode: number, error: HttpHandler) => {
    DeviceEventEmitter.emit("http.handler.error", {
      error: error,
      statusCode: statusCode,
    });
  };
}
