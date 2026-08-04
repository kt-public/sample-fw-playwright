import { APIRequestContext } from "@playwright/test";

export class ProfileApi {
  constructor(private request: APIRequestContext) {}

  async updateProfile(name: string, token: string) {
    const resp = await this.request.patch("/api/profile", {
      data: {
        name
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const status = await resp.status();
    return status === 200;
  }
}
