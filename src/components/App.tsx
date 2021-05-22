import React from "react";
import Row from "./Row";
import { requests } from "../api";
import Banner from "./Banner";
import Navbar from "./Navbar";
import styled from "styled-components";

function App() {
  return (
    <AppContainer>
      <Navbar />
      <Banner />
      <Row
        title="NETFLIX ORGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow={true}
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row
        title="Documentaries Movies"
        fetchUrl={requests.fetchDocumentaries}
      />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  background-color: #111;
`;

// Exporting App function. Making it available
export default App;
