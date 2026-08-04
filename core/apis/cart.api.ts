import { APIRequestContext } from "@playwright/test";

export class CartApi {
  constructor(private request: APIRequestContext) {}

  async clearCart(token: string) {
    const resp = await this.request.put("/api/cart", {
      data: {
        items: [],
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await resp.json();
    return data?.ok === "true";
  }
}
