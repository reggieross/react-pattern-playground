import * as faker from "faker";
import { User } from '../components/redux-data/users';

export const mockFakeUserList = (number: number): User[] => {
  let index = number;
  const array = [];
  while (index !== 0) {
    array.push({
      id: faker.datatype.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      age: `${faker.datatype.number({ max: 98, min: 10 })}`,
    });
    index--;
  }

  return array;
};