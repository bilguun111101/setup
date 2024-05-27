import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { Colors, IconSizes, PlusIcon } from "@goodtechsoft/xs-core-native";

type Props = {
  onPress: () => void;
  title: string;
};

const AddItem = memo(({ title, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <PlusIcon size={IconSizes.Medium} color={Colors.base700} />
      <View style={styles.w10} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
});

AddItem.displayName = "AddItem";

export { AddItem };

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 18,
  },
  title: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Inter",
    lineHeight: 17,
    color: Colors.base700,
  },
  w10: {
    width: 10,
  },
});
