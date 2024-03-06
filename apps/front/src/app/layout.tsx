import Navbar from "../components/Navbar";
import './global.css';

export const metadata = {
  title: 'Mercadolibre Challenge',
  description: 'Hecho por Nicolás Arteaga',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/120x120-precomposed.png" sizes="120x120" />
      </head>
      <body className="container">
        <Navbar />
        <main className="content">
          {children}
        </main>
      </body>
    </html>
  );
}
