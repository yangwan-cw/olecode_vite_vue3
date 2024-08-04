import { defineStore } from "pinia";
import { UserState } from "@/interface/UserState";
import AccessAuth from "@/auth/AccessAuth";
import { Service } from "../../../generated";

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    loginUser: {
      userName: "未登录",
      userAvatar: "",
      // roles: AccessAuth.NOT_LOGIN,
    },
  }),
  getters: {
    getUserName: (state: UserState) => state.loginUser.userName,
  },
  actions: {
    updateUser(userName: string, roles: string, userAvatar: string) {
      this.loginUser.userName = userName;
      this.loginUser.roles = roles;
      this.loginUser.userAvatar = userAvatar;
    },
    async fetchAndUpdateUser() {
      // 模拟异步操作，例如从 API 获取用户数据
      const userData = await Service.getLoginUserUsingGet();

      if (userData.code === 200) {
        this.updateUser(
          userData.data?.userName as string,
          userData.data?.userRole as string,
          userData.data?.userAvatar as string
        );
      } else {
        this.updateUser("请登录", AccessAuth.NOT_LOGIN, "");
      }
    },
  },
});
