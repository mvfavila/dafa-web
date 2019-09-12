import { Guid } from "../guid";

export class EventType {
  constructor(
    public _id: string,
    public name: string,
    public description: string,
    public alertTypes: [],
    public createdAt: Date,
    public updatedAt: Date,
    public active: boolean
  ) {}

  public static new(): EventType {
    const id = Guid.new();
    const name = "";
    const description = "";
    const alertTypes: [] = [];
    const createdAt = new Date();
    const updatedAt = createdAt;
    const active = true;
    return new EventType(
      id,
      name,
      description,
      alertTypes,
      createdAt,
      updatedAt,
      active
    );
  }
}
