import * as ObjectID from "bson-objectid";

export class Guid {
  /**
   * Returns a new ObjectId.
   */
  public static new() {
    return ObjectID.default.generate();
  }

  /**
   * Checks if a given value is a valid ObjectId.
   * @param value Value to be compared. Can be an ObjectId or a string.
   */
  public static isGuid(value: any) {
    if (!value) {
      throw new Error("Invalid argument 'value'");
    }
    let stringValue = value;
    if (typeof stringValue !== "string") {
      stringValue = stringValue.toString();
    }
    const isValidObjectId = ObjectID.default.isValid(stringValue);
    if (!isValidObjectId) {
      return false;
    }
    const objectIdValue = new ObjectID.default(stringValue);
    return stringValue === objectIdValue.toString();
  }
}
