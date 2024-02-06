import { promiseHandle } from 'api/promiseHandle';
import { urlReplace, urlDevice } from 'api/utils';

export function getApiMenu(params = {}) {
    return promiseHandle({
        apiName: 'getApiMenu',
        url: urlDevice('/menus'),
        method: 'get',
        params,
    });
}