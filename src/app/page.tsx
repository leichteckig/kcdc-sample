import { auth0 } from "@/lib/auth0";
import './globals.css';
import BasicInfoForm from "@/components/auth0/BasicInfo";
import MFAWrapper from "@/components/auth0/MFAWrapper";

export default async function Home() {
  // Fetch the user session
  const session = await auth0.getSession();

  // If no session, show sign-up and login buttons
  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <main className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">

          <h1 className="text-2xl font-semibold mb-3">KCDC 2025</h1>
          <p className="mb-3">Welcome to our training app! You can now log in or create a new account.</p>

          <a 
            href="/auth/login" 
            className="w-full mb-3 inline-block text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Log in
          </a>

          <div className="font-medium">
              Not registered? <a className="text-blue-700 hover:underline dark:text-blue-300" href="/auth/login?screen_hint=signup">Create account</a>
          </div>
        </main>
      </div>
    );
  }

  // If session exists, show a welcome message and logout button
  return (
    <div className="flex items-center justify-center">
      <main className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <section>
          <h1 className="text-2xl font-semibold mb-3">Welcome, {session.user.name}!</h1>
          <p className="mb-3">This is your account settings.</p>
          <BasicInfoForm user={session.user} />
        </section>
        <section className="flex p-5">
            <MFAWrapper></MFAWrapper>
        </section>
        <a 
          className="w-full inline-block text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
          href="/auth/logout"
        >
          Log out
        </a>
      </main>
    </div>
  );
}