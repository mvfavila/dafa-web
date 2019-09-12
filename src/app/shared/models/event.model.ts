import { EventType } from "./eventType.model";
import { Guid } from "../guid";

export class Event {
  constructor(
    public _id: string,
    public date: Date,
    public eventType: string,
    public field: string,
    public createdAt: Date,
    public updatedAt: Date,
    public active: boolean
  ) {}

  public static new(): Event {
    const id = Guid.new();
    const date = new Date();
    const eventType = Guid.new();
    const field = "";
    const createdAt = new Date();
    const updatedAt = createdAt;
    const active = true;
    return new Event(id, date, eventType, field, createdAt, updatedAt, active);
  }
}
