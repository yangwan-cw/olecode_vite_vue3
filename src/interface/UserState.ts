export interface UserState {
  loginUser: {
    userName: string; // 用户名
    roles?: string; // 角色,
    userAvatar?: string; // 头像
  };
}
