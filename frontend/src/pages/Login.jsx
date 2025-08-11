import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login"); // "Login" | "Sign Up"
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const isSignup = currentState === "Sign Up";

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Basic front-end validation (keeps UX tight; backend is source of truth)
    if (isSignup && !name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }
    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    try {
      setLoading(true);
      const url = isSignup
        ? `${backendUrl}/api/user/register`
        : `${backendUrl}/api/user/login`;

      const payload = isSignup
        ? { name, email, password }
        : { email, password };
      const { data } = await axios.post(url, payload);

      if (data?.success && data?.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        console.log(data.token);
        toast.success(isSignup ? "Account created. Welcome!" : "Signed in.");
      } else {
        toast.error(data?.message || "Authentication failed.");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred."
      );
      // eslint-disable-next-line no-console
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <main className="min-h-[72vh] flex items-center justify-center px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-sm p-6 sm:p-8"
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            {isSignup ? "Create account" : "Sign in"}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {isSignup
              ? "Join LuxeHaven to start shopping."
              : "Welcome back to LuxeHaven."}
          </p>
        </div>

        {/* Name (Sign Up only) */}
        {isSignup && (
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:ring-2 focus:ring-gray-900/20"
              placeholder="Your full name"
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:ring-2 focus:ring-gray-900/20"
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-900 mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPw ? "text" : "password"}
              autoComplete={isSignup ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 pr-10 text-sm text-gray-900 shadow-sm outline-none focus:ring-2 focus:ring-gray-900/20"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="absolute inset-y-0 right-2 grid place-items-center px-2 text-gray-500 hover:text-gray-800"
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {/* Eye icon */}
              {showPw ? (
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M3 3l18 18" />
                  <path d="M10.6 10.6a3 3 0 004.24 4.24" />
                  <path d="M9.9 4.24A10.94 10.94 0 0121 12c-1.8 3.2-5.4 6-9 6a9.9 9.9 0 01-3.76-.74" />
                  <path d="M6.53 6.53A10.94 10.94 0 003 12c1.8 3.2 5.4 6 9 6 .96 0 1.9-.14 2.79-.41" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Helper row */}
        <div className="mb-6 flex items-center justify-between text-sm">
          <a
            href="/forgot-password"
            className="text-gray-600 hover:text-gray-900"
          >
            Forgot your password?
          </a>
          <button
            type="button"
            onClick={() => {
              setCurrentState(isSignup ? "Login" : "Sign Up");
              // clear fields when switching modes for a clean UX
              setPassword("");
            }}
            className="font-semibold text-gray-900 hover:underline"
          >
            {isSignup ? "Have an account? Sign in" : "Create account"}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center rounded-xl bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 shadow-sm hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {loading ? (
            <>
              <svg
                className="mr-2 h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="9" className="opacity-30" />
                <path d="M21 12a9 9 0 0 1-9 9" />
              </svg>
              {isSignup ? "Creating account…" : "Signing in…"}
            </>
          ) : (
            <>{isSignup ? "Sign Up" : "Sign In"}</>
          )}
        </button>
      </form>
    </main>
  );
};

export default Login;
