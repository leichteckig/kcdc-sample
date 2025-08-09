# Lab 2: Advanced Customization with Liquid Templates

#### \#\#\# 🎯 Learning Objectives

By the end of this lab, you will be able to:

  - Use the **Universal Login Advanced Editor** directly within your own Auth0 tenant.
  - Understand and apply basic **Liquid syntax** like `{{...}}` and `{% if ... %}`.
  - Completely replace the default login template with custom **HTML and CSS**.
  - Dynamically render page content based on the authentication context (e.g., login vs. signup).

-----

## ✅ Prerequisites

Before you begin, make sure you have:

  - Completed **Lab 0** (Next.js Setup).
  - A basic understanding of HTML and CSS.
  - A **Custom Domain** configured and verified for your Auth0 tenant.
  - Your Next.js application running locally (`npm run dev`).

-----

## 🚀 Step-by-Step Instructions

> ### **Heads-Up: The Local-First Workflow**
>
> As we discussed, using the Advanced Editor requires a **custom domain** (a paid feature). We will therefore follow a **local-first workflow**. You will build the template in a local HTML file. I will then perform the final deployment to a live environment as a demonstration.
This lab provides a complete guide on using the Universal Login's Advanced Editor to replace the default template with a fully custom, two-column design that uses the Liquid templating language for dynamic content.

### Step 1: Install Auth0CLI Tools and open their editor

1.  Head over to the [Auth0 CLI](https://github.com/auth0/auth0-cli) repository, and follow along their install guide. You can either go by Homebrew:
```bash
brew tap auth0/auth0-cli && brew install auth0
```
... or by cURL
```bash
curl -sSfL https://raw.githubusercontent.com/auth0/auth0-cli/main/install.sh | sh -s -- -b .
```

There are instruction for Windows machines, as well.

2. Login to your account using the following command: 
```bash
auth0 login
```

3. Run the following command: 
```bash
auth0 universal-login templates update
```

This will open your default code editor, and a Storybook window in your browser, previewing the current state of your login screen. I recommend setting VSCode as your default editor, you can do that by using this command:
```bash
export EDITOR="code --wait"
```
There are example for other editors inside the [repo](https://github.com/auth0/auth0-cli?tab=readme-ov-file#customization).


### Step 2: Implement an advanced login template

Inside the Storybook Windows, you can find the standard Universal Login template, let's call it "the minimal" template 
```html
<!DOCTYPE html>
{% assign resolved_dir = dir | default: "auto" %}
<html lang="{{locale}}" dir="{{resolved_dir}}">
  <head>
    {%- auth0:head -%}
  </head>
  <body class="_widget-auto-layout">
    {%- auth0:widget -%}
  </body>
</html>
```

When you make changes in your code editor, you see them updated live in the Storybook preview window. So yes, now you're ready to create your own Universal Login Template! Either do for your own vision or try to do the task from the workshop:
* ...move the login box to the left
* ...put an image to the right
* ...add a footer


If you go for the latter, you can find the solution inside the `template.html` file. 

> Remember to always add {%- auth0:head -%} in the HTML head tag
and {%- auth0:widget -%} where you want the Auth0 widget to be injected. 

When you close the editor, Auth0 CLI will ask you if you want to update the login template. Approve, and you’re done! 

> Important note:
The authentication widget previewed on Storybook is not identical to the actual one that is going to appear on your website. These could also display a bit differently on mobile/different screens - so make sure to recheck everything in your real environment after updating your template. 

### Step 3: Introduce your custom template into your app



## 🏆 Conclusion

Outstanding! You have successfully implemented a professional, custom login page inspired by real-world examples. You've used the Advanced Editor to take full control of the HTML and CSS, and you understand how Auth0 uses the `` placeholder and Liquid variables to inject dynamic, secure content into your design. You now have the skills to make the login experience a seamless extension of your brand.