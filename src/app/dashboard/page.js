"use client";
import UserInfo from "@/components/User/userinfo";
import MoviesList from "@/components/MoviesList/movieslist";
import { DragDropContext } from "react-beautiful-dnd";
import Navbar from "@/components/Navbar/navbar";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  return (
    <div className="bg-[url('/bg.png')] bg-cover h-screen w-full overflow-y-hidden">
      <div className="grid justify-center py-6">
        <div className="rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 w-fit">
          <h1 className="text-white text-center py-3 px-5 font-bold text-[30px] ">
            {session?.user?.name}'s Movies List
          </h1>
        </div>
      </div>

      <div className="grid justify-items-center h-[calc(100vh-100px)] overflow-y-auto">
        <div className="flex my-6 w-full">
          <DragDropContext>
            <div className="grid grid-cols-2 w-full">
              <div className="col-span-1">
                <MoviesList
                  title="Movies To Be Watched"
                  listType="toBeWatched"
                />
              </div>
              <div className="col-span-1">
                <MoviesList title="Movies Watched" listType="watched" />
              </div>
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}
