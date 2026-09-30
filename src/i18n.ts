import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

void i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
        lng: "en",

        fallbackLng: "en",

        supportedLngs: [
            "tr",
            "en",
        ],

        defaultNS: "common",

        ns: [
            "common",
            "sidebar",
            "dashboard",
            "projects",
            "tasks",
            "users",
        ],

        backend: {
            loadPath:
                "/locales/{{lng}}/{{ns}}.json", //aktif dilin yerlesecegi bolum 
        },

        interpolation: {
            escapeValue: false,
        },
    })
i18n.on("languageChanged", (language) => {
    document.documentElement.lang = language;
});
document.documentElement.lang = "en";

export default i18n
