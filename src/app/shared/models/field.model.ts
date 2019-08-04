import { Event } from "./event.model";

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
}
