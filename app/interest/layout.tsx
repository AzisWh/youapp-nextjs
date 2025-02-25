export default function InteresetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section
      style={{
        background:
          'radial-gradient(farthest-corner at 80% 10%, #1F4247 -10%, #0D1D23 40%, #09141A 100%)',
      }}
      className="relative px-5 pt-10 ">
      {children}
    </section>
  );
}
