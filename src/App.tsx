// src/App.tsx
import React from 'react';
import { Container } from '@mui/material';
import Tabla from './Componentes/Tabla';

const App: React.FC = () => {
  return (
    <Container>
      <h1>CRUD App</h1>
      <Tabla />
    </Container>
  );
};

export default App;
