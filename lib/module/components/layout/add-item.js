import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { Colors, IconSizes, PlusIcon } from "@goodtechsoft/xs-core-native";
const AddItem = /*#__PURE__*/memo(({
  title,
  onPress
}) => {
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onPress,
    style: styles.container
  }, /*#__PURE__*/React.createElement(PlusIcon, {
    size: IconSizes.Medium,
    color: Colors.base700
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.w10
  }), /*#__PURE__*/React.createElement(Text, {
    style: styles.title
  }, title));
});
AddItem.displayName = "AddItem";
export { AddItem };
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 18
  },
  title: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Inter",
    lineHeight: 17,
    color: Colors.base700
  },
  w10: {
    width: 10
  }
});
//# sourceMappingURL=add-item.js.map