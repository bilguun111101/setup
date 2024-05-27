import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";
import React, { memo, useCallback } from "react";
import {
  Colors,
  type IImage,
  ImageSizes,
  Image,
} from "@goodtechsoft/xs-core-native";
import { GroupVector } from "../../assets/image/group-vector";

type Props = {
  image: IImage;
  style?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
};

const CoverImage = memo(
  ({ image, style, width = 153, height = 135 }: Props) => {
    const renderCover = useCallback(() => {
      if (!image) {
        return (
          <View style={[styles.root, style]}>
            <GroupVector width={width} height={height} />
          </View>
        );
      }
      return (
        <View style={[styles.root, style]}>
          <Image
            source={image}
            size={ImageSizes.ExtraLarge}
            style={styles.image}
          />
        </View>
      );
    }, [style, image]);

    return renderCover();
  },
);

CoverImage.displayName = "CoverImage";

export { CoverImage };

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.gray102,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
