const ApiConfig = {
    PROTOCOL: 'http',
    HOST: 'localhost',
    PORT: '3001'
};
export default ApiConfig;
export function getBaseUrl() {
    return `${ApiConfig.PROTOCOL}://${ApiConfig.HOST}:${ApiConfig.PORT}`;
};