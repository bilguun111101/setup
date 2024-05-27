import { Post } from "@goodtechsoft/xs-post-native";
export declare const groupPostList: (nextPage: string | undefined, groupId: string) => Promise<import("..").IResult<Post>>;
export declare const postRequestList: ({ page, id, limit, }: {
    page: number;
    id: string;
    limit?: number;
}) => Promise<import("..").IResult<Post>>;
export declare const approvePost: (id: string, postId: string) => Promise<any>;
export declare const deletePost: (id: string) => Promise<any>;
//# sourceMappingURL=post.d.ts.map