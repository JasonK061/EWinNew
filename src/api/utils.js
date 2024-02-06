/**
 * 動態替換 url
 *  */
export const urlReplace = (url, obj) => {
    let checkUrl = typeof url === 'string' && url.length !== 0;
    let checkObj = typeof obj === 'object' && !Array.isArray(obj) && Object.keys(obj).length !== 0;
    if (checkUrl && checkObj) {
        Object.keys(obj).forEach(i => {
            let regExp = new RegExp(`{${i}}`, 'g');
            let replaceText = obj[i];
            url = url.replace(regExp, replaceText);
        });
        return url;
    } else {
        console.error(`${url}: urlReplace error: api 傳送格式有誤，請確認`);
    }
};

/**
 * 動態替換 device url
 */
export const urlDevice = url => {
    // return store.getters.isMobile ? `/m${url}` : `/pc${url}`;
    return `/pc${url}`;
};