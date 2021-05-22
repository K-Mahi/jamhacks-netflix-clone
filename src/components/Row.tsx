import React, { useState, useEffect } from "react";
// imports DEFAULT(alias) export from axios.js
import axios from "../api";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import styled from "styled-components";

const base_URL = "https://image.tmdb.org/t/p/original/";

type Props = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};
// Row component
const Row: React.FC<Props> = ({ title, fetchUrl, isLargeRow = false }) => {
  /* Creating a movie state (short term memory) */
  const [movies, setMovies] = useState<any>([]);
  /* Creating a trailer state (short term memory) */
  const [trailerURL, setTrailerURL] = useState("");
  //   Pulling information from tmdb API when the pages loads
  useEffect(() => {
    //   Running async call
    async function fetchData() {
      // Waiting for the promise to come back with movie results, fetchUrl(outside the code block)
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    // if [empty], run once when the row loads, and dont run again
    fetchData();
  }, [fetchUrl]);
  //   console.log(movies);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  // //   When user clicks on the movie picture
  // const handleClick = (movie: any) => {
  //   //   If trailer is found clear the url
  //   if (trailerURL) {
  //     setTrailerURL("");
  //   } else {
  //     // Search for movie trailer full url
  //     movieTrailer(movie?.name || "")
  //       .then((url: string) => {
  //         // https://www.youtube.com/watch?v=aSØDÆømlsdæ
  //         const urlParams = new URLSearchParams(new URL(url).search); // urlParams gives us everthing after the ?
  //         setTrailerURL(urlParams.get("v")); //urlParams gives us everything after v=
  //         // Displays error message if unable to find url
  //       })
  //       .catch((error) => console.log(error));
  //   }
  // };

  return (
    <Container className="row">
      <h2>{title}</h2>
      {/* Container for movie rows */}
      <Posters>
        {/* several row poster */}
        {/* Looping through movies array API */}
        {movies.map((movie: any) => (
          //   returns movie images in new array
          <Poster
            //   "key" loads movie row faster knowing the movie id
            key={movie.id}
            // Setting up onClick event for trailer
            // onClick={() => handleClick(movie)}
            isLarge={isLargeRow}
            // Loads poster images from base url
            src={`${base_URL}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
        {/* Contain -> posters */}
      </Posters>
      {/* Embedding youtube movie trailers to show */}
      {trailerURL && <YouTube videoId={trailerURL} opts={opts as any} />}
    </Container>
  );
};

const Container = styled.div`
  margin-left: 20px;
  color: white;
`;

const Posters = styled.div`
  display: flex;
  /* Makes title stay while scrolling */

  overflow-y: hidden;
  overflow-x: scroll;
  padding: 20px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Poster = styled.img<{ isLarge: boolean }>`
  width: 100%;
  object-fit: contain;
  max-height: ${(props) => (props.isLarge ? 250 : 100)}px;
  margin-right: 10px;
  /* Delay effect */
  transition: transform 450ms;

  :hover {
    transform: scale(${(props) => (props.isLarge ? 1.09 : 1.08)});
    opacity: 1;
  }
`;

// Exporting Row function. Making it available
export default Row;
