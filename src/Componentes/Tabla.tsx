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
}

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
        fkRol: item.roles.nombre
      })).filter((item: any) => item.id);
      setRows(usuarios);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/Usuarios/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting data', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setEditingUser(null);
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      if (editingUser) {
        if (editingUser.id) {
          await api.put(`/Usuarios/${editingUser.id}`, editingUser);
        } else {
          await api.post('/Usuarios', editingUser);
        }
        fetchData();
        handleClose();
      }
    } catch (error) {
      console.error('Error saving data', error);
    }
  };

  const handleUpdate = (user: Usuario) => {
    setEditingUser(user);
    handleOpen();
  };

  const handleAdd = () => {
    setEditingUser({ id: 0, nombre: '', user: '', password: '', fkRol: 0 });
    handleOpen();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingUser({ ...editingUser, [e.target.name]: e.target.value } as Usuario);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nombre', headerName: 'Nombre', width: 100 },
    { field: 'user', headerName: 'Usuario', width: 100 },
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

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: 16 }}
        onClick={handleAdd}
      >
        Agregar Usuario
      </Button>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <h2 id="modal-title">{editingUser?.id ? 'Actualizar Usuario' : 'Agregar Usuario'}</h2>
          <TextField
            margin="normal"
            fullWidth
            label="Nombre"
            name="nombre"
            value={editingUser?.nombre || ''}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Usuario"
            name="user"
            value={editingUser?.user || ''}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Contraseña"
            name="password"
            value={editingUser?.password || ''}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Rol"
            name="fkRol"
            value={editingUser?.fkRol || ''}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingUser?.id ? 'Actualizar' : 'Agregar'}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Tabla;
