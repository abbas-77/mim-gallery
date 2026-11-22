"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
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
          setError("Could not load your profile. Is the backend running?");
        }
      });
  }, [router]);

  const handleLogout = () => {
    logout();
    router.replace("/login");
    router.refresh();
  };

  return (
    <div className="p-6 pt-28">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      {user ? (
        <p>
          Welcome, {user.username} ({user.role}) 🎉
        </p>
      ) : (
        !error && <p>Loading...</p>
      )}
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
