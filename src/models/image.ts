import { _Image } from "@goodtechsoft/xs-core-native";
import { type IImage } from "../interfaces/image";

export class Image extends _Image implements IImage {
  constructor(props: IImage) {
    super(props);
  }

  static fromJson(json: any) {
    return new Image({
      ...json,
    });
  }
}
