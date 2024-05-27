import { StyleSheet, View } from "react-native";
import React, { memo } from "react";
import { Button } from "@goodtechsoft/xs-core-native";

type Props = {
  onCancel: () => void;
  onPress: () => void;
};

const RowButton = memo(({ onCancel, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <Button title={"Болих"} onPress={onCancel} />
      <View style={styles.w10} />
      <Button title={"Хадгалах"} onPress={onPress} type={"primary"} />
    </View>
  );
});

RowButton.displayName = "RowButton";

export { RowButton };

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  w10: {
    width: 10,
  },
});
