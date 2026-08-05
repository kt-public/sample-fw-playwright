import { APIRequestContext } from "@playwright/test";
import { BaseApi } from "./base.api";

export class LoginApi extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async getAuthToken(userName: string, password: string) {
    const resp = await this.request.post("/api/auth/login", {
      data: {
        username: userName,
        password: password,
      },
    });
    const data = await this.getData(resp);
    return data.token;
  }
}
