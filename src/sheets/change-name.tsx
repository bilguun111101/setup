import { Keyboard } from "react-native";
import React, { memo, useMemo } from "react";
import { useToast } from "react-native-toast-notifications";
import { useSWRConfig } from "swr";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomSheetParamList, NavigationRoutes } from "../navigation";
import { GroupApi } from "../apis";
import {
  ChangeNameForm,
  type ChangeNameFormProps,
} from "../components/form/change-name";
import { Group } from "../models";

type Props = NativeStackScreenProps<
  BottomSheetParamList,
  NavigationRoutes.Group_ChangeNameSheet
>;
const ChangeNameSheet = memo(({ route }: Props) => {
  const { payload } = route.params;
  const { mutate } = useSWRConfig();
  const toast = useToast();
  const navigation = useNavigation();

  const data = useMemo(() => {
    if (payload && payload.name) {
      return [
        "update",
        {
          name: payload.name,
        },
      ];
    }

    return [
      "update",
      {
        name: undefined,
      },
    ];
  }, [payload]);

  const onSubmit = async (values: ChangeNameFormProps) => {
    navigation.goBack();
    const _group = Group.fromJson(payload!);
    _group.name = values.name;
    _group.setName(mutate, _group);
    try {
      await GroupApi.nameChange({
        id: payload._id,
        data: values,
      });
      toast.show("Амжилттай солигдлоо", {
        placement: "bottom",
        duration: 2000,
        animationType: "slide-in",
      });
    } catch (err) {
      console.log(err);
    }
    Keyboard.dismiss();
  };

  return (
    <>
      <ChangeNameForm onSubmit={onSubmit} action={data as any} />
    </>
  );
});

ChangeNameSheet.displayName = "ChangeNameSheet";

export { ChangeNameSheet };
