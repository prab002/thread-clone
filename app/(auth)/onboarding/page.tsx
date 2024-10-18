"use client";

import AccountProfile from "@/components/forms/AccountProfile";
import { useUser } from "@clerk/clerk-react";

const Page = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>; // Add a loading state until user data is ready
  }

  if (!isSignedIn || !user) {
    return <div>Please sign in</div>; // Handle when the user is not signed in
  }

  const userInfo = {
    id: user?.id,
    objectId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName || "",
    username: user?.username || "",
    image: user?.imageUrl || "/assets/profile.svg", // Default profile image if none exists
    bio: user?.bio || "",
  };

  return (
    <main className="mx-auto flex max-w-2xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now to use Threads
      </p>
      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userInfo} btnTitle="Continue" />
      </section>
    </main>
  );
};

export default Page;
