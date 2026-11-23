"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LogOut } from "lucide-react";
import { getMe, logout, type User } from "@/services/auth";
import { useI18n } from "@/providers/LocaleProvider";

export default function DashboardPage() {
  const router = useRouter();
  const { t } = useI18n();
  const d = t.dashboard;
  const [user, setUser] = useState<User | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // The middleware only checks that a cookie exists; the backend verifies it
    getMe()
      .then(setUser)
      .catch((err) => {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          logout();
          router.replace("/login");
        } else {
          setFailed(true);
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
          <p className="eyebrow text-gold-dark">{d.eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl font-medium md:text-5xl rtl:md:text-4xl">
            {user ? d.welcome(user.username) : failed ? d.account : d.loading}
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 border border-ink/15 px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 hover:border-royal-900 hover:bg-royal-900 hover:text-ivory rtl:text-sm"
        >
          <LogOut className="h-4 w-4 rtl:-scale-x-100" strokeWidth={1.5} />
          {d.signOut}
        </button>
      </div>

      {failed && (
        <p role="alert" className="mt-10 border-s-2 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-800">
          {d.loadError}
        </p>
      )}

      {user && (
        <dl className="mt-10 grid gap-px bg-ink/10 sm:grid-cols-3">
          {[
            { label: d.username, value: user.username },
            { label: d.email, value: user.email },
            { label: d.role, value: d.roles[user.role] ?? user.role },
          ].map((row) => (
            <div key={row.label} className="bg-ivory p-6">
              <dt className="eyebrow !text-[10px] text-muted rtl:!text-xs">{row.label}</dt>
              <dd className="mt-3 break-words font-display text-2xl" dir="auto">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
