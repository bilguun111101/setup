import React, { type RefObject, memo, useCallback, useState } from "react";
import * as yup from "yup";
import {
  ArrowBottomIcon,
  Button,
  Colors,
  Field,
  Form,
  type IFormRef,
  IconSizes,
  Image,
  ImageSizes,
  ImageUpload,
  Loader,
  PERMISSION_TYPE,
  PlusIcon,
  TextInput,
  checkPermission,
} from "@goodtechsoft/xs-core-native";
import {
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation";
import { MediaApi } from "../../apis";
import type { ICategory } from "../../interfaces";

export type ICreateStep2FormData = {
  coverImage: string;
  category: ICategory;
  description: string;
};

type Props = {
  onSubmit: (data: ICreateStep2FormData) => void;
  formRef: RefObject<IFormRef<any>>;
};

const schema = yup.object().shape({
  category: yup.object().required("Заавал бөглөнө!"),
  description: yup.string().required("Заавал бөглөнө!"),
});

const CreateGroupStep2Form = memo(({ onSubmit, formRef }: Props) => {
  const [isImageLoading, setImageLoading] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const navigation = useNavigation();
  const [permission, setPermission] = useState({
    gallery: false,
    camera: false,
    loading: true,
  });

  const mediaPermission = useCallback(async () => {
    const camera = await checkPermission(PERMISSION_TYPE.CAMERA);
    const gallery = await checkPermission(PERMISSION_TYPE.GALLERY);
    setPermission({ camera, gallery, loading: false });
    const res: { gallery: boolean; camera: boolean } = {
      gallery,
      camera,
    };

    return res;
  }, []);

  const check = useCallback(async () => {
    try {
      const { camera, gallery } = await mediaPermission();

      if (!camera || !gallery) {
        navigation.navigate(NavigationRoutes.Group_ImagePermissionScreen, {
          permission,
        });
      }
    } catch (error) {
      console.log("error ", error);
      setPermission(e => {
        return { ...e, loading: false };
      });
    }
  }, [mediaPermission, navigation, permission]);

  const renderCover = useCallback(() => {
    if (isImageLoading) {
      return (
        <View style={styles.cover}>
          <Loader />
        </View>
      );
    }
    if (coverImage) {
      return (
        <Image
          source={coverImage}
          size={ImageSizes.ExtraLarge}
          style={styles.coverContainer}
        />
      );
    }
    return (
      <View style={styles.coverContainer}>
        <View style={styles.coverButton}>{plusButton()}</View>
      </View>
    );
  }, [coverImage, isImageLoading]);

  const plusButton = () => {
    return (
      <View style={styles.iconRoot}>
        <View style={styles.iconContainer}>
          <PlusIcon size={IconSizes.Medium} color={Colors.white} />
        </View>
      </View>
    );
  };

  const uploadFile = async (item: any) => {
    try {
      const file = new FormData();

      file.append("file", {
        name:
          Platform.OS === "ios"
            ? item?.image.uri?.replace("file://", "")
            : item?.image.uri,
        type: Platform.OS === "ios" ? item.type : "image/jpeg",
        uri:
          Platform.OS === "ios"
            ? item?.image.uri?.replace("file://", "")
            : item?.image.uri,
      });
      const result = await MediaApi.uploadImage(file, "USER");
      return {
        ...result,
        type: "image",
      };
    } catch (e) {
      console.log("catch ", e);
      return null;
    }
  };

  const onChangeCover = useCallback(
    async (
      _: any,
      uri: string,
      setFieldValue: (name: string, value: any) => void,
    ) => {
      if (Platform.OS === "android") {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA!,
            {
              title: "Cool Photo App Camera Permission",
              message:
                "Cool Photo App needs access to your camera " +
                "so you can take awesome pictures.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK",
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setCoverImage(uri);
          } else {
            navigation.navigate(NavigationRoutes.Group_ImagePermissionScreen, {
              permission,
            });
          }
        } catch (err) {
          console.warn(err);
        }
      }
      const res = await uploadFile({
        image: {
          uri: uri,
        },
      });
      setCoverImage(uri);
      setFieldValue("coverImage", res._id);
      setImageLoading(false);
    },
    [navigation, permission],
  );

  return (
    <Form
      onSubmit={onSubmit}
      validationSchema={schema}
      initialValues={{
        coverImage: undefined,
        category: undefined,
        description: undefined,
      }}
      ref={formRef}>
      {({ handleSubmit, setFieldValue }) => {
        return (
          <View style={styles.root}>
            <View style={styles.contentContainer}>
              <Text style={styles.labelStyle}>Ковер зураг</Text>
              <Field name="coverImage">
                {({}) => {
                  return (
                    <>
                      {Platform.OS === "ios" && (
                        <>
                          {!permission.gallery ? (
                            <Pressable onPress={check}>
                              {renderCover()}
                            </Pressable>
                          ) : (
                            <ImageUpload
                              onChange={(file: FormData, uri: string) => {
                                setImageLoading(true);
                                onChangeCover(file, uri, setFieldValue);
                              }}
                              cropRect={{ width: 1280, height: 640 }}>
                              {renderCover()}
                            </ImageUpload>
                          )}
                        </>
                      )}
                      {Platform.OS === "android" && (
                        <ImageUpload
                          cropRect={{ width: 1280, height: 640 }}
                          onChange={(file: FormData, uri: string) => {
                            setImageLoading(true);
                            onChangeCover(file, uri, setFieldValue);
                          }}>
                          {renderCover()}
                        </ImageUpload>
                      )}
                    </>
                  );
                }}
              </Field>
              <View style={styles.h20} />

              <Field name="category">
                {({ value, error }) => {
                  return (
                    <>
                      <View style={styles.row}>
                        <Text style={styles.labelStyle}>Бүлгийн ангилал</Text>
                        <Text style={styles.errorText}>{error}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate(
                            NavigationRoutes.Group_ChangeCategorySheet,
                            {
                              onChange: setFieldValue,
                            },
                          )
                        }
                        style={
                          error
                            ? [styles.fieldContainer, styles.error]
                            : styles.fieldContainer
                        }>
                        <Text
                          style={[
                            styles.containerTitle,
                            value && styles.primary,
                          ]}>
                          {value ? value.name : "Ангилал"}
                        </Text>
                        <ArrowBottomIcon
                          size={IconSizes.Medium}
                          color={Colors.primary}
                        />
                      </TouchableOpacity>
                    </>
                  );
                }}
              </Field>
              <View style={styles.h20} />
              <Field name="description">
                {({ value, onChange, error }) => {
                  return (
                    <TextInput
                      label="Тайлбар"
                      error={error}
                      value={value}
                      onChangeText={onChange}
                      placeholder="Энд тайлбараа бичнэ үү"
                      placeholderTextColor={Colors.gray103}
                      style={
                        error ? [styles.input, styles.error] : styles.input
                      }
                    />
                  );
                }}
              </Field>
              <Text style={styles.description}>
                Өөрийн брэнд, бизнес, эсвэл байгууллагын нэр зэрэг хуудсаа
                танилцуулахад ашиглах нэрийг оруулна уу.
              </Text>
            </View>
            <View style={styles.h20} />
            <Button
              title="Үргэлжлүүлэх"
              type={"primary"}
              onPress={handleSubmit}
            />
          </View>
        );
      }}
    </Form>
  );
});

