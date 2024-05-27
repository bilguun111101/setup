import { _Image } from "@goodtechsoft/xs-core-native";
export class Image extends _Image {
  constructor(props) {
    super(props);
  }
  static fromJson(json) {
    return new Image({
      ...json
    });
  }
}
//# sourceMappingURL=image.js.map