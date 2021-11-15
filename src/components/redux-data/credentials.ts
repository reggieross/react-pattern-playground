import { createAction, createReducer } from '@reduxjs/toolkit';
import { Credentials } from '../../service/MockService';

export type CredentialsInitState = Credentials | 'NOT_INITIALIZED'
const setCredentials = createAction<Credentials>('setCreds');

export const credentialsReducer = createReducer<CredentialsInitState>('NOT_INITIALIZED', builder => {
  builder.addCase(setCredentials, (state, action) => action.payload);
});
