// frontend/src/app/layout.js
import "./globals.css";

export const metadata = {
  title: "MediCore — Hospital Intelligence Platform",
  description: "Hospital admin analytics dashboard powered by MediCore",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          id="medi-gf"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
