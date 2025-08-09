# Lab 1: Basic Branding for Universal Login

## 🎯 Learning Objectives

By the end of this lab, you will be able to:

  - Locate and use the **Universal Login** branding editor in the Auth0 Dashboard.
  - Apply a custom **logo** and **color palette** to your login page.
  - Understand the direct impact of branding on creating a trustworthy user experience.

-----

## ✅ Prerequisites

Before you begin, make sure you have:

  - Completed **Lab 0**, resulting in a functional Next.js application connected to Auth0.
  - Your Next.js application from Lab 0 running locally (`npm run dev`).

-----

## 🚀 Step-by-Step Instructions

### Step 1: Navigate to the Branding Settings

1.  **Open** your **Auth0 Dashboard** in a browser tab.

2.  In the left-hand menu, **navigate** to **Branding \> Universal Login**.

3.  You will see the Universal Login editor. Make sure you are on the **Look and Feel** tab.

### Step 2: Apply the "KCDC workshop" Brand (or your own one 😇)

We will now customize the default look to match our fictional "KCDC Workshop" brand.

1.  **Add the Company Logo:**

      * Scroll down to the **Logo** section.
      * In the **URL** field, paste the following link to our placeholder logo:
        ```text
        https://cdn.auth0.com/website/sdks/logos/auth0_light_mode.png
        ```
      * You will see the preview on the right update immediately.

2.  **Set the Brand Colors:**

| Brand Color | Value |
| --- | --- |
| Page Background | Dusty Taupe (#BDB3A1) |
| Widget Background | Cream (#F5F0E1) |
| Primary Button | Deep Prussian Blue (#003153)) |
| Button Text | Cream (#F5F0E1) |
| Header Text (Log in) | Deep Prussian Blue (#003153) |
| Body Text & Labels | A standard dark text color like Off-Black (#222222) is recommended for maximum readability on the cream background. |
| Links & Icons | Dusty Taupe (#BDB3A1) |
| Page Background | Burnt Amber (#D97925) |

These colors are merely suggestions. Of course you can go try out other combinations! 🔥 I\'d be interested in seeing those creations.

> **Pro-Tip:** For a real project, always use a contrast checker tool to ensure your brand colors meet WCAG accessibility standards. This ensures your login page is usable for everyone.

#### \#\#\#\# Step 3: Save and Verify Your Changes

1.  **Click** the **"Save and Publish"** button at the bottom of the page to apply your changes.
2.  **Verification:**
      * Go back to your running Next.js application in your browser (usually `http://localhost:3000`).
      * If you are already logged in, click the **"Logout"** link.
      * Now, click the **"Login"** link.
      * Instead of the default Auth0 page, you should now be redirected to your beautifully branded "KCDC Workshop" login page, complete with the new logo and colors. ✅

-----

## 🏆 Conclusion

Excellent work! In just a few clicks and without writing a single line of code, you have transformed a generic login page into a seamless and trustworthy part of your application's user experience. This demonstrates the power of Universal Login for maintaining brand consistency and building user confidence right from the start.