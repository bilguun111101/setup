import React, { type RefObject, memo } from "react";
// import {
//   ArrowBottomIcon,
//   Button,
//   Colors,
//   Field,
//   Form,
//   type IFormRef,
//   IconSizes,
//   TextInput,
// } from "@goodtechsoft/xs-core-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation";
import * as yup from "yup";
import { GroupVector } from "../../assets/image/group-vector";

export type ICreateStep1FormData = {
  name: string;
  privacy: {
    name: string;
    value: string;
  };
};

type Props = {
  onSubmit: (data: ICreateStep1FormData) => void;
  formRef: RefObject<IFormRef<any>>;
};

const schema = yup.object().shape({
  name: yup.string().required("Заавал бөглөнө!"),
  privacy: yup.object().required("Заавал бөглөнө!"),
});

export type Asset = {
id: string;
filename: string;
uri: string;
mediaType: MediaTypeValue;
mediaSubtypes?: MediaSubtype[];
width: number;
height: number;
creationTime: number;
modificationTime: number;
duration: number;/**
Album ID that the asset belongs to.
@platform android
*/
albumId?: string;
};

const CreateGroupForm = memo(({ onSubmit, formRef }: Props) => {
  const navigation = useNavigation();

  return (
    <></>
    // <Form
    //   onSubmit={onSubmit}
    //   initialValues={{
    //     name: undefined,
    //     privacy: undefined,
    //   }}
    //   validationSchema={schema}
    //   ref={formRef}>
    //   {({ handleSubmit, setFieldValue }) => {
    //     return (
    //       <View style={styles.container}>
    //         <View style={styles.contentContainer}>
    //           <View style={styles.iconContainer}>
    //             <GroupVector />
    //           </View>
    //           <View style={styles.h20} />
    //           <Field name="name">
    //             {({ value, onChange, error }) => {
    //               return (
    //                 <TextInput
    //                   label="Бүлгийн нэр"
    //                   error={error}
    //                   value={value}
    //                   onChangeText={onChange}
    //                   placeholder="Энд нэрээ бичнэ үү"
    //                   placeholderTextColor={Colors.gray103}
    //                   style={
    //                     error ? [styles.input, styles.error] : styles.input
    //                   }
    //                 />
    //               );
    //             }}
    //           </Field>
    //           <Text style={styles.description}>
    //             Өөрийн брэнд, бизнес, эсвэл байгууллагын нэр зэрэг хуудсаа
    //             танилцуулахад ашиглах нэрийг оруулна уу.
    //           </Text>
    //           <View style={styles.h20} />
    //           <Field name={"privacy"}>
    //             {({ value, error }) => {
    //               return (
    //                 <>
    //                   <View style={styles.row}>
    //                     <Text style={styles.labelStyle}>Бүлгийн нууцлал</Text>
    //                     <Text style={styles.errorText}>{error}</Text>
    //                   </View>
    //                   <TouchableOpacity
    //                     onPress={() =>
    //                       navigation.navigate(
    //                         NavigationRoutes.Group_ChangePrivacySheet,
    //                         {
    //                           onChange: setFieldValue,
    //                         },
    //                       )
    //                     }
    //                     style={
    //                       error
    //                         ? [styles.fieldContainer, styles.error]
    //                         : styles.fieldContainer
    //                     }>
    //                     <Text
    //                       style={[
    //                         styles.containerTitle,
    //                         value && styles.primary,
    //                       ]}>
    //                       {value ? value.name : "Нууцлал"}
    //                     </Text>
    //                     <ArrowBottomIcon
    //                       size={IconSizes.Medium}
    //                       color={Colors.primary}
    //                     />
    //                   </TouchableOpacity>
    //                 </>
    //               );
    //             }}
    //           </Field>
    //           <Text style={styles.description}>
    //             Таны хуудсанд тохирох хамгийн оновчтой ангилалыг сонгоно уу.
    //           </Text>
    //         </View>
    //         <View style={styles.h20} />
    //         <Button
    //           title="Үргэлжлүүлэх"
    //           type={"primary"}
    //           onPress={handleSubmit}
    //         />
    //       </View>
    //     );
    //   }}
    // </Form>
  );
});

CreateGroupForm.displayName = "CreateGroupForm";

export { CreateGroupForm };

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  errorText: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    color: Colors.sub200,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray102,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
  },
  error: {
    borderColor: Colors.sub200,
  },
  labelStyle: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    color: Colors.primary,
    marginBottom: 8,
  },
  fieldContainer: {
    borderWidth: 1,
    borderColor: Colors.gray102,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fieldStyle: {
    color: Colors.gray103,
    lineHeight: 18,
    fontFamily: "Inter",
    fontWeight: "400",
  },
  primary: {
    color: Colors.primary,
  },
  containerTitle: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "400",
    color: Colors.gray103,
  },
  contentContainer: {
    borderWidth: 1,
    borderColor: Colors.gray102,
    borderRadius: 12,
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  iconContainer: {
    alignSelf: "center",
  },
  h20: {
    height: 20,
  },
  description: {
    marginTop: 8,
    fontWeight: "400",
    fontFamily: "Inter",
    fontSize: 10,
    lineHeight: 13,
    color: Colors.gray104,
  },

  dropdown: {
    height: 44,
    borderColor: Colors.gray102,
    borderWidth: 1,
    borderRadius: 10,
    paddingRight: 8,
    paddingLeft: 15,
  },
  placeholderStyle: {
    fontFamily: "Inter",
    color: Colors.gray103,
    fontSize: 14,
  },
  selectedTextStyle: {
    fontFamily: "Inter",
    color: Colors.primary,
    fontSize: 14,
  },
});
