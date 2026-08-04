import { APIRequestContext } from "@playwright/test";

export class LoginApi {
  constructor(private request: APIRequestContext) {}

  async getAuthToken(userName: string, password: string) {
    const resp = await this.request.post("/api/auth/login", {
      data: {
        username: userName,
        password: password,
      }
    });
    const data = await resp.json()
    return data.token
  }
}
