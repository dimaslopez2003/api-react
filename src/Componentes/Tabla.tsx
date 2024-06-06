import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Modal, Box, TextField } from '@mui/material';
import api from '../WebApi/axiosConfig';

interface Usuario {
  id: number;
  nombre: string;
  user: string;
  password: string;
  fkRol: number;
  rolNombre: string;
}

const Tabla: React.FC = () => {
  const [rows, setRows] = useState<Usuario[]>([]);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Usuario | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('/Usuarios');
      const data = response.data.result.$values;
      const usuarios = data.map((item: any) => ({
        id: item.pkUsuario || item.id,
        nombre: item.nombre,
        user: item.user,
        password: item.password,
        fkRol: item.fkRol,
        rolNombre: item.rolNombre || 'Sin Rol',
      })).filter((item: any) => item.id);
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

  const handleUpdate = (user: Usuario) => {
    setEditingUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = async () => {
    if (editingUser) {
      try {
        if (editingUser.id) {
          await api.put(`/Usuarios/${editingUser.id}`, editingUser);
        } else {
          await api.post('/Usuarios', editingUser);
        }
        handleClose();
        fetchData();
      } catch (error) {
        console.error('Error saving data', error);
      }
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nombre', headerName: 'Nombre', width: 100 },
    { field: 'user', headerName: 'Usuario', width: 100 },
    { field: 'password', headerName: 'Contraseña', width: 100 },
    { field: 'rolNombre', headerName: 'Rol', width: 100 },
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
            onClick={() => handleUpdate(params.row)}
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

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div style={{ height: 600, width: '100%' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setEditingUser({ id: 0, nombre: '', user: '', password: '', fkRol: 0, rolNombre: '' });
          setOpen(true);
        }}
      >
        Agregar Usuario
      </Button>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 id="modal-modal-title">{editingUser?.id ? 'Actualizar Usuario' : 'Agregar Usuario'}</h2>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            value={editingUser?.nombre || ''}
            onChange={(e) => setEditingUser({...editingUser!, nombre: e.target.value})}
          />
          <TextField
            label="Usuario"
            fullWidth
            margin="normal"
            value={editingUser?.user || ''}
            onChange={(e) => setEditingUser({...editingUser!, user: e.target.value})}
          />
          <TextField
            label="Contraseña"
            fullWidth
            margin="normal"
            value={editingUser?.password || ''}
            onChange={(e) => setEditingUser({...editingUser!, password: e.target.value})}
          />
          <TextField
            label="Rol"
            fullWidth
            margin="normal"
            value={editingUser?.fkRol || ''}
            onChange={(e) => setEditingUser({...editingUser!, fkRol: parseInt(e.target.value)})} // Convertimos a número
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {editingUser?.id ? 'Actualizar' : 'Agregar'}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Tabla;
