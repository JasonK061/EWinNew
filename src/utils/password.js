import JSEncrypt from 'jsencrypt';
const key = `
-----BEGIN PUBLIC KEY-----
MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQB6xk9PFMBan67XoUDBiDE4
gdN959wPySeAmfiIHpG04tDzzA0Oupf2554h7x0B1MD9LNCdpDORDhRkfWOSic+F
0mLIATehD2Aab4FbDsMH/VYVdzp1awF6y39Wh/ZMLygEr6E7Vh8UeYDKrG12OfFY
27Xx9QTM0w5WXQv4SwTOvVl4W5cyGyBTT10dycfa+3UD2CaIzD7Sf8Wa2AmocRCD
jFLuy73IqlWznPIpQo5ImGWNCq0u3pPdvI8p3qVuzurxI2GyVCXWGsfEkj/keBvR
skA5o8t4oOTUdGePsyzf+WwcP76+gqvCGIajXCf/NjqP1tand5xOKMj0YGpB/8Jf
AgMBAAE=
-----END PUBLIC KEY-----`
// console.log('qqq', process.env.REACT_APP_LOGIN_PUBLICEKET, key === process.env.REACT_APP_LOGIN_PUBLICEKET);
const encrypt = new JSEncrypt();
encrypt.setPublicKey(key);
/**
 * 加密資料，主要是帳密資料
 * @param {Object} userInfo 要加密的資料
 */
export const encrypted = (userInfo = {}) => {
    return encrypt.encrypt(JSON.stringify(userInfo));
};