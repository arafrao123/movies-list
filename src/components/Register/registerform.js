"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter("");
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlefullNameChange = (event) => {
    setfullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      setError("All Fields are required");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else console.log("User Registeration Failed");
    } catch (error) {
      console.log("Error during registration", error);
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
              <label htmlFor="fullName" className="text-lg">
                Full Name :
              </label>
              <div>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={handlefullNameChange}
                  required
                  className="bg-transparent border-b-2 text-white p-2"
                />
              </div>
            </div>
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
                SIGN UP
              </button>
            </div>
            {error && (
              <div className="flex justify-center bg-gray-800 bg-opacity-75 text-red-500 p-2 rounded">
                {" "}
                {error}
              </div>
            )}

            <Link href={"/"} className="text-white flex justify-center">
              ALready have an account?{" "}
              <span className="mx-2 underline text-white">Login</span>
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
}
