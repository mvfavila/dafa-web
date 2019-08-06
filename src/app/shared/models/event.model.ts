import { EventType } from "./eventType.model";

export class Event {
  constructor(
    public _id: string,
    public date: Date,
    public eventType: EventType,
    public field: string,
    public createdAt: Date,
    public updatedAt: Date,
    public active: boolean
  ) {}
}
