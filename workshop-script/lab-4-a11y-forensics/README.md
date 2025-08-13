# Lab 4: Accessibility Forensics - Fixing a Broken Login Form

## 🎯 Learning Objectives

By the end of this lab, you will be able to:

  - Use a screen reader to identify accessibility issues in a form that are invisible to the eye.
  - Implement `role="alert"` to ensure error messages are announced to users.
  - Use `aria` attributes like `aria-required` and `aria-invalid` to communicate an input's state.
  - Programmatically link error messages to inputs using `aria-describedby`.
  - Replace placeholder text with proper, accessible labels.

## ✅ Prerequisites

Before you begin, make sure you have:

  - Completed Lab 0 (Next.js Setup).
  - Cloned the debugging project and checked out the broken branch:
    ```bash
    git clone https://github.com/leichteckig/login-a11y.git
    cd login-a11y
    git checkout dont 
    ```
  - Installed dependencies (`npm install`) and started the application (`npm run dev`).

-----

## 🚀 Step-by-Step Instructions

### Step 1: The Audit - Experiencing the Problems

First, we need to understand what a non-visual user experiences. [cite\_start]We will use a screen reader to find the issues. [cite: 8]

1.  [**Start your screen reader.** On macOS, press **Command (⌘) + F5**. On Windows, use Narrator (`Ctrl + Win + Enter`).
2.  **Navigate** to your running application (`http://localhost:3000`).
3.  **Try to use the form** using only your keyboard.Use the `Tab` key to move between fields. 
4.  **Trigger an error** by clicking the "Login" button with the fields empty.
5.  **Listen carefully.** You will notice several confusing problems:
      * The screen reader doesn't announce that the fields are required.
      * When an error occurs, the global error message at the top is not read out.
      * The screen reader doesn't state that the input fields are now in an "invalid" state. 
      * The specific error messages below each input are not associated with the input fields themselves.

#### Step 2: Fixing the Global Error Alert

Let's make sure the main error message is always announced.

1.  **Open** the file `src/components/Alert.jsx`.
2.  **Action:** Add the `role="alert"` attribute to the `div`. This tells screen readers to immediately announce any content that appears inside this element.

#### Step 3: Making Inputs Announce Their State

Now, let's fix the input fields themselves by giving the screen reader more information. All of the following changes will be in `src/components/Input.jsx`.

1.  **Announce Required Fields:** Add the `aria-required` attribute to the `<input>` element. We'll pass `required` in as a prop from `Login.jsx`.

      * **Code:**
        ```jsx
        <input aria-required={required} ... />
        ```
      * **Why:** This will make the screen reader announce, "Username, required" when the user focuses on the field.

2.  **Announce Invalid State:** Add the `aria-invalid` attribute. It should be `true` only when there is an `errorMessage`. 

      * **Code:**
        ```jsx
        <input aria-invalid={!!errorMessage} ... />
        ```
      * **Why:** This tells the screen reader, "Username, invalid entry." This informs the user that their input was not accepted.

3.  **Connect Error Messages to Inputs:** This is the most critical fix. We need to create a programmatic link between an input and its specific error message.

      * **Action:** Add the `aria-describedby` attribute to the `<input>` element. Its value should be the `id` of the error message `div`. We will also add that `div` right after the input.
      * **Code:**
        ```jsx
        <input
            id={id}
            aria-describedby={errorMessage ? `input-error-${id}` : null}
            ...
        />
        {errorMessage &&
            <div id={`input-error-${id}`} className="input-error-msg">
                {errorMessage}
            </div>
        }
        ```
      * **Why:** Now, when a user focuses on an invalid field, the screen reader will announce the field's label *and* the specific error message associated with it. 

#### Step 4: Using a Proper Label

Using placeholders as labels is not a good practice because they disappear once the user starts typing.

1.  [cite\_start]**Open** the file `src/components/Login.jsx`. [cite: 22]
2.  [cite\_start]**Action:** Instead of relying on a placeholder, pass a proper `label` prop to our `Input` component. [cite: 36]

#### Step 5: The Final Verification

1.  **Go back** to your browser and refresh the page.
2.  **Start your screen reader** again and navigate the form.
3.  **Trigger the errors.** This time, you should hear the global alert, and for each field, the screen reader should announce its label, its required and invalid state, and the specific error message.

### Step 6: Can you find more errors or areas to improve? 
You might want to check the error message themselves. You could run a Lighthouse scan, too. Feel free to tear down this application! 🔥 Remember, you can always check the optimized state of this app inside the `main` branch.

-----

### 🏆 Conclusion

Outstanding work! You have just transformed a confusing and inaccessible form into one that provides a clear, robust experience for screen reader users. You learned how to use key `aria` attributes and the `alert` role to communicate state and provide critical feedback. This demonstrates that true functionality goes far beyond visual appearance and requires a thoughtful approach to make applications usable for everyone.