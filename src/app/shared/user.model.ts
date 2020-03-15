
export class AuthUser {
    constructor(
      public userName: string,
      public userId: number,
      private _expirationDate: Date,
      private _token: string) {}

      get token() {
        if (!this._expirationDate || new Date() > this._expirationDate) {
          return null;
        }
        return this._token;
      }
}
