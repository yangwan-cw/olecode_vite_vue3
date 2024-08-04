/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_LoginUserVO_ } from "../models/BaseResponse_LoginUserVO_";
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { BaseResponse_Page_Question_ } from "../models/BaseResponse_Page_Question_";
import type { BaseResponse_Page_QuestionSubmitVO_ } from "../models/BaseResponse_Page_QuestionSubmitVO_";
import type { BaseResponse_Page_QuestionVO_ } from "../models/BaseResponse_Page_QuestionVO_";
import type { BaseResponse_Page_SysUser_ } from "../models/BaseResponse_Page_SysUser_";
import type { BaseResponse_Page_UserVO_ } from "../models/BaseResponse_Page_UserVO_";
import type { BaseResponse_QuestionVO_ } from "../models/BaseResponse_QuestionVO_";
import type { BaseResponse_string_ } from "../models/BaseResponse_string_";
import type { BaseResponse_SysUser_ } from "../models/BaseResponse_SysUser_";
import type { BaseResponse_UserVO_ } from "../models/BaseResponse_UserVO_";
import type { DeleteRequest } from "../models/DeleteRequest";
import type { QuestionAddRequest } from "../models/QuestionAddRequest";
import type { QuestionEditRequest } from "../models/QuestionEditRequest";
import type { QuestionQueryRequest } from "../models/QuestionQueryRequest";
import type { QuestionSubmitAddRequest } from "../models/QuestionSubmitAddRequest";
import type { QuestionSubmitQueryRequest } from "../models/QuestionSubmitQueryRequest";
import type { QuestionUpdateRequest } from "../models/QuestionUpdateRequest";
import type { UserAddRequest } from "../models/UserAddRequest";
import type { UserLoginRequest } from "../models/UserLoginRequest";
import type { UserQueryRequest } from "../models/UserQueryRequest";
import type { UserRegisterRequest } from "../models/UserRegisterRequest";
import type { UserUpdateMyRequest } from "../models/UserUpdateMyRequest";
import type { UserUpdateRequest } from "../models/UserUpdateRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class Service {
  /**
   * check
   * @param echostr echostr
   * @param nonce nonce
   * @param signature signature
   * @param timestamp timestamp
   * @returns string OK
   * @throws ApiError
   */
  public static checkUsingGet(
    echostr?: string,
    nonce?: string,
    signature?: string,
    timestamp?: string
  ): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/",
      query: {
        echostr: echostr,
        nonce: nonce,
        signature: signature,
        timestamp: timestamp,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * receiveMessage
   * @returns any OK
   * @throws ApiError
   */
  public static receiveMessageUsingPost(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * uploadFile
   * @param file file
   * @param biz
   * @returns BaseResponse_string_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static uploadFileUsingPost(
    file: Blob,
    biz?: string
  ): CancelablePromise<BaseResponse_string_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/file/upload",
      query: {
        biz: biz,
      },
      formData: {
        file: file,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * @param questionAddRequest questionAddRequest
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static addQuestionUsingPost(
    questionAddRequest: QuestionAddRequest
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/add",
      body: questionAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 删除题目
   * 删除题目
   * @param deleteRequest deleteRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static deleteQuestionUsingPost(
    deleteRequest: DeleteRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/delete",
      body: deleteRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 编辑（用户）
   * 编辑（用户）
   * @param questionEditRequest questionEditRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static editQuestionUsingPost(
    questionEditRequest: QuestionEditRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/edit",
      body: questionEditRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 根据 id 获取
   * 根据 id 获取
   * @param id id
   * @returns BaseResponse_QuestionVO_ OK
   * @throws ApiError
   */
  public static getQuestionVoByIdUsingGet(
    id?: number
  ): CancelablePromise<BaseResponse_QuestionVO_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/question/get/vo",
      query: {
        id: id,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 分页获取题目列表（仅管理员）
   * 分页获取题目列表（仅管理员）
   * @param questionQueryRequest questionQueryRequest
   * @returns BaseResponse_Page_Question_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listQuestionByPageUsingPost(
    questionQueryRequest: QuestionQueryRequest
  ): CancelablePromise<BaseResponse_Page_Question_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/list/page",
      body: questionQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 分页获取列表（封装类）
   * 根据 id 获取
   * @param questionQueryRequest questionQueryRequest
   * @returns BaseResponse_Page_QuestionVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listQuestionVoByPageUsingPost(
    questionQueryRequest: QuestionQueryRequest
  ): CancelablePromise<BaseResponse_Page_QuestionVO_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/list/page/vo",
      body: questionQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 分页获取当前用户创建的资源列表
   * 分页获取当前用户创建的资源列表
   * @param questionQueryRequest questionQueryRequest
   * @returns BaseResponse_Page_QuestionVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listMyQuestionVoByPageUsingPost(
    questionQueryRequest: QuestionQueryRequest
  ): CancelablePromise<BaseResponse_Page_QuestionVO_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/my/list/page/vo",
      body: questionQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 提交题目
   * 提交题目
   * @param questionSubmitAddRequest questionSubmitAddRequest
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static doQuestionSubmitUsingPost(
    questionSubmitAddRequest: QuestionSubmitAddRequest
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/submit/data",
      body: questionSubmitAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 分页获取题目提交列表（除了管理员外，普通用户只能看到非答案、提交代码等公开信息）
   * 分页获取题目提交列表（除了管理员外，普通用户只能看到非答案、提交代码等公开信息）
   * @param questionSubmitQueryRequest questionSubmitQueryRequest
   * @returns BaseResponse_Page_QuestionSubmitVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listQuestionSubmitByPageUsingPost(
    questionSubmitQueryRequest: QuestionSubmitQueryRequest
  ): CancelablePromise<BaseResponse_Page_QuestionSubmitVO_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/submit/list/page",
      body: questionSubmitQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 更新（仅管理员）
   * 更新（仅管理员）
   * @param questionUpdateRequest questionUpdateRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateQuestionUsingPost(
    questionUpdateRequest: QuestionUpdateRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/update",
      body: questionUpdateRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * setMenu
   * @returns string OK
   * @throws ApiError
   */
  public static setMenuUsingGet(): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/setMenu",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 创建用户
   * 创建
   * @param userAddRequest userAddRequest
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static addUserUsingPost(
    userAddRequest: UserAddRequest
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/user/add",
      body: userAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 删除用户
   * 删除
   * @param deleteRequest deleteRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static deleteUserUsingPost(
    deleteRequest: DeleteRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/user/delete",
      body: deleteRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 根据 id 获取用户仅管理员
   * 更新
   * @param id id
   * @returns BaseResponse_SysUser_ OK
   * @throws ApiError
   */
  public static getUserByIdUsingGet(
    id?: number
  ): CancelablePromise<BaseResponse_SysUser_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/user/get",
      query: {
        id: id,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 获取当前登录用户
   * 获取
   * @returns BaseResponse_LoginUserVO_ OK
   * @throws ApiError
   */
  public static getLoginUserUsingGet(): CancelablePromise<BaseResponse_LoginUserVO_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/user/get/login",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 根据 id 获取包装类
   * 获取
   * @param id id
   * @returns BaseResponse_UserVO_ OK
   * @throws ApiError
   */
  public static getUserVoByIdUsingGet(
    id?: number
  ): CancelablePromise<BaseResponse_UserVO_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/user/get/vo",
      query: {
        id: id,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 分页获取用户列表（仅管理员）
   * 分页获取
   * @param userQueryRequest userQueryRequest
   * @returns BaseResponse_Page_SysUser_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listUserByPageUsingPost(
    userQueryRequest: UserQueryRequest
  ): CancelablePromise<BaseResponse_Page_SysUser_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/user/list/page",
      body: userQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 分页获取用户封装列表
   * 分页获取
   * @param userQueryRequest userQueryRequest
   * @returns BaseResponse_Page_UserVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listUserVoByPageUsingPost(
    userQueryRequest: UserQueryRequest
  ): CancelablePromise<BaseResponse_Page_UserVO_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/user/list/page/vo",
      body: userQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 用户登录
   * 登录
   * @param userLoginRequest userLoginRequest
   * @returns BaseResponse_LoginUserVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static userLoginUsingPost(
    userLoginRequest: UserLoginRequest
  ): CancelablePromise<BaseResponse_LoginUserVO_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/user/login",
      body: userLoginRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 用户登录（微信开放平台）
   * 用户登录微信
   * @param code code
   * @returns BaseResponse_LoginUserVO_ OK
   * @throws ApiError
   */
  public static userLoginByWxOpenUsingGet(
    code: string
  ): CancelablePromise<BaseResponse_LoginUserVO_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/user/login/wx_open",
      query: {
        code: code,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 用户注销
   * 注销
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static userLogoutUsingPost(): CancelablePromise<
    BaseResponse_boolean_ | any
  > {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/user/logout",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 注册接口
   * 注册
   * @param userRegisterRequest userRegisterRequest
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static userRegisterUsingPost(
    userRegisterRequest: UserRegisterRequest
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/user/register",
      body: userRegisterRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 更新用户
   * 更新
   * @param userUpdateRequest userUpdateRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateUserUsingPost(
    userUpdateRequest: UserUpdateRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/user/update",
      body: userUpdateRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 更新个人信息
   * 更新
   * @param userUpdateMyRequest userUpdateMyRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateMyUserUsingPost(
    userUpdateMyRequest: UserUpdateMyRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/user/update/my",
      body: userUpdateMyRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
