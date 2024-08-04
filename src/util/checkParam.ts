import { isEmpty } from "radash";

/**
 *
 * @param userName 用户名
 * @param password 密码
 */
const checkParam = (userName: string, password: string) => {
  // 判断不能为空
  if (isEmpty(userName) && isEmpty(password)) {
    return "用户名不能为空 或 密码不能为空";
  }
  if (isEmpty(userName)) {
    return "用户名不能为空";
  }
  if (isEmpty(password)) {
    return "密码不能为空";
  }
};
export default checkParam;
