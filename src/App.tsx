import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Container, StylesGlobal } from './style/stylesGlobal';

function App() {
  return (
    <BrowserRouter>
      <Container>
        <StylesGlobal />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
