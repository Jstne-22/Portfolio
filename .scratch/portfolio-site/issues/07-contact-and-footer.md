# 07: Contact and footer

**What to build:** A Visitor reaches a "Let's Work Together" Section with:
- the Owner's email, GitHub and location (Calbayog City, Philippines)
- an email button
- a form (Name, Email, Subject, Message) that checks the input and, on a valid submit, opens the Visitor's own email app with a pre-filled message to the Owner
- helper text saying plainly that the form opens the Visitor's email app and isn't sent by the website

A footer shows the Owner's name and the year.

**Blocked by:** 01 (Project skeleton with working sidebar navigation)

**Status:** done

- [x] Contact info and the email button use the configured values (`dump9825@gmail.com`)
- [x] Validation: all fields required, email well-formed, message has a minimum length; inline errors are announced to assistive technology
- [x] A valid submit navigates to a `mailto:` URL with the configured address, the encoded subject, and a body containing name, email and message
- [x] No network requests, credentials or secrets
- [x] Footer with the Owner's name and the current year
- [x] Tests: an empty submit shows per-field errors; an invalid email shows an email error; a valid submit produces the expected `mailto:` URL
