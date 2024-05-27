import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import React, { memo, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";
import {
  CreateGroupStep2Form,
  type ICreateStep2FormData,
} from "../../../components/form/create-2-group";
import { NavigationRoutes, type RootStackParamList } from "../../../navigation";
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { GroupApi } from "../../../apis";
import useSWRInfinite from "swr/infinite";
import { Group } from "../../../models";
import { useSWRConfig } from "swr/_internal";

type Props = NativeStackScreenProps<
  RootStackParamList,
  NavigationRoutes.Group_CreateStep2Screen
>;

const CreateStep2Screen = memo(({ route }: Props) => {
  const { data: formData } = route.params;
  const formRef = useRef(null);
  const { mutate } = useSWRConfig();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const { mutate: myJoinedList } = useSWRInfinite(
    index => `swr.group.my.${index}`,
  );
  const { mutate: adminList } = useSWRInfinite(
    index => `swr.group.admin.${index}`,
  );
  const onSubmit = async (value: ICreateStep2FormData) => {
    const data = {
      name: formData.name,
      privacy: formData.privacy,
      description: value.description,
      coverImage: value.coverImage,
      category: value.category._id,
    };
    try {
      var res = await GroupApi.create(data);
      var resultData = Group.fromJson(res);
      resultData.setNewGroup(mutate);
      navigation.pop(2);
      navigation.navigate(NavigationRoutes.Group_GroupDetailScreen, {
        payload: resultData,
      });
      setTimeout(() => {
        myJoinedList();
        adminList();
      }, 300);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={headerHeight}>
        <ScrollView style={styles.root}>
          <CreateGroupStep2Form onSubmit={onSubmit} formRef={formRef} />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
});

CreateStep2Screen.displayName = "CreateStep2Screen";

export { CreateStep2Screen };

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
