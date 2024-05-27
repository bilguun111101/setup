import { Pressable, StyleSheet, Text } from "react-native";
import React, { memo } from "react";
import { Colors } from "@goodtechsoft/xs-core-native";

type Props = {
  title: string;
  icon: React.JSX.Element;
  onPress?: () => void;
};

const BottomsheetListCard = memo((props: Props) => {
  const { title, icon, onPress } = props;

  return (
    <Pressable onPress={onPress} style={styles.card}>
      {icon}
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
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
    padding: 10,
  },
  text: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "400",
    color: Colors.primary,
  },
});
