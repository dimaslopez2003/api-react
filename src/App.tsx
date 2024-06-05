// src/App.tsx
import React from 'react';
import { Container } from '@mui/material';
import Tabla from './Componentes/Tabla';
import Crud from './Componentes/Crud';

const App: React.FC = () => {
  return (
    <Container>
      <h1>CRUD App</h1>
      <Crud />
      <Tabla />
    </Container>
  );
};

export default App;
