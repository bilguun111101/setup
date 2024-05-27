import { type StyleProp, type ViewStyle } from "react-native";
import React from "react";
import { type IImage } from "@goodtechsoft/xs-core-native";
type Props = {
    image: IImage;
    style?: StyleProp<ViewStyle>;
    width?: number;
    height?: number;
};
declare const CoverImage: React.MemoExoticComponent<({ image, style, width, height }: Props) => React.JSX.Element>;
export { CoverImage };
//# sourceMappingURL=cover.d.ts.map