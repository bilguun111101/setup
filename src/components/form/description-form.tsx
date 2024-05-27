import { StyleSheet, View } from "react-native";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import * as yup from "yup";
import { RowButton } from "../row-button";
import { ResultForm } from "../layout/form-result";
import { AddItem } from "../layout/add-item";

export type IDescriptionFormData = {
  description?: string;
  type: string;
};

type Props = {
  payload: IDescriptionFormData;
  onSubmit: (data: IDescriptionFormData) => void;
};

const schema = yup.object().shape({
  description: yup.string().required("Заавал бөглөнө!"),
});

const DescriptionForm = forwardRef(({ onSubmit, payload }: Props, ref) => {
  const formRef = useRef(null);
  const data = useMemo(() => {
    return payload;
  }, [payload]);
  useImperativeHandle(ref, () => ({
    submit() {
      // formRef.current?.submit();
    },
  }));
  const onCancel = useCallback(
    (setFieldValue: (name: string, value: any) => void) => {
      if (payload.description) {
        setFieldValue("type", "confirm");
        return;
      }
      setFieldValue("type", "");
    },
    [payload],
  );

  useEffect(() => {
    if (formRef) {
      // formRef.current?.setFieldValue("type", payload?.type);
      // formRef.current?.setFieldValue("description", payload?.description);
    }
  }, [payload]);
  return (
    // <Form
    //   ref={formRef}
    //   onSubmit={onSubmit}
    //   initialValues={data}
    //   validationSchema={schema}>
    //   {({ values, setFieldValue }) => {
    //     if (!values.type) {
    //       return (
    //         <AddItem
    //           title={"Бүлгийн тайлбар"}
    //           onPress={() => setFieldValue("type", "edit")}
    //         />
    //       );
    //     }
    //     if (values.type === "confirm") {
    //       return (
    //         <ResultForm
    //           title={"Тайлбар"}
    //           description={values.description}
    //           onPress={() => setFieldValue("type", "edit")}
    //         />
    //       );
    //     }
    //     return (
    //       <View style={styles.card}>
    //         <Field name="description">
    //           {({ onChange, value, error }) => {
    //             return (
    //               <TextInput
    //                 error={error}
    //                 multiline
    //                 onChangeText={onChange}
    //                 placeholder="Тайлбар"
    //                 style={styles.input}
    //                 value={value}
    //                 label="Бүлгийн тайлбар"
    //               />
    //             );
    //           }}
    //         </Field>
    //         {/* <Text style={styles.description}>Тайлбао текст сувдаа</Text> */}
    //         <View style={styles.h10} />
    //         <RowButton
    //           onPress={() => {
    //             formRef.current?.submit();
    //             setFieldValue("type", "confirm");
    //           }}
    //           onCancel={() => onCancel(setFieldValue)}
    //         />
    //       </View>
    //     );
    //   }}
    // </Form>
    <></>
  );
});

DescriptionForm.displayName = "DescriptionForm";

export { DescriptionForm };

const styles = StyleSheet.create({
  card: {
    // backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 18,
  },
  h10: {
    height: 10,
  },
  description: {
    fontWeight: "400",
    fontFamily: "Inter",
    fontSize: 12,
    lineHeight: 16,
    // color: Colors.gray104,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    // borderColor: Colors.gray101,
  },
});
