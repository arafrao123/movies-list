"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    console.log("status: -->", status);
    console.log("session:-->", session);
    return <p>Loading...</p>;
  }
  return (
    <section className="bg-[url('/dashboard-bg-img.png')] h-screen w-full overflow-x-hidden bg-cover">
      <div className="text-lg font-semibold text-white">
        {session?.user?.name} ho
      </div>

      <button
        onClick={() => signOut()}
        className="text-red-500 hover:text-red-600"
      >
        Logout
      </button>
    </section>
  );
}
