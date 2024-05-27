import {
  AppBar,
  ArrowLeftIcon,
  Button,
  CheckIcon,
  Colors,
  Field,
  Form,
  IconSizes,
  TextInput,
} from "@goodtechsoft/xs-core-native";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as yup from "yup";

export type ChangeNameFormProps = {
  name: string;
};

type Props = {
  action: [string, { name: string }];
  onSubmit: (e: ChangeNameFormProps) => void;
};

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Заавал бөглөнө!")
    .max(43, "Нэр ихдээ 43 тэмдэгтээс тогтоно"),
});

const ChangeNameForm = React.memo(({ action, onSubmit }: Props) => {
  const data = useMemo(() => {
    return {
      firstName: undefined,
      ...(action && action[0] === "update" ? action[1] : {}),
    };
  }, [action]);
  return (
    <View style={styles.container}>
      <Form initialValues={data} onSubmit={onSubmit} validationSchema={schema}>
        {({ handleSubmit }) => {
          return (
            <>
              <AppBar
                useSafeArea={false}
                left={
                  <Button
                    type="text"
                    icon={
                      <ArrowLeftIcon
                        color={Colors.primary}
                        size={IconSizes.ExtraLarge}
                      />
                    }
                  />
                }
                right={
                  <Button
                    onPress={handleSubmit}
                    type="text"
                    icon={
                      <CheckIcon
                        color={Colors.primary}
                        size={IconSizes.ExtraLarge}
                      />
                    }
                  />
                }
                center={<Text style={styles.title}>Бүлгийн нэр солих</Text>}
              />
              <View style={styles.body}>
                <Field name="name">
                  {({ value, onChange, error }) => (
                    <TextInput
                      label="Бүлгийн нэр"
                      error={error}
                      autoFocus={true}
                      useBottomSheet
                      value={value}
                      onChangeText={text => onChange(text)}
                      onSubmitEditing={() => handleSubmit()}
                      placeholder={"Нэр"}
                      placeholderTextColor={Colors.gray103}
                      returnKeyLabel="go"
                    />
                  )}
                </Field>
              </View>
            </>
          );
        }}
      </Form>
    </View>
  );
});

ChangeNameForm.displayName = "ChangeNameForm";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  body: {
    marginTop: 0,
    margin: 18,
    padding: 24,
    borderRadius: 12,
    backgroundColor: Colors.gray101,
  },
  title: {
    fontSize: 16,
    color: Colors.primary,
    fontFamily: "Inter",
    fontWeight: "500",
  },
});

export { ChangeNameForm };
