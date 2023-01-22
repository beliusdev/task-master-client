import http from '../utils/http';

export default class UserApi {
  static register(userInfo) {
    return http().post('/user/register', userInfo);
  }

  static login(userInfo) {
    return http().post('/user/login', userInfo);
  }

  static getUser() {
    return http(true).get('/user');
  }

  static deleteUser(password) {
    return http(true).delete('/user/delete', {
      data: { password },
    });
  }
}
