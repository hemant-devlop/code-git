# Next.js + RTK Query Token Management (Production-Level Setup)

## Problem Statement

In this project, every API request requires a token generated from a Next.js API route (`/api/token`).

Flow:

```text
Fetch Users
      ↓
Get Token
      ↓
Users API Call
```

The same flow should apply to all APIs:

* Users
* Subjects
* Profile
* Attendance
* Reports
* etc.

Instead of manually calling the token API before every request, we can implement a custom RTK Query `baseQuery` that handles token generation automatically.

---

# Solution Architecture

```text
RTK Query Request
        ↓
Check Token in Redux Store
        ↓
Token Exists?
     ↓       ↓
   Yes       No
     ↓        ↓
 API Call   Get Token
               ↓
         Save Token
               ↓
          API Call
```

If the token expires:

```text
API Request
     ↓
401 Unauthorized
     ↓
Generate New Token
     ↓
Retry Original Request
```

---

# Step 1: Create Auth Slice

```javascript
// store/slices/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
```

---

# Step 2: Create Custom Base Query

```javascript
// services/baseQuery.js

import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken, clearToken } from "@/store/slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const baseQueryWithToken = async (
  args,
  api,
  extraOptions
) => {
  let token = api.getState().auth.token;

  // Generate token if missing
  if (!token) {
    try {
      const tokenResponse = await fetch("/api/token");
      const tokenData = await tokenResponse.json();

      token = tokenData.token;

      api.dispatch(setToken(token));
    } catch (error) {
      return {
        error: {
          status: 401,
          data: "Token generation failed",
        },
      };
    }
  }

  // Attach token to request
  const modifiedArgs =
    typeof args === "string"
      ? {
          url: args,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {
          ...args,
          headers: {
            ...args.headers,
            Authorization: `Bearer ${token}`,
          },
        };

  let result = await baseQuery(
    modifiedArgs,
    api,
    extraOptions
  );

  // Token expired
  if (result.error?.status === 401) {
    try {
      const refreshResponse = await fetch("/api/token");
      const refreshData = await refreshResponse.json();

      const newToken = refreshData.token;

      api.dispatch(setToken(newToken));

      const retryArgs = {
        ...modifiedArgs,
        headers: {
          ...modifiedArgs.headers,
          Authorization: `Bearer ${newToken}`,
        },
      };

      result = await baseQuery(
        retryArgs,
        api,
        extraOptions
      );
    } catch (error) {
      api.dispatch(clearToken());

      return {
        error: {
          status: 401,
          data: "Unable to refresh token",
        },
      };
    }
  }

  return result;
};
```

---

# Step 3: Configure RTK Query API

```javascript
// services/api.js

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToken } from "./baseQuery";

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithToken,

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),

    getSubjects: builder.query({
      query: () => ({
        url: "/subjects",
        method: "GET",
      }),
    }),

    getProfile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetSubjectsQuery,
  useGetProfileQuery,
} = api;
```

---

# Step 4: Configure Redux Store

```javascript
// store/index.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { api } from "@/services/api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
```

---

# Step 5: Use in Components

```javascript
const { data, isLoading, error } =
  useGetUsersQuery();
```

```javascript
const { data, isLoading, error } =
  useGetSubjectsQuery();
```

```javascript
const { data, isLoading, error } =
  useGetProfileQuery();
```

No manual token handling is required inside components.

---

# Complete Request Flow

```text
Component
    ↓
RTK Query Hook
    ↓
baseQueryWithToken
    ↓
Check Token
    ↓
Token Missing?
    ↓
Generate Token
    ↓
Store Token
    ↓
Attach Authorization Header
    ↓
API Request
    ↓
Success Response
```

---

# Production Benefits

✅ Centralized token management

✅ No duplicate authentication logic

✅ Automatic token generation

✅ Automatic token refresh

✅ Cleaner components

✅ Scalable for large applications

✅ Easy to maintain

✅ Follows RTK Query best practices

---

# Recommended Folder Structure

```text
src
│
├── store
│   ├── index.js
│   └── slices
│       └── authSlice.js
│
├── services
│   ├── api.js
│   └── baseQuery.js
│
├── features
│   ├── users
│   ├── subjects
│   └── profile
│
└── app
```

This setup works well for production-grade Next.js applications where a token must be generated before accessing protected APIs.
