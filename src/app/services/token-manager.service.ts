import { Injectable } from '@angular/core';

@Injectable()
export class TokenManager {

  private tokenKey: string = 'app_token';

  /**************************/
  /*  interface
  /**************************/

  /*  Check if a token exists in the local storage.

      PARAMS
        none

      RETURN
        (boolean) true if exists, false otherwise
  */
  public doesTokenExist(): boolean {
    try {
      this.retrieve();
      return true;
    } catch(err) {
      return false;
    }
  }

  /*  Store a token in the local storage.

      PARAMS
        token (string): token to store

      RETURN
        none
  */
  public storeToken(token: string): void {
    this.store(token);
  }

  /*  Retrieve a token from the local storage.

      PARAMS
        none

      RETURN
        (string) retrieved token or null if doesnt exist
  */
  public retrieveToken(): string {
    let token = null;

    try {
      let storedToken = this.retrieve();
      token = storedToken;
    } catch(err) { }

    return token;
  }

  /*  Remove a token from the local storage.

      PARAMS
        none

      RETURN
        none
  */
  public removeToken() {
    this.remove();
  }

  /**************************/
  /*  internal functions
  /**************************/

  /*  Store a token in the local storage.

      PARAMS
        token (string): token to store

      RETURN
        none
  */
  private store(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /*  Retrieve a token from the local storage.

      PARAMS
        none

      RETURN
        (string) retrieved token
  */
  private retrieve(): string {
    let storedToken: string = localStorage.getItem(this.tokenKey);
    if(!storedToken) throw 'no token found';
    return storedToken;
  }

  /*  Remove a token from the local storage.

      PARAMS
        none

      RETURN
        none
  */
  private remove(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
