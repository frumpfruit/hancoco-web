// Root layout — minimal shell. 
// All fonts, providers, and layout components are in [locale]/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
