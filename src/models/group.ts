import { type IUser } from "@goodtechsoft/xs-user-native";
import type { IGroup, ICategory } from "../interfaces";
import type { ScopedMutator } from "swr/_internal";
import type { IImage } from "@goodtechsoft/xs-core-native";

export class Group implements IGroup {
  _id: string;
  name: string;
  privacy: string;
  coverImage: IImage;
  category: ICategory;
  description: string;
  isDirectPost: boolean;
  members: IUser[];
  membersCount: number;
  postCount: number;
  createdAt: string;
  rule: string;
  isJoined: boolean;
  followers: IUser[];
  isPending: boolean;
  isInvited: boolean;
  isAdmin: boolean;
  isGroupOwner: boolean;
  isAdminInvited: boolean;
  isNew?: boolean;
  pendingMembersCount?: number;

  constructor({
    _id,
    name,
    privacy,
    coverImage,
    category,
    description,
    isDirectPost,
    members,
    membersCount,
    postCount,
    createdAt,
    rule,
    isInvited,
    isJoined,
    isPending,
    followers,
    isAdmin,
    isGroupOwner,
    isNew,
    isAdminInvited,
    pendingMembersCount,
  }: Group) {
    this._id = _id;
    this.name = name;
    this.privacy = privacy;
    this.coverImage = coverImage;
    this.category = category;
    this.description = description;
    this.isDirectPost = isDirectPost;
    this.members = members;
    this.membersCount = membersCount;
    this.postCount = postCount;
    this.createdAt = createdAt;
    this.rule = rule;
    this.isInvited = isInvited;
    this.isJoined = isJoined;
    this.isPending = isPending;
    this.isAdmin = isAdmin;
    this.followers = followers;
    this.isGroupOwner = isGroupOwner;
    this.isNew = isNew;
    this.isAdminInvited = isAdminInvited;
    this.pendingMembersCount = pendingMembersCount;
  }

  setCover(mutate: ScopedMutator, data: IGroup) {
    this.coverImage = data.coverImage;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false,
    });
    return this;
  }

  setPrivacy(mutate: ScopedMutator, data: any) {
    this.privacy = data;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false,
    });
    return this;
  }

  setPostType(mutate: ScopedMutator, data: any) {
    this.isDirectPost = data;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false,
    });
    return this;
  }

  setRule(mutate: ScopedMutator, data: IGroup) {
    this.rule = data.rule;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false,
    });
    return this;
  }

  setDescription(mutate: ScopedMutator, data: IGroup) {
    this.description = data.description;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false,
    });
    return this;
  }

  setName(mutate: ScopedMutator, data: IGroup) {
    this.name = data.name;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false,
    });
    return this;
  }

  setJoin(mutate: ScopedMutator, isJoin: boolean) {
    this.isJoined = isJoin;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false,
    });
    return this;
  }

  setMinusCount(mutate: ScopedMutator) {
    this.membersCount = this.membersCount - 1;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false,
    });
    return this;
  }
  setGroupAdmin(mutate: ScopedMutator) {
    this.isAdmin = true;
    this.isAdminInvited = false;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false,
    });
    return this;
  }

  setDeclineAdmin(mutate: ScopedMutator) {
    this.isAdminInvited = false;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false,
    });
    return this;
  }

  setSignCount(mutate: ScopedMutator) {
    this.membersCount = this.membersCount + 1;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false,
    });
    return this;
  }

  setPending(mutate: ScopedMutator, isPending: boolean) {
    this.isPending = isPending;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false,
    });
    return this;
  }

  setInvited(mutate: ScopedMutator, isInvited: boolean) {
    this.isInvited = isInvited;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false,
    });
    return this;
  }

  setAdminInvited(mutate: ScopedMutator, id: string) {
    this.isAdminInvited = true;
    mutate(`swr.user.${id}`, Group.fromJson(this), { revalidate: false });
    return this;
  }
  setAdminInvitedCancel(mutate: ScopedMutator, id: string) {
    this.isAdminInvited = true;
    mutate(`swr.user.${id}`, Group.fromJson(this), { revalidate: false });
    return this;
  }

  setNewGroup(mutate: ScopedMutator) {
    this.isNew = true;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false,
    });
    return this;
  }

  setMinusPendingCount(mutate: ScopedMutator) {
    this.pendingMembersCount = this.pendingMembersCount! - 1;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false,
    });
    return this;
  }

  static fromJson(json: IGroup) {
    return new Group(json);
  }
}
