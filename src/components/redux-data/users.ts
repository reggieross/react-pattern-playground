import { createAction, createReducer } from '@reduxjs/toolkit';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: string;
}

export type UsersState = User[];
export const setUserResponse = createAction<UsersState>('SET_USER_RESPONSE');

export const usersReducer = createReducer<UsersState>([], builder => {
  builder.addCase(setUserResponse, (state, action) => action.payload);
});
