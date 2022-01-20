import request from '@/utils/request';
// 用户注册
const register = ({ name, telephone, password }) => request.post('auth/register', { name, telephone, password });
const info = () => request.get('auth/info');
const login = ({ telephone, password }) => request.post('auth/login', { telephone, password });

export default {
  register,
  info,
  login,
};
