# Playwright FW Exercises

Project contains Playwright FW exercises

- [Swagger UI](https://testing.platformforge.dev/api-docs)

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Run all tests

   ```bash
   npm run test:all
   ```

3. Run tests by Playwright UI

   ```bash
   npm run test:ui
   ```

4. Show test report

   - Show playwright report

   ```bash
   npm run report:html
   ```

   - Show allure report
   ```bash
   npm run report:allure:open
   ```

## Test cases

1. Login fail - [login.spec.ts](./tests/login.spec.ts)

2. Add single product to cart - [cart.spec.ts](./tests/cart.spec.ts)

3. Checkout with valid receiver information - [checkout.spec.ts](./tests/checkout.spec.ts)

4. Update full name in profile - [profile.spec.ts](./tests/profile.spec.ts)




