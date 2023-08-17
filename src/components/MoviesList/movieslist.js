"use client";
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ReactStars from "react-rating-stars-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function MoviesList({ title, listType }) {
  const [moviesWatched, setMoviesWatched] = useState([]);
  const [moviesToBeWatched, setMoviesToBeWatched] = useState([]);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieGenre, setNewMovieGenre] = useState("");

  const handleAddMovie = async () => {
    if (newMovieTitle.trim() !== "" && newMovieGenre.trim() !== "") {
      const newMovie = { title: newMovieTitle, genre: newMovieGenre };
      try {
        await axios.post("api/movies", newMovie); // Use the new API route
        setMoviesToBeWatched([...moviesToBeWatched, newMovie]);
        setNewMovieTitle("");
        setNewMovieGenre("");
      } catch (error) {
        console.error("Error adding movie:", error);
        // Handle error (show a message, etc.)
      }
    }
  };

  const handleDeleteMovie = (list, index) => {
    const updatedMovies = [...list];
    updatedMovies.splice(index, 1);
    if (list === moviesWatched) {
      setMoviesWatched(updatedMovies);
    } else if (list === moviesToBeWatched) {
      setMoviesToBeWatched(updatedMovies);
    }
  };

  const handleDrop = (result) => {
    if (!result.destination) return; // Return if no valid destination

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const movie = moviesToBeWatched[sourceIndex];

    if (
      result.source.droppableId === "toBeWatched" &&
      result.destination.droppableId === "watched"
    ) {
      // Remove the movie from the 'toBeWatched' list
      const updatedToBeWatched = moviesToBeWatched.filter(
        (_, index) => index !== sourceIndex
      );

      // Add the movie to the 'watched' list
      setMoviesWatched((prevMovies) => {
        const updatedWatched = [...prevMovies];
        updatedWatched.splice(destinationIndex, 0, movie);
        return updatedWatched;
      });

      setMoviesToBeWatched(updatedToBeWatched);
    }
  };

  return (
    <div className="flex-1 mx-6">
      <div className="grid justify-center">
        <h2 className="text-lg font-semibold mb-2 text-white text-center rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 w-fit px-4 py-4">
          {title}
        </h2>
      </div>

      <div className="my-8 ">
        <input
          type="text"
          value={newMovieTitle}
          onChange={(e) => setNewMovieTitle(e.target.value)}
          placeholder="Enter new movie title"
          className="p-2 mx-2 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100"
        />
        <input
          type="text"
          value={newMovieGenre}
          onChange={(e) => setNewMovieGenre(e.target.value)}
          placeholder="Enter movie genre"
          className="p-2 rounded border mr-2"
        />
        <button
          onClick={handleAddMovie}
          className="px-4 py-2 bg-[#FA6625] text-white rounded hover:bg-[#B3C1DB] "
        >
          Add
        </button>
      </div>
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="toBeWatched" direction="vertical">
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-2"
            >
              {moviesToBeWatched.map((movie, index) => (
                <Draggable
                  key={index}
                  draggableId={`movie-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-4 text-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 flex items-center justify-between"
                    >
                      <div>
                        <strong className="text-lg">{movie.title}</strong> -{" "}
                        {movie.genre}
                      </div>
                      <button
                        onClick={() =>
                          handleDeleteMovie(moviesToBeWatched, index)
                        }
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
        {/* Add the new Droppable for "Movies Watched" below */}
        <Droppable droppableId="watched" direction="vertical">
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="mt-4 space-y-2"
            >
              {moviesWatched.map((movie, index) => (
                <Draggable
                  key={index}
                  draggableId={`watched-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-4 border rounded-lg bg-white flex items-center justify-between"
                    >
                      <div>
                        <strong className="text-lg">{movie.title}</strong> -{" "}
                        {movie.genre}
                      </div>

                      <button
                        onClick={() => handleDeleteMovie(moviesWatched, index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default MoviesList;
