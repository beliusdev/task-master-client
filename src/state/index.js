import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  todos: null,
  message: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setTodos: (state, action) => {
      if (!action.payload) {
        state.todos = action.payload;
      } else {
        const sortedTodos = [...action.payload].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        state.todos = sortedTodos;
      }
    },

    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setUser, setTodos, setMessage } = authSlice.actions;
export default authSlice.reducer;
