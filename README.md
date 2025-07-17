# Reddit Viewer App

A web application for browsing posts from various Reddit subreddits.

---

## 📐 Wireframes

_Insert wireframe images later._

---

## 🛠 Technologies Used

- React
- Redux (planned)
- JavaScript (ES6+)
- CSS (or Tailwind CSS if used)
- Reddit API
- Git & GitHub
- GitHub Projects (for task planning)
- Jest / React Testing Library (for unit tests)
- Cypress or Playwright (for E2E tests – planned)

---

## Features

- 🔍 Search and display posts from any subreddit
- ⌨️ Input field for subreddit name with Enter key support
- ⏳ Display a loading message while fetching posts
- ⚠️ Show an error message if the subreddit does not exist or has no posts
- 🌐 Clickable links to open Reddit posts in a new tab
- 📱 Responsive design for both desktop and mobile devices (planned)

---

## 🧪 Testing

This project uses Jest and React Testing Library for unit testing.

- [ ] Tests are located alongside source files (e.g., postsSlice.test.js).
- To run tests: npm test
- To check test coverage: npm test -- --coverage

🔍What’s Covered

- [ ] Redux slice logic (postsSlice.js)
  - Async thunk fetchPosts tested for success and failure cases
  - Reducers setSubreddit, setSort tested
- [ ] Component rendering and interaction (PostItem.js, PostModal.js)

🚫 Enzyme Note
Enzyme was considered but not used due to incompatibility with React 19.
All tests were written using modern tools like React Testing Library instead.

---

## 🚧 Future Work

- Integrate Redux for better state management
- Add filtering by categories
- Implement post detail view (modal or new route)
- Improve animations and UI transitions
- Optimize performance and accessibility (90+ Lighthouse score)

---

## 🌍 Deployment

The app will be deployed to a public URL  
**(e.g., Netlify, Vercel, GitHub Pages)**  
🔗 [Deployed App Link](https://your-app-url.com)

---

## 📱 Responsive Design

The application is designed to work on:

- Desktop
- Tablet
- Mobile devices

---

## 📦 Project Management

Task tracking and planning are managed via  
[GitHub Projects](https://github.com/users/Namane00426/projects/2)

---

## 📝 License

This project is licensed under the MIT License.
