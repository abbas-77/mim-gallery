import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Cormorant_Garamond, Manrope, Vazirmatn } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { dictionaries } from "@/i18n/dictionaries";
import { defaultLocale, dirOf, isLocale, LOCALE_COOKIE } from "@/i18n/config";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazir",
  subsets: ["arabic", "latin"],
});

const getLocale = async () => {
  const value = (await cookies()).get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : defaultLocale;
};

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = dictionaries[await getLocale()];
  return { title: meta.title, description: meta.description };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      className={`${cormorant.variable} ${manrope.variable} ${vazirmatn.variable}`}
    >
      <body className="bg-ivory font-sans text-ink antialiased">
        <LocaleProvider initialLocale={locale}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
