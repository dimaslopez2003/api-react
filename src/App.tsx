import React from 'react';
import Container from '@mui/material/Container';
import Tabla from './Componentes/Tabla';
import Header from './Componentes/header';
import Footer from './Componentes/footer';
import styled from 'styled-components';
import img from '../img/yo.png';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Container sx={{ minHeight: 'calc(100vh - 64px - 64px)' }}> {/* Ajusta el mínimo alto */}
        <h1>WebApi</h1>
        <Tabla />
      </Container>
      <Footer />
    </div>
  );
};

export default App;
