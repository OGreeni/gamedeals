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

const store = configureStore({ reducer: dealsSlice.reducer });

export const dealsActions = dealsSlice.actions;
export default store;

// multiple reducers:
// const store = configureStore({ reducer: { deals: mainFormSlice.reducer } });
