import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { memo, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";
import {
  CreateGroupForm,
  type ICreateStep1FormData,
} from "../../../components/form/create-group";
import { NavigationRoutes } from "../../../navigation";
import { Group } from "../../../models/group";
const CreateScreen = memo(() => {
  const formRef = useRef(null);
  const headerHeight = useHeaderHeight();

  const onSubmit = async (value: ICreateStep1FormData) => {
    const data = {
      name: value.name,
      privacy: value.privacy.value,
    };
    navigation.navigate(NavigationRoutes.Group_CreateStep2Screen, {
      data: data as Group,
    });
  };

  const navigation = useNavigation();

  return (
    <>
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={headerHeight}>
        <ScrollView style={styles.root}>
          <CreateGroupForm onSubmit={onSubmit} formRef={formRef} />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
});

CreateScreen.displayName = "CreateScreen";

export { CreateScreen };

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  title: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
  },
});
