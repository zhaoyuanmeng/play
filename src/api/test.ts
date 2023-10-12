import { useAxios } from '@vueuse/integrations/useAxios';
import axios, { AxiosRequestConfig } from 'axios';
// import Toast from 'vant/lib/toast';

// create an axios instance
const instance = axios.create({
  withCredentials: false,
  timeout: 5000,
  // 这个可以根据环境变量进行配置
  baseURL: './',
});

// request interceptor
instance.interceptors.request.use(
  (config) => {
    // do something before request is sent
    // const token = store.state.user.token;

    // if (token) {
    //   // let each request carry token
    //   config.headers = {
    //     ...config.headers,
    //     Authorization: `Bearer ${token}`
    //   };
    // }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
instance.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;
    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      console.warn(res.msg);
      // 412: Token expired;
      if (res.code === 412) {
        // store.dispatch('user/userLogout');
      }
      return Promise.reject(res.msg || 'Error');
    } else {
      return res;
    }
  },
  (error) => {
    console.log('err' + error);
    console.warn(error.message);
    return Promise.reject(error.message);
  },
);

/**
 * reactive useFetchApi
 */

export default function useAxiosApi(url: string, config: AxiosRequestConfig) {
  return useAxios(url, config, instance);
}

export function testApi() {
  return axios.get(
    'https://restapi.amap.com/v3/geocode/regeo?platform=JS&s=rsv3&logversion=2.0&key=89a304b584bb422b440798b454a02c6c&sdkversion=2.0.5.16&appname=http%253A%252F%252F192.168.239.168%253A5174%252F%2523%252Fmain&csid=EC586FB0-96E9-47A1-A0BB-36C87B53E350&jscode=42505e65c477d342a213af055dbc92e7&key=89a304b584bb422b440798b454a02c6c&s=rsv3&language=zh_cn&location=115.863072,39.047155&extensions=all&callback=jsonp_925310_1694180122551_',
  );
}
