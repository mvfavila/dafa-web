import { environment } from "src/environments/environment";

const USERS_PATH = `${environment.apiUrl}/users`;
export const usersUrl = {
  LOGIN: `${USERS_PATH}/login`
};

const CLIENTS_PATH = `${environment.apiUrl}/clients`;
export const clientsUrl = {
  DEFAULT: CLIENTS_PATH,
  GET_ALL: CLIENTS_PATH,
  POST: CLIENTS_PATH,
  PUT: CLIENTS_PATH
};

const FIELDS_PATH = `${environment.apiUrl}/fields`;
export const fieldsUrl = {
  GET_ALL: FIELDS_PATH,
  POST: FIELDS_PATH,
  PUT: FIELDS_PATH
};

const EVENTS_PATH = `${environment.apiUrl}/events`;
export const eventsUrl = {
  GET_ALL: EVENTS_PATH,
  POST: EVENTS_PATH,
  PUT: EVENTS_PATH
};

const EVENT_TYPES_PATH = `${environment.apiUrl}/eventTypes`;
export const eventTypesUrl = {
  GET_ALL: EVENT_TYPES_PATH,
  POST: EVENT_TYPES_PATH,
  PUT: EVENT_TYPES_PATH
};

const ALERT_TYPES_PATH = `${environment.apiUrl}/alertTypes`;
export const alertTypesUrl = {
  GET_ALL: ALERT_TYPES_PATH,
  POST: ALERT_TYPES_PATH,
  PUT: ALERT_TYPES_PATH
};
