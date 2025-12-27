# Facebook_Graph_API
Group project for Facebook Graph API

# Facebook Graph API Integration Project

# Group Members & Roles

| Name                    | Role                               |
| Llena,  John Patrick B. | API & Authentication Handler       |
|                         | GitHub & Documentation Manager     |
| Versoza, Jhon Paul D.   | JavaScript Logic / Data Processing |
| Dumaquit, Rachelle Ann  | UI & CSS Designer                  |


# 1. Base URL
https://graph.facebook.com/

# 2. Endpoints Used

| Endpoint      | Description                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------------- |
| `/me`         | Retrieves the logged-in user’s profile information, including name, email, gender, birthday, location, and friends. |
| `/me/picture` | Fetches the profile picture of the user in the specified size.                                                      |
| `/me/friends` | Returns a list of the user’s friends who also use the app, along with a total count.                                |

# 3. Required Parameters

* `access_token` (query parameter) — OAuth 2.0 token obtained after login.
* `fields` (query parameter) — Specifies which profile fields to retrieve (`id,name,email,gender,birthday,location,friends,picture.width(200).height(200)`).

# 4. Authentication

* **Method:** OAuth 2.0
* Users must login through Facebook and grant the app the requested permissions (`public_profile,email,user_friends,user_location`).
* Access tokens are used in the request URL to authenticate API calls.

# 5. Sample JSON Response

```json
{
  "id": "1234567890",
  "name": "John Doe",
  "email": "johndoe@example.com",
  "gender": "male",
  "birthday": "01/01/1990",
  "location": { "name": "Manila, Philippines" },
  "friends": { "summary": { "total_count": 120 } },
  "picture": { "data": { "url": "https://example.com/profile.jpg" } }
}
```

Displayed on UI:

* Profile picture (`picture.data.url`)
* Name (`name`)
* Email (`email`)
* ID (`id`)
* Gender (`gender`)
* Birthday (`birthday`)
* Location (`location.name`)
* Friends count (`friends.summary.total_count`)

# 6. API Testing Using POSTMAN

* **Authentication Setup:** Bearer token using the access token obtained via OAuth 2.0.
* **Headers:** `Authorization: Bearer <access_token>`
* **Parameters:** `fields=id,name,email,gender,birthday,location,friends,picture.width(200).height(200)`
* **Successful Response:** Returns 200 OK with user profile JSON.
* **Error Responses:**

  * 401 Unauthorized — Invalid or expired token
  * 403 Forbidden — Permission denied
  * 404 Not Found — Endpoint not found
  * 429 Too Many Requests — Rate limit exceeded

> All endpoints were tested and validated in Postman before JavaScript integration.

# 7. Fetching Data (JavaScript)

* Uses `fetch()` with `async/await`.
* Modular functions:

  * `fetchProfile(token)` — Retrieves user profile data.
  * `getAccessToken()` — Extracts token from URL hash.

# 8. Display Data in HTML (DOM)

* Profile information is dynamically rendered using DOM manipulation:

  * Cards for profile info
  * Profile picture image element
  * Friends count and location
  * Loading spinner and error messages

# 9. Error Handling

* **No results:** Displays error message if API returns null.
* **Invalid input:** Checks empty inputs before requesting data.
* **Failed API request:** Handles fetch errors with user-friendly messages.
* **Authentication errors:** Displays prompt if token is invalid or missing.
* **Loading state:** Spinner with “Authenticating...” message.

# 10. Input Validation

* Prevents empty or invalid input fields.
* Trims whitespace automatically.
* Disables buttons during API calls to prevent duplicate requests.

# 11. Loading State

* Uses a spinning loader and “Authenticating...” text to indicate progress.

# 12. Responsive Design

* UI adapts to desktop, tablet, and mobile screen sizes.
* Login box, profile cards, and buttons are fully responsive.

# 13. File Structure

/project-folder
│
├─ index.html
├─ style.css
├─ script.js
└─ README.md

# 14. Code Organization

* **Functions** are modular.
* API logic, DOM manipulation, and helper utilities are separated.
* No duplicate code or inline scripts/styles.

# 15. UI Features

* Login button (“Continue with Facebook”)
* Dark mode toggle
* Profile display card
* Error message container
* Loading spinner
* Back button to login

# 16. API Key & Token Security

* **Access tokens are not committed to GitHub.**
* Tokens are extracted dynamically from URL.

# 17. Footer & Credits

 All Facebook Graph API credits displayed in footer (if applicable).

