import type { Metadata } from "next";
import "../styles/globals.scss";

export const metadata: Metadata = {
  title: "Зоопарк - Удивительный мир животных",
  description: "Добро пожаловать в самый интерактивный и увлекательный зоопарк. Познакомьтесь с удивительными животными, посетите наши события и проведите время с семьей!",
  icons: {
    icon: '/fav.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  );
}
