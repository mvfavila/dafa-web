import { Guid } from "../guid";

export class AlertType {
  constructor(
    public _id: string,
    public name: string,
    public numberOfDaysToWarning: string,
    public createdAt: Date,
    public updatedAt: Date,
    public active: boolean
  ) {}

  public static new(): AlertType {
    const id = Guid.new();
    const name = "";
    const numberOfDaysToWarning = "";
    const createdAt = new Date();
    const updatedAt = createdAt;
    const active = true;
    return new AlertType(
      id,
      name,
      numberOfDaysToWarning,
      createdAt,
      updatedAt,
      active
    );
  }
}
