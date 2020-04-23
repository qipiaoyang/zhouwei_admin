
var VUE_APP_BASE_API = "";

switch (process.env.VUE_APP_ENV) {
    case "dev":
        VUE_APP_BASE_API = 'http://47.75.78.93/';
        break;
    case "test":
        VUE_APP_BASE_API = "http://47.75.78.93/";
        break;
    case "prod":
        VUE_APP_BASE_API = "https://yx-test.lemonbus.cn";
        break;
    default:
        VUE_APP_BASE_API = "https://yx.lemonbus.cn";
}

module.exports = {
    VUE_APP_BASE_API,
    VUE_APP_UPLOAD_URL: VUE_APP_BASE_API + '/admin/upload/articleImage'
}
