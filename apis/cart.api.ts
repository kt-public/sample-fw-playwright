import { APIRequestContext } from "@playwright/test";
import { BaseApi } from "./base.api";

export class CartApi extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async clearCart(token: string) {
    const resp = await this.request.put("/api/cart", {
      data: {
        items: [],
      },
      headers: this.getHeaders({ token }),
    });

    const data = await this.getData(resp);
    return data?.ok === "true";
  }
}
