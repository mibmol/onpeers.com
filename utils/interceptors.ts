import { Dispatch } from 'redux';
import { Interceptor, ResponseData } from './JSONFetch'

export function unauthorizedInterceptor(dispatch: Dispatch): Interceptor {
   function checkAuth(data: ResponseData) {
      if (data.status === 401) {
      }
   }
   return {
      alias: 'unauthorized',
      fn: checkAuth,
   };
}
