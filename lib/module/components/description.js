import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { Colors } from "@goodtechsoft/xs-core-native";
const DescriptionItem = /*#__PURE__*/memo(props => {
  const {
    title,
    description,
    onPress
  } = props;
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    activeOpacity: 0.9,
    onPress: () => onPress()
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.title
  }, title), /*#__PURE__*/React.createElement(View, {
    style: styles.h4
  }), /*#__PURE__*/React.createElement(Text, {
    numberOfLines: 2,
    style: styles.description
  }, description));
});
DescriptionItem.displayName = "DescriptionItem";
export { DescriptionItem };
const styles = StyleSheet.create({
  h4: {
    height: 4
  },
  title: {
    fontFamily: "Inter",
    fontWeight: "600",
    color: Colors.primary,
    fontSize: 14
  },
  description: {
    fontFamily: "Inter",
    fontWeight: "400",
    color: Colors.gray104,
    fontSize: 14
  }
});
//# sourceMappingURL=description.js.map