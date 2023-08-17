"use client";
import { useSession } from "next-auth/react";
export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 bg-white shadow-xl  fixed top-0 left-0 right-0 p-4 flex justify-between items-center">
      <div className="text-lg font-semibold text-white">
        {session?.user?.name}
      </div>
      <button
        onClick={() => signOut()}
        className="text-red-500 hover:text-red-600"
      >
        Logout
      </button>
    </nav>
  );
}
