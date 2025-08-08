# Lab 0: Building the Foundation with the Next.js Quickstart

* Branch: `main`. This will lead you to the foundation of this workshop's app.

## 🎯 Learning Objectives

Welcome to our first hands-on lab\! By the end of this session, you will have a fully functional Next.js application with a complete, production-ready authentication system. You will be able to:

  - Install and configure the Auth0 Next.js SDK.
  - Implement UI components for logging in and out.
  - Securely access first user profile information on the server.
  - Protect a specific page so that only authenticated users can view it.

-----

## ✅ Prerequisites

Before you begin, make sure you have:

  - A free Auth0 account.
  - Node.js (version 18 or higher) installed on your machine.
  - A new Next.js project. If you don't have one, create it now by running:
    ```bash
    npx create-next-app@latest kcdc-nextjs-app
    ```
    *(When prompted, you can accept the defaults for the Next.js setup.)*

-----

## 🚀 Step-by-Step Instructions

> ### **Please Follow Along Here\!**
>
> 👉 **[https://auth0.com/docs/quickstart/webapp/nextjs/interactive](https://auth0.com/docs/quickstart/webapp/nextjs/interactive)** 👈
>
> Open the link above in a new browser tab. This interactive guide is the best way to get started because it will **automatically populate the code snippets with your personal Auth0 domain and Client ID.** This guide will walk you through the same steps listed below. Use this markdown file as your reference and for explanations.

### Step 1: Configure Your Auth0 Application

The first step in the interactive guide is to configure your application settings.

1.  **Application Name:** Give your application a name, like "KCDC Next.js Workshop".
2.  **Configure URLs:** The guide will ask you to set your **Allowed Callback URL** and **Allowed Logout URL**.
    > **Why is this important?** This is a critical security measure. Auth0 will *only* redirect users back to the URLs on this list after they log in or out. For local development, this is typically `http://localhost:3000`.

### Step 2: Install the Auth0 Next.js SDK

1.  **Navigate** into your new Next.js project directory.

2.  **Install** the SDK using npm. This package contains all the hooks, HOCs, and API route handlers we need.

    ```bash
    npm install @auth0/nextjs-auth0
    ```

### Step 3: Configure Your Environment Variables

The SDK needs to know your specific Auth0 application details. Feel free to copy the one the interactive guick guide already provides you! ❤️ For the sake of completeness, here's the full porocess:

1.  **Create** a new file named `.env.local` in the root of your project.

2.  **Copy and paste** the environment variables provided by the interactive quickstart. They will look something like this:

    ```bash
    # .env.local
    AUTH0_SECRET='LONG_RANDOM_STRING_FOR_SESSION_ENCRYPTION'
    AUTH0_BASE_URL='http://localhost:3000'
    AUTH0_ISSUER_BASE_URL='https://YOUR_AUTH0_DOMAIN'
    AUTH0_CLIENT_ID='YOUR_CLIENT_ID'
    AUTH0_CLIENT_SECRET='YOUR_CLIENT_SECRET'
    ```

### Step 6: Add the middleware and Auth0 client

Create a file at `src/lib/auth0.ts`. This file provides methods for handling authentication, sessions and user data. Then, import the Auth0Client class from the SDK to create an instance and export it as auth0. This instance is used in your app to interact with Auth0. Again, it's fine to copy/paste the one the quickstart provides you with:

```ts
import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const auth0 = new Auth0Client();
```

Next up, please add the Authentication Middleware: The Next.js Middleware allows you to run code before a request is completed. Therefore, create a file at `src/middleware.ts`. This file is used to enforce authentication on specific routes:


```ts
import type { NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

export async function middleware(request: NextRequest) {
  return await auth0.middleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
```

The middleware function intercepts incoming requests and applies Auth0's authentication logic. The matcher configuration ensures that the middleware runs on all routes except for static files and metadata.

### Step 7: Access User Data & Protect a Page

Finally, let's create a profile page that only logged-in users can see.

1.  **Create** a new file at `app/page.tsx`.

2.  **Add** the following code. This uses two powerful features from the SDK.

    ```tsx
        import { auth0 } from "@/lib/auth0";
        import './globals.css';

        export default async function Home() {
        // Fetch the user session
        const session = await auth0.getSession();

        // If no session, show sign-up and login buttons
        if (!session) {
            return (
            <main>
                <a href="/auth/login?screen_hint=signup">
                <button>Sign up</button>
                </a>
                <a href="/auth/login">
                <button>Log in</button>
                </a>
            </main>
            );
        }

        // If session exists, show a welcome message and logout button
        return (
            <main>
            <h1>Welcome, {session.user.name}!</h1>
            <p>
                <a href="/auth/logout">
                <button>Log out</button>
                </a>
            </p>
            </main>
        );
        }
    ```

    > **Best Practice:** The `withPageAuthRequired` Higher-Order Component wraps your page and automatically redirects users to the login page if they are not authenticated. This is the standard way to protect pages.

-----

## 🏆 Conclusion

Congratulations on getting through this foundational lab\! You have successfully built a complete Next.js application with a secure, production-ready authentication system. You can now log in, log out, and view a protected profile page. With this secure base, we are ready to tackle the rest of the workshop. Great work\!