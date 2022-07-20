import { configureStore, createSlice } from '@reduxjs/toolkit';

const dealsSlice = createSlice({
  name: 'deals',
  initialState: { userInput: '' },
  reducers: {
    updateInput(state, action) {
      state.userInput = action.payload.userInput;
    },
  },
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false, userId: null },
  reducers: {
    loginUser(state, action) {
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
    },
    logoutUser(state, action) {
      state.isLoggedIn = false;
      state.userId = null;
    },
  },
});

const themeSlice = createSlice({
  name: 'theme',
  initialState: { uiTheme: 'dark' },
  reducers: {
    toggleDarkMode(state, action) {
      if (state.uiTheme === 'dark') {
        state.uiTheme = 'light';
      } else {
        state.uiTheme = 'dark';
      }
    },
  },
});

const store = configureStore({
  reducer: {
    deals: dealsSlice.reducer,
    auth: authSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export const dealsActions = dealsSlice.actions;
export const authActions = authSlice.actions;
export const themeActions = themeSlice.actions;
export default store;
