import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = { userInput: '' };

const mainFormSlice = createSlice({
  name: 'main form',
  initialState,
  reducers: {
    updateInput(state, action) {
      state.userInput = action.payload.userInput;
    },
  },
});

const store = configureStore({ reducer: mainFormSlice.reducer });

export const mainFormActions = mainFormSlice.actions;
export default store;

// multiple reducers:
// const store = configureStore({ reducer: { mainForm: mainFormSlice.reducer } });
