import React from "react";
import { type TabItemProps } from "react-native-collapsible-tab-view";
import { StyleSheet, Text } from "react-native";
import {
  Colors,
  IconSizes,
  InfoCircleIcon,
  PostIcon,
  UsersIcon,
} from "@goodtechsoft/xs-core-native";

const LabelRenderer = React.memo(
  (props: {
    tabProps:
      | TabItemProps<"MY">
      | TabItemProps<"DISCOVER">
      | TabItemProps<"POST">
      | TabItemProps<"USERS">
      | TabItemProps<"INFO">;
  }) => {
    const { tabProps } = props;

    const { name } = tabProps;

    if (name === "MY") {
      return <Text style={styles.title}>Таны бүлэг</Text>;
    }

    if (name === "DISCOVER") {
      return <Text style={styles.title}>Санал болгох</Text>;
    }
    if (name === "POST") {
      return <PostIcon color={Colors.primary} size={IconSizes.Large} />;
    }
    if (name === "USERS") {
      return <UsersIcon color={Colors.primary} size={IconSizes.Large} />;
    }
    if (name === "INFO") {
      return <InfoCircleIcon color={Colors.primary} size={IconSizes.Large} />;
    }

    return <Text />;
  },
);

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Inter",
    color: Colors.primary,
  },
});

LabelRenderer.displayName = "LabelRenderer";

export { LabelRenderer };
