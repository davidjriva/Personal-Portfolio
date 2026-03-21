---
description: Secure Token Generation & Chat API with CAPTCHA
---
# Secure Token Generation & Chat API with CAPTCHA

This workflow implements CAPTCHA (e.g., Cloudflare Turnstile or Google reCAPTCHA v3) to protect the Chat API from unauthorized bot access. Currently, the token generation relies solely on an easily-spoofed origin header, leaving the API vulnerable to abuse.

## Steps

1. **Install CAPTCHA Library**: Determine which CAPTCHA to use (e.g., `@marsidev/react-turnstile` for Turnstile) and install the necessary package.
2. **Update Frontend (`useChat.js` and `ChatBox.js` or equivalent)**:
   - Integrate the CAPTCHA widget into the chat interface initialization phase.
   - Modify `useChat.js` to accept the CAPTCHA token and include it in the POST request to `/api/token`.
3. **Modify Token API (`/api/token/route.js`)**:
   - Change the route handler from a `GET` request to a `POST` request.
   - Extract the CAPTCHA token from the request body.
   - Validate the CAPTCHA token against the provider's verification endpoint.
   - If invalid, return a `403 Forbidden` response.
   - If valid, generate and return the short-lived JWT as before.
4. **Environment Variables**: Add placeholder environment variables for the CAPTCHA site key and secret key if not present (the user must provision these).
5. **Testing**: Run `npm run build` and ensure the application compiles correctly with these changes. Use a browser to verify the chat initialization flow works with the CAPTCHA.
