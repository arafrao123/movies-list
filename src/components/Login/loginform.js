"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-[url('/bg-img.png')] h-screen flex justify-center items-center n w-full overflow-hidden bg-cover">
      <div className="grid justify-center ">
        <div className="grid justify-center h-fit w-fit bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-2 border-gray-100 ">
          <form onSubmit={handleSubmit} className="p-5 ">
            <h1 className="text-center font-bold text-gray-200 text-2xl mb-5">
              WELCOME!
            </h1>
            <div className="mb-4  text-white mx-5 my-4">
              <label htmlFor="email" className="text-lg">
                Email :
              </label>
              <div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  className="bg-transparent border-b-2 text-white p-2"
                />
              </div>
            </div>
            <div className="mb-4  text-white mx-5 my-4">
              <label htmlFor="password" className="text-lg">
                Password :
              </label>
              <div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="bg-transparent border-b-2 text-white p-2"
                />
              </div>
            </div>
            <div className="flex justify-center my-6 ">
              <button
                type="submit"
                className="w-fit p-3 border-2 border-white text-white font-bold "
              >
                LOGIN
              </button>
            </div>
            {error && (
              <div className="flex justify-center text-red-400"> {error}</div>
            )}

            <Link href={"/register"} className="text-white flex justify-center">
              Don't have an account?{" "}
              <span className="mx-2 underline text-white">Register</span>
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
}
