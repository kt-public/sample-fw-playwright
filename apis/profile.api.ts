import { APIRequestContext } from "@playwright/test";
import { BaseApi } from "./base.api";

export class ProfileApi extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async updateProfile(name: string, token: string) {
    const resp = await this.request.patch("/api/profile", {
      data: {
        name,
      },
      headers: this.getHeaders({ token }),
    });

    const status = await this.getStatus(resp);
    return status === 200;
  }
}
