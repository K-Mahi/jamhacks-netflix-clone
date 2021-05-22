import React, { useState, useEffect } from "react";
// imports DEFAULT(alias) export from axios.js
import axios from "../api";
// import movieTrailer from "movie-trailer";
import styled from "styled-components";

const base_URL = "https://image.tmdb.org/t/p/original/";

type Props = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};
// Row component
const Row: React.FC<Props> = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState<any>([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

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
      </Posters>
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
