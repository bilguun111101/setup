import { Category, Group } from "../models";
import { User } from "@goodtechsoft/xs-user-native";
export declare const suggestList: ({ page, query, }: {
    page: number;
    query: string;
}) => Promise<import("..").IResult<Group>>;
export declare const requestList: ({ page, id, query, }: {
    page: number;
    id: string;
    query?: string;
}) => Promise<import("..").IResult<User>>;
export declare const categoryList: ({ page }: {
    page: number;
}) => Promise<import("..").IResult<Category>>;
export declare const groupList: ({ page, isAdmin, query, }: {
    page: number;
    isAdmin?: boolean;
    query?: string;
}) => Promise<import("..").IResult<Group>>;
export declare const memberList: ({ page, id, query, }: {
    page: number;
    id: string;
    query?: string;
}) => Promise<import("..").IResult<User>>;
export declare const invitationList: ({ page, limit, id, query, }: {
    page: number;
    limit: number;
    id: string;
    query: string;
}) => Promise<import("..").IResult<User>>;
export declare const create: (data: any) => Promise<any>;
export declare const descriptionChange: ({ id, data, }: {
    id: string;
    data: any;
}) => Promise<any>;
export declare const ruleChange: ({ id, data }: {
    id: string;
    data: any;
}) => Promise<any>;
export declare const privacyChange: ({ id, data, }: {
    id: string;
    data: any;
}) => Promise<any>;
export declare const coverChange: ({ id, data }: {
    id: string;
    data: any;
}) => Promise<any>;
export declare const join: (id: string) => Promise<any>;
export declare const cancelRequest: (id: string) => Promise<any>;
export declare const nameChange: ({ id, data }: {
    id: string;
    data: any;
}) => Promise<any>;
export declare const get: (id: string) => Promise<Group>;
export declare const deleteGroup: (id: string) => Promise<any>;
export declare const acceptMember: ({ id, userId, }: {
    id: string;
    userId: string;
}) => Promise<any>;
export declare const adminList: ({ page, id }: {
    page: number;
    id: string;
}) => Promise<import("..").IResult<User>>;
export declare const inviteAdmin: ({ id, userId, }: {
    id: string;
    userId: string;
}) => Promise<any>;
export declare const leaveGroup: (id: string) => Promise<any>;
export declare const removeUser: (id: string, userId: string) => Promise<any>;
export declare const removeAdmin: (id: string, userId: string) => Promise<any>;
export declare const cancelAdminRequest: (id: string, userId: string) => Promise<any>;
export declare const refuseAdmin: (id: string) => Promise<any>;
export declare const declineAdmin: (id: string) => Promise<any>;
export declare const approveAdmin: (id: string) => Promise<any>;
export declare const inviteMember: ({ id, data, }: {
    id: string;
    data: {
        user: string;
    };
}) => Promise<any>;
export declare const inviteDecline: (id: string) => Promise<any>;
export declare const inviteCancel: ({ id, data, }: {
    id: string;
    data: {
        user: string;
    };
}) => Promise<any>;
export declare const removeGroup: (id: string, userId: string) => Promise<any>;
export declare const directPost: ({ id, data }: {
    id: string;
    data: any;
}) => Promise<any>;
//# sourceMappingURL=group.d.ts.map