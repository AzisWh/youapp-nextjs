export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section
      style={{ backgroundColor: '#09141A' }}
      className="font-inter relative px-5 pt-10">
      {children}
    </section>
  );
}
