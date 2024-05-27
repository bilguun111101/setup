"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Group = void 0;
class Group {
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
    pendingMembersCount
  }) {
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
  setCover(mutate, data) {
    this.coverImage = data.coverImage;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false
    });
    return this;
  }
  setPrivacy(mutate, data) {
    this.privacy = data;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false
    });
    return this;
  }
  setPostType(mutate, data) {
    this.isDirectPost = data;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false
    });
    return this;
  }
  setRule(mutate, data) {
    this.rule = data.rule;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false
    });
    return this;
  }
  setDescription(mutate, data) {
    this.description = data.description;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false
    });
    return this;
  }
  setName(mutate, data) {
    this.name = data.name;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false
    });
    return this;
  }
  setJoin(mutate, isJoin) {
    this.isJoined = isJoin;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false
    });
    return this;
  }
  setMinusCount(mutate) {
    this.membersCount = this.membersCount - 1;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false
    });
    return this;
  }
  setGroupAdmin(mutate) {
    this.isAdmin = true;
    this.isAdminInvited = false;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false
    });
    return this;
  }
  setDeclineAdmin(mutate) {
    this.isAdminInvited = false;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false
    });
    return this;
  }
  setSignCount(mutate) {
    this.membersCount = this.membersCount + 1;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false
    });
    return this;
  }
  setPending(mutate, isPending) {
    this.isPending = isPending;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false
    });
    return this;
  }
  setInvited(mutate, isInvited) {
    this.isInvited = isInvited;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false
    });
    return this;
  }
  setAdminInvited(mutate, id) {
    this.isAdminInvited = true;
    mutate(`swr.user.${id}`, Group.fromJson(this), {
      revalidate: false
    });
    return this;
  }
  setAdminInvitedCancel(mutate, id) {
    this.isAdminInvited = true;
    mutate(`swr.user.${id}`, Group.fromJson(this), {
      revalidate: false
    });
    return this;
  }
  setNewGroup(mutate) {
    this.isNew = true;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false
    });
    return this;
  }
  setMinusPendingCount(mutate) {
    this.pendingMembersCount = this.pendingMembersCount - 1;
    mutate(`swr.group.${this._id}`, Group.fromJson(this), {
      revalidate: false
    });
    return this;
  }
  static fromJson(json) {
    return new Group(json);
  }
}
exports.Group = Group;
//# sourceMappingURL=group.js.map