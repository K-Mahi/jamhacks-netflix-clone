import React, { useState, useEffect } from "react";
import axios, { requests } from "../api";
import styled from "styled-components";

const truncate = (str: string, n: number) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};

const Banner = () => {
  // Setting up useState
  const [movie, setMovie] = useState<any>([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    // Pulling data from API
    fetchData();
  }, []);

  return (
    //   Contents of header
    <Container
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <Contents>
        <Title>{movie?.title || movie?.name || movie?.original_name}</Title>
        <div>
          <Button>Play</Button>
          <Button>My List</Button>
        </div>

        <Description>{truncate(movie?.overview, 150)}</Description>
      </Contents>
      {/* Empty fade div with bottom fade effect  */}
      <FadeBottom></FadeBottom>
    </Container>
  );
};

const Container = styled.div`
  color: white;
  object-fit: contain;
  height: 60vh;
`;

const Contents = styled.div`
  margin-left: 30px;
  padding-top: 140px;
  height: 190px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  padding-bottom: 0.3rem; ;
`;

const Description = styled.h1`
  width: 45rem;
  line-height: 1.3;
  padding-top: 1rem;
  font-size: 0.8rem;
  max-width: 360px;
  height: 80px;
`;

const Button = styled.button`
  cursor: pointer;
  color: #fff;
  outline: none;
  border: none;
  font-weight: 700;
  border-radius: 0.2vw;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: rgba(51, 51, 51, 0.5);
  :hover {
    color: #000;
    background-color: #e6e6e6;
    transition: all 0.2s;
  }
`;

const FadeBottom = styled.div`
  height: 60vh;
  background-image: linear-gradient(
    180deg,
    transparent,
    rgba(37, 37, 37, 0.61),
    #111
  );
`;

export default Banner;
