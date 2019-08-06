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
}
