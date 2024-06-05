// src/Componentes/Crud.tsx
import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import api from '../WebApi/axiosConfig';

interface Usuario {
  id: string;
  nombre: string;
  user: string;
  password: string;
  fkRol: string;
}

const Crud: React.FC = () => {
  const [formData, setFormData] = useState<Usuario>({ id: '', nombre: '', user: '', password: '', fkRol: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await api.put(`/Usuarios/${formData.id}`, formData);
      } else {
        await api.post('/Usuarios', formData);
      }
      alert('Datos guardados exitosamente');
    } catch (error) {
      console.error('Error saving data', error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>

        <TextField name="nombre" label="Nombre" value={formData.nombre} onChange={handleChange} />
        <TextField name="user" label="Usuario" value={formData.user} onChange={handleChange} />
        <TextField name="password" label="Contraseña" value={formData.password} onChange={handleChange} />
        <TextField name="fkRol" label="Rol" value={formData.fkRol} onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary">Guardar</Button>
      </form>
    </Container>
  );
};

export default Crud;
