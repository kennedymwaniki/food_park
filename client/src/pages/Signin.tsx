import { Toaster } from "sonner";
import userLogin from "../assets/images/userLogin.jpeg";
const Signin = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen space-y-2">
      <Toaster position="top-center" richColors />
      <div className="flex-1 flex items-center justify-center  m-2 border-r">
        <img
          src={userLogin}
          alt="Login Illustration"
          className="w-full max-w-md"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-orange-600">
            User Log In
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Log in with your data that you entered during your registration
          </p>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-2 p-4 rounded-lg">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="adminlogin"
                    className="font-semibold text-orange-900 hover:text-orange-600"
                  >
                    are you an admin?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="keep-logged-in"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
              />
              <label
                htmlFor="keep-logged-in"
                className="ml-2 block text-sm text-gray-900"
              >
                Keep me logged in
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center items-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 h-10"
              >
                login
              </button>
            </div>
            <div className="text-sm">
              <a
                href="register"
                className="font-semibold text-orange-900 hover:text-orange-600"
              >
                You don't have an account?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
