
---

# Book Explorer

## Project Overview

**Book Explorer** is a React-based web application built with **TypeScript** that allows users to search for books using the Google Books API, view detailed book information, and manage a personal list of favorite books. This app demonstrates proficiency in modern TypeScript with React, state management (Redux Toolkit), routing, form handling, and performance best practices.

---

## Functional Requirements

*(Same as before — omitted here for brevity unless you want the full list again)*

---

## Technical Requirements

### 1. Modern React & TypeScript
- Use functional components and hooks (e.g., `useState`, `useEffect`, `useMemo`).
- Use **TypeScript** for type safety, enhancing code readability and reducing runtime errors.
- Define types for components, props, Redux state, and API responses.

### 2. React Router
- Use `react-router-dom` with dynamic and nested routes like `/`, `/book/:id`, and `/favorites`.

### 3. Form Handling
- Controlled components with TypeScript interfaces for form state.
- Input validation with user-friendly error messages.

### 4. Redux Toolkit
- Global state management using Redux Toolkit with TypeScript integration.
- Type-safe actions and reducers for managing favorite books and search results.

### 5. Build Tools & Bundlers
- Set up using **Vite with TypeScript template** or `create-react-app` with TypeScript.
- Fast build times and optimized bundling for production.

### 6. Testing (Optional)
- Use `Jest` and `React Testing Library` with TypeScript support to write unit and integration tests.

### 7. Performance Optimization
- Code-splitting using `React.lazy` and `Suspense`.
- Memoization via `useMemo`, `React.memo`, and `useCallback`.

### 8. Version Control & Documentation
- Git for versioning.
- Clear commit messages and project structure.

---

## How to Use the Google Books API

**Base URL:**  
`https://www.googleapis.com/books/v1/volumes?q={searchQuery}`

Example search:  
`https://www.googleapis.com/books/v1/volumes?q=intitle:harry+inauthor:rowling`

---

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Satvikpatil7/Book-Explorer.git
   ```

2. Navigate to the project folder:
   ```bash
   cd Book-Explorer
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open in your browser:
   ```
   http://localhost:5173
   ```

---

## Folder Structure

```
Book-Explorer/
│   index.css
│   main.tsx
│   App.tsx
│
├───assets/
├───components/
├───pages/
├───redux/
├───routes/
├───types/
│   book.ts          # Type definitions for book data
│   api.ts           # API response interfaces
└───...
```

---

## GitHub Repository

🔗 [https://github.com/Satvikpatil7/Book-Explorer-TypeScript](https://github.com/Satvikpatil7/Book-Explorer-TypeScript)

---

