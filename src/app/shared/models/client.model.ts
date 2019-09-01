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

  public static new(): Client {
    const id = "";
    const firstName = "";
    const lastName = "";
    const company = "";
    const address = "";
    const city = "";
    const state = "";
    const postalCode = "";
    const email = "";
    const fields = [];
    const createdAt = new Date();
    const updatedAt = createdAt;
    const active = true;
    return new Client(
      id,
      firstName,
      lastName,
      company,
      address,
      city,
      state,
      postalCode,
      email,
      fields,
      createdAt,
      updatedAt,
      active
    );
  }
}
