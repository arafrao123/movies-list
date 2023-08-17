"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <section className="w-full overflow-x-hidden bg-cover">
      <div className="text-lg font-semibold text-white">
        {session?.user?.name}
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
