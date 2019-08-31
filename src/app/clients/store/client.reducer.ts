import { Action, createReducer, on } from "@ngrx/store";

import { Client } from "../../shared/models/client.model";
import * as ClientsActions from "../store/client.actions";

export interface State {
  clients: Client[];
  addClient(newClient: Client): Client[];
  updateClient(clientIndex: number, newClient: Client): Client[];
  removeClient(clientId: string): Client[];
  removeClientByIndex(clientIndex: number): Client[];
}
const initialState: State = {
  clients: [],

  // state operations
  addClient(newClient: Client) {
    return this.clients.concat({ ...newClient });
  },
  updateClient(clientIndex: number, newClient: Client): Client[] {
    console.log(`Looking for client to update...`);
    return this.clients.map((client: Client, index: number) => {
      console.log(`Found client to update`);
      return index === clientIndex ? { ...newClient } : client;
    });
  },
  removeClient(clientId: string): Client[] {
    return this.clients.filter((client: Client) => {
      return client._id !== clientId;
    });
  },
  removeClientByIndex(clientIndex: number): Client[] {
    return this.clients.filter(
      (_: Client, index: number) => index !== clientIndex
    );
  }
};

export function clientReducer(
  clientState: State | undefined,
  clientAction: Action
) {
  return createReducer(
    initialState,
    on(ClientsActions.addClient, (state, action) => ({
      ...state,
      clients: state.addClient(action.client)
    })),
    on(ClientsActions.addClientFailure, (state, action) => ({
      ...state,
      clients: state.removeClient(action.client._id)
    })),
    on(ClientsActions.updateClient, (state, action) => ({
      ...state,
      clients: state.updateClient(action.index, action.client)
    })),
    on(ClientsActions.deleteClient, (state, action) => ({
      ...state,
      clients: state.removeClientByIndex(action.index)
    })),
    on(ClientsActions.setClients, (state, action) => ({
      ...state,
      clients: [...action.clients]
    }))
  )(clientState, clientAction);
}
