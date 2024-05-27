import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { memo, useCallback } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { PostApi } from "../../apis";
import type { NavigationRoutes, RootStackParamList } from "../../navigation";
// import { type IPost, Post, PostCard } from "@goodtechsoft/xs-post-native";
import useSWRInfinite from "swr/infinite";

type Props = NativeStackScreenProps<
  RootStackParamList,
  NavigationRoutes.Group_AllPendingPostScreen
>;

const AllPendingPostScreen = memo(({ route }: Props) => {
  const { payload } = route.params;
  const navigation = useNavigation();
  const toast = useToast();

  const { mutate: postListMutate } = useSWRInfinite((_, _prev) => {
    return `${payload._id}.swr.group|${_prev?.nextPage || ""}`;
  });

  const { data, size, setSize, isLoading, mutate } = useSWRInfinite(
    index => `swr.requested.post.${index}`,
    async index => {
      const page = index.split(".").pop() || "";

      const res = await PostApi.postRequestList({
        id: payload._id,
        page: parseInt(`${page || 1}`, 10) + 1,
        limit: 10,
      });

      return res;
    },
    {
      revalidateAll: true,
    },
  );

    toast.show("Амжилттай нийтлэгдлээ", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in",
    });
  }, []);

  const renderItem = useCallback(({ item }: { item: any }) => {
    return (
      <View style={styles.postCard}>
        <View style={styles.row}>
        </View>
      </View>
    );
  }, []);

  const emptyRender = useCallback(() => {
    if (isLoading) {
      return (
        <View style={styles.empty}>
        </View>
      );
    }

    return (
      <View style={styles.empty}>
      </View>
    );
  }, [isLoading]);

  const flatData = (data || [])?.map(row => row?.rows).flat();

  if (flatData && (flatData || [])[0] === null) {
    return <View />;
  }

  return (
    <View style={styles.root}>
      <View style={styles.header}>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={flatData}
        initialNumToRender={7}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        ListEmptyComponent={emptyRender()}
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              setSize(1);
            }}
            refreshing={isLoading}
          />
        }
        onEndReached={() => {
          setSize(size + 1);
        }}
        contentInset={{ top: 0, bottom: 20, left: 0, right: 0 }}
        contentInsetAdjustmentBehavior="automatic"
      />
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // backgroundColor: Colors.gray101,
  },
  header: {
    zIndex: 10,
  },
  h15: {
    height: 15,
  },
  h10: {
    height: 10,
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
  headerContainer: {
    // backgroundColor: Colors.gray101,
  },
  listContent: {
    marginTop: 10,
    // backgroundColor: Colors.white,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    // color: Colors.primary,
  },
  bgGray: {
    // backgroundColor: Colors.gray101,
  },
  card: {
    // backgroundColor: Colors.white,
    padding: 18,
    borderRadius: 10,
  },
  empty: {
    marginTop: 10,
    borderWidth: 0,
    // backgroundColor: Colors.white,
    borderRadius: 10,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    gap: 10,
    paddingHorizontal: 18,
    flexDirection: "row",
  },
  button: {
    flex: 1,
  },
  postCard: {
    marginTop: 10,
    // backgroundColor: Colors.white,
    borderRadius: 10,
    paddingBottom: 15,
    borderWidth: 1,
    // borderColor: Colors.gray102,
  },
});

AllPendingPostScreen.displayName = "AllPendingPostScreen";

export { AllPendingPostScreen };
