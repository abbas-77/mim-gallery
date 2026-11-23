"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LogOut } from "lucide-react";
import { getMe, logout, type User } from "@/services/auth";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // The middleware only checks that a cookie exists; the backend verifies it
    getMe()
      .then(setUser)
      .catch((err) => {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          logout();
          router.replace("/login");
        } else {
          setError("We couldn't load your profile. Check that the backend is running, then refresh.");
        }
      });
  }, [router]);

  const handleLogout = () => {
    logout();
    router.replace("/login");
    router.refresh();
  };

  return (
    <div className="mx-auto min-h-[70vh] max-w-7xl px-6 pb-24 pt-36 md:px-12">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-ink/10 pb-10">
        <div>
          <p className="eyebrow text-gold-dark">Your account</p>
          <h1 className="mt-4 font-display text-4xl font-medium md:text-5xl">
            {user ? `Welcome, ${user.username}` : error ? "Account" : "Loading…"}
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 border border-ink/15 px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 hover:border-royal-800 hover:bg-royal-800 hover:text-ivory"
        >
          <LogOut className="h-4 w-4" strokeWidth={1.5} />
          Sign out
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-10 border-l-2 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}

      {user && (
        <dl className="mt-10 grid gap-px bg-ink/10 sm:grid-cols-3">
          {[
            { label: "Username", value: user.username },
            { label: "Email", value: user.email },
            { label: "Role", value: user.role },
          ].map((row) => (
            <div key={row.label} className="bg-ivory p-6">
              <dt className="eyebrow !text-[10px] text-muted">{row.label}</dt>
              <dd className="mt-3 break-words font-display text-2xl">{row.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
