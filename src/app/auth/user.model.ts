export class User {
  constructor(
    public email: string,
    private tokenValue: string,
    private tokenExpirationDate: Date,
    private roles: []
  ) {}

  get token() {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }
    return this.tokenValue;
  }
}
