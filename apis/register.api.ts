import { APIRequestContext } from "@playwright/test";
import { BaseApi } from "./base.api";

export class RegisterApi extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async registerAccount(username: string, password: string, name: string) {
    const resp = await this.request.post("/api/auth/register", {
      data: {
        username,
        password,
        name,
      },
    });

    const status = await this.getStatus(resp);
    return status === 201;
  }
}
