import { HttpRequest as BaseHttpRequest, HttpHandler } from "@goodtechsoft/xs-core-native";
export declare class HttpRequest extends BaseHttpRequest {
    uri: string;
    errorHandler: (statusCode: number, error: HttpHandler) => void;
}
//# sourceMappingURL=index.d.ts.map