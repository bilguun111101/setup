import React, { memo, useCallback, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import {
  Colors,
  HttpHandler,
  type IFormRef,
} from "@goodtechsoft/xs-core-native";
import { Tabs } from "react-native-collapsible-tab-view";
import type { IGroup } from "../../interfaces";
import {
  DescriptionForm,
  type IDescriptionFormData,
} from "../form/description-form";
import { useSWRConfig } from "swr/_internal";
import { GroupApi } from "../../apis";
import { ResultForm } from "../layout/form-result";
import { type IRuleFormData, RuleForm } from "../form/rule-form";
import { useToast } from "react-native-toast-notifications";
import { timeFormat } from "../../utils/timeformat";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  data: IGroup;
};

const InfoTabScreen = memo((props: Props) => {
  const { data } = props;
  const { mutate } = useSWRConfig();
  const descriptionRef = useRef<IFormRef<any>>(null);
  const toast = useToast();
  const sfArea = useSafeAreaInsets();

  const descriptionData = useMemo<IDescriptionFormData>(() => {
    if (data?.description) {
      return {
        description: data?.description,
        type: "confirm",
      };
    }
    return {
      description: undefined,
      type: "",
    };
  }, [data?.description]);

  const onDescriptionSubmit = useCallback(
    async (values: IDescriptionFormData) => {
      const groupForm = {
        description: values.description,
      };

      try {
        const formData = await GroupApi.descriptionChange({
          id: data._id,
          data: groupForm || "",
        });

        data.setDescription(mutate, formData);
        toast.show("Амжилттай солигдлоо", {
          placement: "bottom",
          duration: 2000,
          animationType: "slide-in",
        });
      } catch (err) {
        descriptionRef.current?.setErrors({
          email: (err as HttpHandler).message || "",
        });
      }
    },
    [mutate, data],
  );

  const ruleRef = useRef<IFormRef<any>>(null);
  const ruleData = useMemo<IDescriptionFormData>(() => {
    if (data?.rule) {
      return {
        rule: data?.rule,
        type: "confirm",
      };
    }
    return {
      rule: undefined,
      type: "",
    };
  }, [data?.rule]);

  const onRuleSubmit = useCallback(
    async (values: IRuleFormData) => {
      const groupForm = {
        rule: values.rule,
      };

      try {
        const formData = await GroupApi.ruleChange({
          id: data._id,
          data: groupForm || "",
        });

        data.setRule(mutate, formData);
        toast.show("Амжилттай солигдлоо", {
          placement: "bottom",
          duration: 2000,
          animationType: "slide-in",
        });
      } catch (err) {
        descriptionRef.current?.setErrors({
          email: (err as HttpHandler).message || "",
        });
      }
    },
    [mutate, data],
  );

  const descriptionRender = useCallback(() => {
    if (data.isAdmin) {
      return (
        <>
          <DescriptionForm
            ref={descriptionRef}
            payload={descriptionData}
            onSubmit={onDescriptionSubmit}
          />
          <View style={styles.h10} />
        </>
      );
    }
    return (
      <>
        <ResultForm title={"Тайлбар"} description={data.description} />
        <View style={styles.h10} />
      </>
    );
  }, []);

  const ruleRender = useCallback(() => {
    if (data.isAdmin) {
      return (
        <>
          <RuleForm ref={ruleRef} payload={ruleData} onSubmit={onRuleSubmit} />
          <View style={styles.h10} />
        </>
      );
    }
    if (data.rule) {
      return (
        <>
          <ResultForm title={"Дүрэм"} description={data.rule} />
          <View style={styles.h10} />
        </>
      );
    }
    return <View />;
  }, []);

  return (
    <>
      {data.isJoined || data.privacy === "PUBLIC" ? (
        <Tabs.ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.root}>
          <View style={styles.h10} />
          {descriptionRender()}
          {ruleRender()}
          <ResultForm
            title="Нээгдсэн огноо"
            description={`${timeFormat(data.createdAt)}`}
          />
          <View style={{ height: sfArea.bottom }} />
        </Tabs.ScrollView>
      ) : (
        <View style={styles.root} />
      )}
    </>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.gray101,
  },
  h10: {
    height: 10,
  },
  h15: {
    height: 15,
  },
  h4: {
    height: 4,
  },
  w4: {
    width: 4,
  },
  ph18: {
    paddingHorizontal: 18,
  },
});

InfoTabScreen.displayName = "InfoTabScreen";

export { InfoTabScreen };
