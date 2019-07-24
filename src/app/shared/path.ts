import { environment } from "src/environments/environment";

export const usersUrl = {
  LOGIN: `${environment.apiUrl}/users/login`
};

export const clientsUrl = {
  GET_ALL: `${environment.apiUrl}/clients`,
  POST: `${environment.apiUrl}/clients`
};