// 本地缓存服务

const PREFIX = 'hannibal_';

// user 模块 常量
const USER_PREFIX = `${PREFIX}user_`;
const USER_TOKEN = `${USER_PREFIX}token`;
const USER_INFO = `${USER_PREFIX}info`;

// 储存方法
const set = (key, data) => {
  localStorage.setItem(key, data);
};
// 读取方法
const get = (key) => {
  localStorage.getItem(key);
};

// 导出

export default {
  set,
  get,
  USER_TOKEN,
  USER_INFO,
};
