import { Service } from 'egg';

export interface Response<T> {
  status: {
    code: number;
    message: string;
    description: string;
  };
  result?: T;
}

export default class ResponseService extends Service {
  /**
   * 成功时候的响应
   * @param body
   * @return {Response}
   */
  responseSuccess<T>(body?: T): Response<T> {
    return {
      status: {
        code: 0,
        message: '',
        description: '成功'
      },
      result: body
    };
  }

  /**
   * 失败时候的响应
   * @param {string | {code?: number; message: string; description?: string}} o
   * @return {Response}
   */
  responseFail(
    o: string | { code?: number; message: string; description?: string }
  ): Response<void> {
    if (typeof o === 'string') {
      return {
        status: {
          code: -1,
          message: o,
          description: '未知错误'
        }
      };
    } else {
      return {
        status: {
          code: o.code === undefined ? -1 : o.code,
          message: o.message,
          description: o.description === undefined ? '' : o.description
        }
      };
    }
  }

  /**
   * 非法参数
   */
  responseInvalidateParams(): Response<void> {
    return this.responseFail({
      code: -1,
      message: 'Invalidate params',
      description: '非法参数'
    });
  }

  /**
   * 权限不足
   */
  responseNoAuth(): Response<void> {
    return this.responseFail({
      code: 401,
      message: 'No auth',
      description: '权限不足'
    });
  }

  /**
   * 用户不存在
   */
  responseAccountNotExist(): Response<void> {
    return this.responseFail({
      code: 1000,
      message: 'Account not exist',
      description: '用户不存在'
    });
  }

  /**
   * 服务器不存在
   */
  responseServerNotExist(): Response<void> {
    return this.responseFail({
      code: 2000,
      message: 'Server not exist',
      description: '服务器不存在'
    });
  }
}
