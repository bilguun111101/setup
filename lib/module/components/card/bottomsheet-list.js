import { Pressable, StyleSheet, Text } from "react-native";
import React, { memo } from "react";
import { Colors } from "@goodtechsoft/xs-core-native";
const BottomsheetListCard = /*#__PURE__*/memo(props => {
  const {
    title,
    icon,
    onPress
  } = props;
  return /*#__PURE__*/React.createElement(Pressable, {
    onPress: onPress,
    style: styles.card
  }, icon, /*#__PURE__*/React.createElement(Text, {
    style: styles.text
  }, title));
});
BottomsheetListCard.displayName = "BottomsheetListCard";
export { BottomsheetListCard };
const styles = StyleSheet.create({
  card: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderColor: Colors.gray101,
    borderWidth: 1,
    padding: 10
  },
  text: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "400",
    color: Colors.primary
  }
});
//# sourceMappingURL=bottomsheet-list.js.map