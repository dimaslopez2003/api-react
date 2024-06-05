// src/Componentes/Tabla.tsx
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import api from '../WebApi/axiosConfig';

interface Usuario {
  id: number;
  nombre: string;
  user: string;
  password: string;
  fkRol: number;
}

const Tabla: React.FC = () => {
  const [rows, setRows] = useState<Usuario[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('/Usuarios');
      const data = response.data.result.$values;
      const usuarios = data.map((item: any) => ({
        id: item.pkUsuario || item.id,  // Asegurarse de que cada fila tenga una propiedad `id` única
        nombre: item.nombre,
        user: item.user,
        password: item.password,
        fkRol: item.fkRol
      })).filter((item: any) => item.id);  // Filtrar filas sin id
      setRows(usuarios);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/Usuarios/${id}`);
      fetchData(); // Refrescar los datos después de eliminar
    } catch (error) {
      console.error('Error deleting data', error);
    }
  };

  const handleUpdate = (id: number) => {
    console.log('Actualizar', id);
    // Aquí puedes agregar la lógica para actualizar
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nombre', headerName: 'Nombre', width: 100 },
    { field: 'user', headerName: 'Usuario', width: 100},
    { field: 'password', headerName: 'Contraseña', width: 100 },
    { field: 'fkRol', headerName: 'Rol', width: 100 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginRight: 16 }}
            onClick={() => handleUpdate(params.row.id)}
          >
            Actualizar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Eliminar
          </Button>
        </div>
      )
    }
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid 
        rows={rows} 
        columns={columns} 
        getRowId={(row) => row.id} // Asegurarse de que el identificador es único
        pagination
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 }
          }
        }}
      />
    </div>
  );
};

export default Tabla;
