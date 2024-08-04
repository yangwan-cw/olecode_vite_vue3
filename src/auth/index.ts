import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import useStore from "@/store";
import AccessAuth from "@/auth/AccessAuth";
import ACCESSAUTH from "@/auth/AccessAuth";
import checkAccess from "@/auth/CheckAccess";
import router from "@/router/index";

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const { useUserStore } = useStore();
    const { loginUser, fetchAndUpdateUser } = useUserStore();

    console.log("登陆用户信息", loginUser);
    // 如果没有登录或没有用户角色，自动登录
    if (!loginUser || !loginUser.roles) {
      // await 是为了等用户登录成功之后，再执行后续的代码
      await fetchAndUpdateUser();
    }
    const needAccess = (to.meta?.roles as string) ?? AccessAuth.NOT_LOGIN;
    // 要跳转的页面必须要登录,不需要登录的页面直接跳转过去
    if (needAccess !== AccessAuth.NOT_LOGIN) {
      // 如果没有登录，跳转到登录页面
      if (
        !loginUser ||
        !loginUser.roles ||
        loginUser.roles === ACCESSAUTH.NOT_LOGIN
      ) {
        next(`/user/login?redirect=${to.fullPath}`);
        return;
      }
      // 如果已经登录，但权限不足，那么跳转到无权限页面
      if (!checkAccess(useUserStore(), needAccess)) {
        next("/error");
        return;
      }
    }
    next();
  }
);
