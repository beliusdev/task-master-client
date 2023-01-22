import http from '../utils/http';

export default class TodoApi {
  static getTodos() {
    return http(true).get('/todo');
  }

  static createTodo(todoInfo) {
    return http(true).post('/todo/create', todoInfo);
  }

  static complete(todoId) {
    return http(true).patch(`/todo/${todoId}/complete`);
  }

  static deleteTodo(todoId) {
    return http(true).delete(`/todo/${todoId}/delete`);
  }
}
