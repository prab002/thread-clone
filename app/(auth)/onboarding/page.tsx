import { UserButton } from "@clerk/nextjs";

async function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold text-whites">Onboarding</h1>
      <UserButton />
    </main>
  );
}

export default page;
