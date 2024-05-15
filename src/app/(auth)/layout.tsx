import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body>
      <main className="w-1/2 h-screen flex items-center justify-center absolute top-0 left-0">
        {children}
      </main>
      <aside className="w-1/2 h-screen absolute top-0 right-0 flex items-center justify-center bg-secondary">
        <div className="w-[320px]">
          <p className="opacity-80 text-sm font-medium">About Security</p>
          <h1 className="text-2xl font-bold mb-3 mt-1">
            We utilize Clerk for secure authentication.
          </h1>

          <Image
            src="/auth-banner.png"
            alt="tiny-article"
            width={320}
            height={250}
            className="object-cover"
            loading="lazy"
          />
        </div>
      </aside>
    </body>
  );
}
