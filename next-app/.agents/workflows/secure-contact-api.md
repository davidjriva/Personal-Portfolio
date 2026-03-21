---
description: Secure Contact API with Rate Limiting & CAPTCHA
---
# Secure Contact API with Rate Limiting & CAPTCHA

This workflow secures the contact form API from automated spam and abuse by adding CAPTCHA verification and robust rate limiting (using Upstash Redis, consistent with the existing chat endpoint).

## Steps

1. **Update Frontend (`ContactForm.js`)**:
   - Integrate the CAPTCHA widget before form submission.
   - Modify the `handleSubmit` function to wait for the CAPTCHA token and include it in the `POST` request to `/api/contact`.
2. **Update Contact API (`/api/contact/route.js`)**:
   - **CAPTCHA Validation**: Validate the CAPTCHA token against the provider's verification endpoint (similar to the token endpoint). Return a `400 Bad Request` or `403 Forbidden` if invalid.
   - **Rate Limiting**: Implement Upstash Redis rate limiting (using `@upstash/redis` like in `chat/route.js`). Apply a strict limit (e.g., 2 emails per IP per hour) to prevent email bombing. Return `429 Too Many Requests` when limits are exceeded.
3. **Environment Variables**: Ensure CAPTCHA keys and UPSTASH Redis variables are referenced correctly.
4. **Testing**: Verify that the form requires CAPTCHA to send and properly handles rate limiting using test submissions via curl or frontend.
