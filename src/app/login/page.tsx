"use client";
import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { login, getErrorMessage } from "@/services/auth";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      const from = searchParams.get("from");
      // Only allow internal redirects
      router.replace(from && from.startsWith("/") && !from.startsWith("//") ? from : "/dashboard");
      router.refresh();
    } catch (err) {
      setError(getErrorMessage(err, "Login failed"));
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 bg-white text-black shadow rounded-lg w-80"
    >
      <input
        type="text"
        placeholder="Username or email"
        autoComplete="username"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-60"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      {/* useSearchParams needs a Suspense boundary */}
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
