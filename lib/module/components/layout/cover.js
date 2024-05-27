import { StyleSheet, View } from "react-native";
import React, { memo, useCallback } from "react";
import { Colors, ImageSizes, Image } from "@goodtechsoft/xs-core-native";
import { GroupVector } from "../../assets/image/group-vector";
const CoverImage = /*#__PURE__*/memo(({
  image,
  style,
  width = 153,
  height = 135
}) => {
  const renderCover = useCallback(() => {
    if (!image) {
      return /*#__PURE__*/React.createElement(View, {
        style: [styles.root, style]
      }, /*#__PURE__*/React.createElement(GroupVector, {
        width: width,
        height: height
      }));
    }
    return /*#__PURE__*/React.createElement(View, {
      style: [styles.root, style]
    }, /*#__PURE__*/React.createElement(Image, {
      source: image,
      size: ImageSizes.ExtraLarge,
      style: styles.image
    }));
  }, [style, image]);
  return renderCover();
});
CoverImage.displayName = "CoverImage";
export { CoverImage };
const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.gray102,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  image: {
    width: "100%",
    height: "100%"
  }
});
//# sourceMappingURL=cover.js.map