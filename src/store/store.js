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
  initialState: { isLoggedIn: false },
  reducers: {
    loginUser(state, action) {
      state.isLoggedIn = true;
    },
    logoutUser(state, action) {
      state.isLoggedIn = false;
    },
  },
});

const store = configureStore({
  reducer: { deals: dealsSlice.reducer, auth: authSlice.reducer },
});

export const dealsActions = dealsSlice.actions;
export const authActions = authSlice.actions;
export default store;

// multiple reducers:
// const store = configureStore({ reducer: { deals: mainFormSlice.reducer } });
