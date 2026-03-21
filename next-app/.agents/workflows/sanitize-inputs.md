---
description: Sanitize Inputs to Prevent HTML Injection
---
# Sanitize Inputs to Prevent HTML Injection

This workflow cleans up incoming user input to prevent HTML or script injection, primarily focusing on the contact form where the input is inserted directly into an HTML email template.

## Steps

1. **Install Sanitization Library**: Install a reliable HTML sanitizer like `sanitize-html` (`npm install sanitize-html`) or utilize a lightweight escaping function.
2. **Update Contact API (`/api/contact/route.js`)**:
   - Import the sanitizer.
   - Before inserting the `message`, `subject` or `name` into the email `html` body, sanitize the string to strip all HTML tags (e.g., `sanitizeHtml(message, { allowedTags: [], allowedAttributes: {} })`).
3. **Update Chat API Validation (`/api/chat/route.js`)**:
   - Provide elementary sanitization to limit excessive inputs or handle unknown encoding strings safely before communicating with the OpenAI model.
4. **Testing**: Try sending a contact message containing malicious vectors like `<script>alert(1)</script>` and verify it arrives as safe text without executing code blocks or rendering inline HTML structures on the email end.
