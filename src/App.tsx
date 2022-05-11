import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/ContextAuth';
import { Home } from './pages/Home/Home';
import { Container, StylesGlobal } from './style/stylesGlobal';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Container>
          <StylesGlobal />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
