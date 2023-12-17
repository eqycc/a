import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';
import { ContentTypeEnum } from '@/enums/httpEnum';
import qs from 'qs';

enum Api {
  Login = '/connect/token',
  GetUserInfo = '/connect/userinfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      headers: {
        'Content-Type': ContentTypeEnum.FORM_URLENCODED,
      },
      params: {
        grant_type: 'password',
        client_id: 'Fix_App',
        scope: 'email phone profile roles  Fix',
        username: params.username,
        password: params.password,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { indices: false });
      },
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.post({
    url: Api.Login,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
    params: {
      grant_type: 'password',
      client_id: 'Fix_App',
      scope: 'email phone profile roles  Fix',
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { indices: false });
    },
  });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
