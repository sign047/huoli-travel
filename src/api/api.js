import { http } from "../utils/util";
// httpBase:"http://192.168.10.157:8080/",
// huoLiBase: "http://192.168.10.157:8080/hzgj/"
// httpBase:"http://trip2.133.cn",
// huoLiBase: "http://trip2.133.cn/hzgj/"
const httpBase = "https://travel.huoli.com";
//登录信息
const getLoginfo = params => {
  return http(httpBase + "/hzgj/loginfo", params);
};
// 获取手机号码
const getPhoneNum = params => {
  return http(httpBase + "/hzgj/getPhone", params);
};
// 获取护照列表
const getPassportList = params => {
  return http(httpBase + "/hzgj/getPassPort", params);
};
// 删除护照
const delPassport = params => {
  return http(httpBase + "/hzgj/delPassport", params);
};
// 通过ID 获取护照
const getPassPortById = params => {
  return http(httpBase + "/hzgj/getPassPortById", params);
};
// 修改签证
const upDateVisa = params => {
  return http(httpBase + "/hzgj/updateVisa", params);
};
// 保存签证
const saveVisa = params => {
  return http(httpBase + "/hzgj/saveVisa", params);
};
// 获取签证
const getVisa = params => {
  return http(httpBase + "/hzgj/getVisa", params);
};
//删除签证
const delVisa = params => {
  return http(httpBase + "/hzgj/delVisa", params);
};
//获取资料夹
const getVisaVF = params => {
  return http(httpBase + "/hzgjVisaFile/getVisaVF", params);
};
// 同步数据
const isCompare = params => {
  return http(httpBase + "/hzgjVisaFile/isNeedSynchronize", params);
};
// 同步保存
const saveFile = params => {
  return http(httpBase + "/hzgjVisaFile/saveVisaFile", params);
};
//通过ID 获取资料夹
const getVisaVFById = params => {
  return http(httpBase + "/hzgjVisaFile/getVisaVFById", params);
};
// 获取图片
const getFilePic = params => {
  return http(httpBase + "/hzgjVisaFile/getPicUrl", params);
};
//保存图片
const savePicToDB = params => {
  return http(httpBase + "/hzgjVisaFile/savePicToDB", params);
};

export {
  getLoginfo,
  getPassportList,
  delPassport,
  upDateVisa,
  getPassPortById,
  saveVisa,
  getVisa,
  delVisa,
  getVisaVF,
  isCompare,
  saveFile,
  getVisaVFById,
  getPhoneNum,
  getFilePic,
  savePicToDB
};
