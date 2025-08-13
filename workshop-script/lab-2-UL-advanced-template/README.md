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


If you go for the latter, you can find the solution inside the `template.html` file. Let's still go step by step for now. :)

#### Step 2A: Put an image to the right
We achieve the split-screen effect by setting a full-screen background image on the <body> element. The login box will then be placed on top of the left side of this image.

Action: Inside the <style> tag, add the following CSS for the body:

CSS

body {
  background-image: url("https://cdn.auth0.com/website/homepage/hero/hero-workshop-kcdc.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
background-image: Sets our desired image.

background-size: cover: Ensures the image always covers the entire screen, without stretching or distorting.

#### Task 2B: Move the login box to the left
Next, we create a container for the Auth0 widget and style it to only occupy the left portion of the screen.

Action: Add the following CSS for a new class named .prompt-wrapper:

```CSS

.prompt-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 480px;
  height: 100%;
  justify-content: center;
  background-color: rgb(248, 216, 224);
}
```
width: 480px: Fixes the width of our login container.

height: 100%: Makes it take up the full height of the viewport.

background-color: We give it a semi-opaque background so the underlying image is slightly visible.

Action: In the <body> of the HTML, wrap the auth0:widget in the div with our new class. We also use a Liquid if statement to ensure this wrapper is only applied to the login and signup prompts.

```html
{% if prompt.name == "login" or prompt.name == "signup" %} 
    <div class="prompt-wrapper">
    {%- auth0:widget -%}
    </div>
{% else %}
    {%- auth0:widget -%}
{% endif %}
```
Remember: {%- auth0:widget -%} is the special Liquid tag where Auth0 will inject the actual login form.

#### Task 2B: Add a footer
Finally, we'll add a persistent footer that sits at the bottom of the page.

Action: Add the CSS for our <footer> element.

```CSS
.footer {
  background-color: rgb(52, 52, 52);
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 16px 0; 
  width: 100%;
  color: white;
}
```
* `position*`*: absolute, bottom: 0, and left: 0: This combination pins the footer to the bottom-left corner of the viewport.
* `width: 100%`: Ensures it spans the entire width of the screen.
* Action: Add the <footer> HTML structure just before the closing </body> tag.

```HTML
<footer class="footer">
  <ul>
    <li><a href="https://company.com/privacy">Privacy Policy</a></li>
    <li><a href="https://company.com/terms">Terms of Service</a></li>
  </ul>
</footer>
```
### Step 3: Deploy Your Custom Template
Make all the changes from Step 2 in your code editor. You will see the updates live in the Storybook preview window.

When you are satisfied with the result, close your code editor.

The Auth0 CLI will detect that you've closed the editor and ask if you want to update the login template. Approve the change, and you’re done! Your live login page will now use your new custom template.

## 🏆 Conclusion

Outstanding! You have successfully implemented a professional, custom login page inspired by real-world examples. You've used the Advanced Editor to take full control of the HTML and CSS, and you understand how Auth0 uses the `` placeholder and Liquid variables to inject dynamic, secure content into your design. You now have the skills to make the login experience a seamless extension of your brand.