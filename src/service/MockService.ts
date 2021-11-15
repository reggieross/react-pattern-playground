import * as faker from 'faker';
import { mockFakeUserList } from '../mock/mockUsers';
import { User } from '../components/redux-data/users';

export interface Credentials {
  idToken: string;
  accessToken: string;
  refreshToken: string;
}

export interface BaseServiceArgs {
  creds: Credentials;
}

const fetchListItems = async (args: BaseServiceArgs) => {
  console.info(args);
  return new Promise<User[]>(resolve => {
    setTimeout(() => {
      resolve(mockFakeUserList(faker.datatype.number({ max: 50, min: 10 })));
    }, 3000);
  });
};

const fetchListItemsWithError = async (args: BaseServiceArgs) => {
  return new Promise<User[]>((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Something went wrong'));
    }, 3000);
  });
};

export interface SearchUserArgs extends BaseServiceArgs {
  query: string;
}

const searchUsers = async (
  args: SearchUserArgs
): Promise<Record<string, any>> => {
  return new Promise<Record<string, any>>(resolve => {
    setTimeout(() => {
      resolve(args);
    }, 3000);
  });
};

export const MockService = {
  fetchListItems,
  searchUsers,
  fetchListItemsWithError,
};
