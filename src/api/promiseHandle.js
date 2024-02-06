import Axios from 'axios';

const axios = Axios.create({
    baseURL: '/api',
    timeout: 30000,
    withCredentials: true,
})
axios.interceptors.request.use(
    config => {
        config.headers = {
            // Authorization: 'token ' + store.getters.token,
            Authorization: 'token ' + null,
            'content-type': 'application/json; charset=UTF-8',
            Accept: 'application/json; charset=UTF-8',
            // 'x-lang': app.$store.getters.locale,
            'x-lang': 'zh-CN',
        };
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error.response);
    }
);

/**
 * promiseHandle
 * 處理 api device url
 * 處理全局錯誤
 */
export const promiseHandle = async ({ apiName, url, method, data, params }) => {
    const resultData = await axios({ url, method, data, params })
        .then(response => {
            // DODO 處理 api 回傳格式不依
            if (
                apiName === 'getApiBoardList' ||
                apiName === 'getApiSpotlights' ||
                apiName === 'getApiAnnouncementList' ||
                apiName === 'getApiGameList' ||
                apiName === 'getApiGame' ||
                apiName === 'getApiGamePromo' ||
                apiName === 'getApiConfigure'
            ) {
                return { status: response.status, result: response.data };
            }
            return { status: response.status, ...response.data };
        })
    return resultData;
};