CreateGroupStep2Form.displayName = "CreateGroupStep2Form";

export { CreateGroupStep2Form };

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  root: {
    flex: 1,
    paddingHorizontal: 18,
  },
  error: {
    borderColor: Colors.sub200,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray102,
  },
  errorText: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    color: Colors.sub200,
  },
  h20: {
    height: 20,
  },
  labelStyle: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 8,
  },
  contentContainer: {
    borderWidth: 1,
    borderColor: Colors.gray102,
    borderRadius: 12,
    padding: 18,
  },
  iconContainer: {
    backgroundColor: Colors.primary,
    padding: 4,
    borderRadius: 100,
  },
  cover: {
    width: "100%",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: Colors.gray102,
  },
  primary: {
    color: Colors.primary,
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
  description: {
    marginTop: 8,
    fontWeight: "400",
    fontFamily: "Inter",
    fontSize: 10,
    lineHeight: 13,
    color: Colors.gray104,
  },
  coverContainer: {
    backgroundColor: Colors.gray102,
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  containerTitle: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "400",
    color: Colors.gray103,
  },
  coverButton: {
    position: "absolute",
    bottom: -12,
    right: 6,
  },
  iconRoot: {
    padding: 6,
    backgroundColor: Colors.gray101,
    borderRadius: 100,
  },
});
