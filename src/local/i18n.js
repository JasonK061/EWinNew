import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EN from './en_gb.json';
import CN from './zh_cn.json';
import TW from './zh_tw.json';

const resources = {
    "en_GB": {
        translation: EN
    },
    "zh_CN": {
        translation: CN
    },
    "zh_TW": {
        translation: TW
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lang: "zh_TW", // 預設語言
        fallbackLng: 'zh_TW', // 如果當前切換的語言沒有對應的翻譯則使用這個語言，

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
