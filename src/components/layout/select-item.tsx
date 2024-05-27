import { Pressable, StyleSheet, Text } from "react-native";
import React, { memo } from "react";
import { Colors } from "@goodtechsoft/xs-core-native";

const SelectItem = memo(
  ({ item, onSelect }: { item: any; onSelect: () => void }) => {
    return (
      <Pressable style={styles.container} onPress={onSelect}>
        <Text style={styles.title}>{item?.name}</Text>
      </Pressable>
    );
  },
);

SelectItem.displayName = "SelectItem";

export { SelectItem };

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 10,
    borderRadius: 8,
  },
  title: {
    fontWeight: "400",
    fontFamily: "Inter",
    fontSize: 12,
    lineHeight: 15,
    color: Colors.primary,
  },
});
