import ACCESSAUTH from "@/auth/AccessAuth";
import { UserState } from "@/interface/UserState";

/**
 * 通用权限校验：用于判断用户身上的权限是否与 needAccess 一致
 * @param userParam 登录用户参数
 * @param needAccess 传递过来的参数是需要什么权限
 * return 权限结果
 */
const checkAuth = (
  userParam: UserState,
  needAccess: string = ACCESSAUTH.NOT_LOGIN
): boolean => {
  // 获取当前登录的用户去校验是否存在 loginUser? 如果不存在,那么则未登录
  const loginUserAccess = userParam.loginUser?.roles ?? ACCESSAUTH.NOT_LOGIN;

  // 如果参数传递过来，需要的参数是未登录状态的话，那么就直接返回具有
  if (needAccess === ACCESSAUTH.NOT_LOGIN) {
    return true;
  }

  // 如果用户登录才能访问，那么就去判断是否是未登录，如果等于未登录，那么不具有权限
  if (needAccess === ACCESSAUTH.USER) {
    if (loginUserAccess === ACCESSAUTH.NOT_LOGIN) {
      return false;
    }
  }

  // 如果需要管理员权限，如果需要的是管理员，那么不等于管理也返回 false
  if (needAccess === ACCESSAUTH.ADMIN) {
    if (loginUserAccess !== ACCESSAUTH.ADMIN) {
      return false;
    }
  }

  return true;
};
export default checkAuth;
