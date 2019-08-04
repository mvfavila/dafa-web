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
}
