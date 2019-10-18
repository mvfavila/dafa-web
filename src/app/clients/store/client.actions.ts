import { createAction, props } from "@ngrx/store";
import { Client } from "../../shared/models/client.model";

export const addClient = createAction(
  "[Client] Add Client",
  props<{ client: Client }>()
);

export const addClientFailure = createAction(
  "[Client] Add Client - Failure",
  props<{ client?: Client; errorMessage: string; originalError?: Error }>()
);

export const updateClient = createAction(
  "[Client] Update Client",
  props<{ index: number; client: Client }>()
);

export const updateClientFailure = createAction(
  "[Client] Update Client - Failure",
  props<{ client?: Client; errorMessage: string; originalError?: Error }>()
);

export const deleteClient = createAction(
  "[Client] Delete Client",
  props<{ index: number }>()
);

export const setClients = createAction(
  "[Client] Set Clients",
  props<{ clients: Client[] }>()
);

export const fetchClients = createAction("[Client] Fetch Clients");

export const fetchClientsFailure = createAction(
  "[Client] Fetch Clients - Failure",
  props<{ errorMessage: string; originalError?: Error }>()
);
