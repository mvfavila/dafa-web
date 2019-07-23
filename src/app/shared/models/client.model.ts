import { Field } from "./field.model";

export class Client {
  constructor(
    public _id: string,
    public firstName: string,
    public lastName: string,
    public company: string,
    public address: string,
    public city: string,
    public state: string,
    public postalCode: string,
    public email: string,
    public fields: Field[],
    public createdAt: Date,
    public updatedAt: Date,
    public active: boolean
  ) {}
}
