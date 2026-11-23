"use client";
import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import Logo from "@/components/logo/Logo";
import { login, getErrorMessage } from "@/services/auth";
import { useI18n } from "@/providers/LocaleProvider";

const inputClass =
  "w-full border-0 border-b border-ink/20 bg-transparent px-0 py-3 text-base text-ink placeholder:text-muted/60 transition-colors focus:border-royal-900 focus:outline-none focus:ring-0";

function LoginForm() {
  const { t } = useI18n();
  const l = t.login;
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
      setError(getErrorMessage(err, l.failed, l.offline));
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <p className="eyebrow text-gold-dark">{l.eyebrow}</p>
      <h1 className="mt-4 font-display text-4xl font-medium md:text-5xl rtl:md:text-4xl">{l.title}</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted">{l.body}</p>

      <div className="mt-12 space-y-8">
        <div>
          <label htmlFor="username" className="eyebrow !text-[10px] text-muted rtl:!text-xs">
            {l.username}
          </label>
          <input
            id="username"
            type="text"
            dir="auto"
            autoComplete="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="password" className="eyebrow !text-[10px] text-muted rtl:!text-xs">
            {l.password}
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-6 border-s-2 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="group mt-10 flex w-full items-center justify-center gap-3 bg-royal-900 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-ivory transition-colors duration-300 hover:bg-royal-800 disabled:opacity-60 rtl:text-sm"
      >
        {loading ? l.submitting : l.submit}
        {!loading && (
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
        )}
      </button>
    </form>
  );
}

export default function LoginPage() {
  const { t } = useI18n();

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-royal-950 md:block">
        <Image src="/images/banner2.jpg" alt="" fill priority sizes="50vw" className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-royal-950 via-royal-950/50 to-royal-950/20" />
        <div className="absolute inset-x-0 bottom-0 p-12 text-ivory">
          <Logo className="mb-8 h-16 w-auto text-gold" title={t.brand} />
          <p className="max-w-md font-display text-3xl italic leading-snug text-gold-light rtl:text-2xl">
            &ldquo;{t.login.quote}&rdquo;
          </p>
          <p className="eyebrow mt-6 text-ivory/60">{t.brand}</p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 pb-16 pt-32 md:px-12">
        {/* useSearchParams needs a Suspense boundary */}
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
