const ApiConfig = {
    PROTOCOL: 'http',
    HOST: '172.16.4.82',//'10.182.1.55',
    PORT: '3001'
};
export default ApiConfig;
export function getBaseUrl() {
    return `${ApiConfig.PROTOCOL}://${ApiConfig.HOST}:${ApiConfig.PORT}`;
};