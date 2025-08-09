# Lab 3: Displaying User Data with the UserProfile Component

## 🎯 Learning Objectives

By the end of this lab, you will be able to:

- Integrate pre-built Auth0 UI components like <BasicInfo> and <MFAEnrollment> into a Next.js application.
- Understand how to use client components (with 'use client') inside server components to handle user interactivity and event handlers.
- Pass user data fetched on the server (the session.user object) as props to client-side components.
- Install component dependencies using the shadcn-ui CLI.

-----

## ✅ Prerequisites

Before you begin, make sure you have:

  - Completed **Lab 0**, resulting in a functional Next.js application connected to Auth0.
  - Your Next.js application from Lab 0 running locally (`npm run dev`).

-----

## 🚀 Step-by-Step Instructions

### Step 1: Install the Dependencies for the BasicInfo Component

If you haven't already installed the component library in a previous lab, do so now.

```bash
npx shadcn-ui@latest add card input label
```

### Step 2: Include the Client-Side Profile Page

We will create a new page that fetches and displays user data directly in the browser.

1.  **Create** your BasicInfo component by creating the file `src/components/auth0/BasicInfo.tsx` and copy paste the code from the BasicInfo file from the `auth0` folder (it's content is too big to paste it here).

> **Note:** The `'use client';` directive at the top is crucial. It tells Next.js to render this component in the browser, allowing us to use React hooks like `useUser`.

2.  **Import** the component to your `page.tsx` file. 
```tsx
// src/app/page.tsx
// ...
import BasicInfoForm from "@/components/auth0/BasicInfo";
// ...
```

#### Step 4: Verify

Let's add a link to our new page from the homepage and test the entire flow. I would recomment using this component inside the protected part:

```tsx
// ...
// If session exists, show a welcome message and logout button
    return (
        <main>
        <h1>Welcome, {session.user.name}!</h1>
        <BasicInfoForm user={session.user} />
        <p>
            <a href="/auth/logout">
            <button>Log out</button>
            </a>
        </p>
        </main>
    );
}
```
 **Verification:**
* Go to your application in the browser (`http://localhost:3000`).
* If you are logged in, click **"Logout"**.
* Click the new **"View Client-Side Profile"** link. You should be automatically redirected to the Auth0 login page.
* After you log in, you should be sent back to the Client-Side Profile page.
* You should see a nicely formatted card displaying your profile picture, name, and email, all rendered effortlessly by the `<BasicInfo />` component. ✅


#### Step 5: Try out other components! 🎉

The steps to include other components shouldn't be too different from the other steps - if there's additional steps necessary, such as a hook, it's documented accordingly. Just one thing of note: As we're working inside of a NextJS application, you need to use a wrapper if our component needs to make use of event handlers. Let's check an example - with MFA!  

Dependencies MFA:
```bash
npx shadcn-ui@latest add badge button card label separator sonner
```

We will create a new page that fetches and displays user data directly in the browser.

1.  **Create** your `MFAEnrollment` component by creating the file `src/components/auth0/MFAEnrollment.tsx` and copy paste the code from the BasicInfo file from the `auth0` folder (it's content is too big to paste it here).
2.  You cannot use the MFAEnrollment component directly inside your `page.tsx` file directly, as EventHandler don't work in a Server-side rendered component. So let's wrote a Wrapper around it. Create the file `src/components/auth0/MFAWrapper.tsx` and paste the following code into it:

```tsx
"use client"
import MFAEnrollment from "@/components/auth0/MFAEnrollment";
  const factors = [
    {
      name: "sms",
      enabled: true,
      enrollmentId: "phone|xxxxxxxxxx",
    },
    { name: "push-notification", enabled: true },
    {
      name: "otp",
      enabled: true,
      enrollmentId: "totp|xxxxxxxxxx",
    },
    { name: "webauthn-roaming", enabled: true },
    { name: "webauthn-platform", enabled: true },
  ];

export default function MyMFA() {
  return <MFAEnrollment
          factors={factors}
          onFetch={async () => {
            return { factors, status: 200 };
          }}
          onCreate={async (factor: string) => {
            return { enrollment: { ticket_url: "https://auth0.com" }, status: 200 };
          }}
          onDelete={async (enrollmentId: string) => {
            return { status: 200 };
          }}
        />;
}
```
3. This WrapperComponent can be used inside `page.tsx`, finally! PLease import it:
```tsx
// src/app/page.tsx
// ...
import MFAWrapper from "@/components/auth0/MFAWrapper";
// ...
```
And then feel free to use it:
```tsx
<section className="flex p-5">
    <MFAWrapper></MFAWrapper>
</section>
```
Ah, did you notice the Tailwind classes here? After this step, I started to work on a little styling of the page, and checked if I can use other Shadcn components already. Give it a shot! ❤️

-----

### 🏆 Conclusion

Great job! You've successfully integrated both a simple data-display component (<BasicInfo>) and a complex, interactive component (<MFAEnrollment>) into your protected page. This demonstrates the power of using a component library to rapidly build out complex user management features.

Most importantly, you've tackled a core concept of the Next.js App Router: the "use client" boundary. You learned how to create a wrapper component to ensure that interactive elements with event handlers can function correctly within a server-rendered page. You now have the skills to continue building a rich, interactive, and secure user settings page. Keep experimenting with other components! ❤️