import { APIRequestContext, APIResponse } from "@playwright/test";

interface HeaderProps {
  token: string;
}

export class BaseApi {
  constructor(readonly request: APIRequestContext) {}

  getHeaders({ token }: HeaderProps) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async getData(resp: APIResponse) {
    return await resp.json();
  }

  async getStatus(resp: APIResponse) {
    return await resp.status();
  }
}
