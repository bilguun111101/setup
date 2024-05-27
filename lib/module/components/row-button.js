import { StyleSheet, View } from "react-native";
import React, { memo } from "react";
import { Button } from "@goodtechsoft/xs-core-native";
const RowButton = /*#__PURE__*/memo(({
  onCancel,
  onPress
}) => {
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(Button, {
    title: "Болих",
    onPress: onCancel
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.w10
  }), /*#__PURE__*/React.createElement(Button, {
    title: "Хадгалах",
    onPress: onPress,
    type: "primary"
  }));
});
RowButton.displayName = "RowButton";
export { RowButton };
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end"
  },
  w10: {
    width: 10
  }
});
//# sourceMappingURL=row-button.js.map