import * as request from '../utils/request'

let api = '';
// let apiData = '/data';

// 获取全国JSON
export const getChinaJson = (params) => request.get(api+`/map/china.json`, params);

// 获取省JSON
export const getProvinceJSON = (path,params) => request.get(api+`/map/province/${path}.json`, params);

// 获取市JSON
export const getCityJSON = (path,params) => request.get(api+`/map/city/${path}.json`, params);

// 获取天气
// export const getWeather = (params) => request.get(`https://api.asilu.com/weather_v2/`, params);

//获取全国网馈线数据
export const getFeeder = (params) => request.post(api+`/result/feeder/find`, params);

//获取全国网配变数据
export const getTansformer = (params) => request.post(api+`/result/transformer/find`, params);

//馈线状态异常排名前五
export const getFeederFive = (params) => request.post(api+`/result/feeder/find/five`, params);
//配变状态异常排名前五
export const getTransformerFive = (params) => request.post(api+`/result/transformer/find/five`, params);
