export class AppConfig {
    //测试环境URL
    public static getDebugUrl() {
        return "http://192.168.1.106:8080/meeting/a/meeting/mobile/tbMobile";
    }
    //生产环境变量
    public static getProdUrl(){
        return "";
    }
    //获取当前环境URL
    public static getCurrentUrl(){
        return this.getDebugUrl();
    }
}