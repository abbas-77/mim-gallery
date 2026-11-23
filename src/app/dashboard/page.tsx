"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
// mongodb+srv://abbasazimii77_db_user:Yi15tlv6jbQRoeWP@cluster0.lne4kbq.mongodb.net/
export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // اگه توکن نبود برگرد به لاگین
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome to your dashboard 🎉</p>
    </div>
  );
}
