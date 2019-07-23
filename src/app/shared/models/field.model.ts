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
    public createdAt: Date,
    public updatedAt: Date,
    public active: boolean,
    public client: string
  ) {}
}
