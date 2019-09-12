import { Event } from "./event.model";
import { Guid } from "../guid";

export class Field {
  constructor(
    public _id: string,
    public name: string,
    public description: string,
    public email: string,
    public address: string,
    public city: string,
    public state: string,
    public postalCode: string,
    public events: Event[],
    public client: string,
    public createdAt: Date,
    public updatedAt: Date,
    public active: boolean
  ) {}

  public static new(): Field {
    const id = Guid.new();
    const name = "";
    const description = "";
    const email = "";
    const address = "";
    const city = "";
    const state = "";
    const postalCode = "";
    const events = [];
    const client = "";
    const createdAt = new Date();
    const updatedAt = createdAt;
    const active = true;
    return new Field(
      id,
      name,
      description,
      email,
      address,
      city,
      state,
      postalCode,
      events,
      client,
      createdAt,
      updatedAt,
      active
    );
  }
}
