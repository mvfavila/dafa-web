import { Action, createReducer, on } from "@ngrx/store";

import { Client } from "../../shared/models/client.model";
import * as ClientsActions from "../store/client.actions";

export interface State {
  clients: Client[];
}
const initialState: State = { clients: [] };

export function clientReducer(
  clientState: State | undefined,
  clientAction: Action
) {
  return createReducer(
    initialState,
    on(ClientsActions.addClient, (state, action) => ({
      ...state,
      clients: state.clients.concat({ ...action.client })
    })),
    on(ClientsActions.updateClient, (state, action) => ({
      ...state,
      clients: state.clients.map((client, index) =>
        index === action.index ? { ...action.client } : client
      )
    })),
    on(ClientsActions.deleteClient, (state, action) => ({
      ...state,
      clients: state.clients.filter((client, index) => index !== action.index)
    })),
    on(ClientsActions.setClients, (state, action) => ({
      ...state,
      clients: [...action.clients]
    }))
  )(clientState, clientAction);
}
