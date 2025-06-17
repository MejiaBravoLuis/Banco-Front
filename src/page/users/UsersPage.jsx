import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Button,
  Box,
  Alert,
  Modal,
  Backdrop,
  Fade,
  TextField,
  Typography,
  Paper,
  Divider,
} from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import SilkBackground from '../../components/animations/Background';
import { getAllUsers } from '../../services/api';
import ProfileCard from '../../components/cards/ProfileCard';
import { useDeleteUserByAdmin, useUpdateUserByAdmin } from '../../shared/hooks';

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [deletedUserId, setDeletedUserId] = useState(null);

  const {
    deleteUser,
    loading: deleting,
    response,
    error,
    clearMessages,
  } = useDeleteUserByAdmin();

  const {
    updateUser,
    loading: updating,
    response: updateResponse,
    error: updateError,
    clearMessages: clearUpdateMessages,
  } = useUpdateUserByAdmin();

  const fetchUsers = async () => {
    const res = await getAllUsers();
    if (!res.error) {
      setUsers(res.data.users || []);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (!confirmed) return;

    const deleteResponse = await deleteUser(id);
    if (deleteResponse?.success) {
      setDeletedUserId(id);
    }

    setTimeout(() => {
      clearMessages();
      setDeletedUserId(null);
      fetchUsers();
    }, 1000);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditedData({
      name: user.name,
      email: user.email,
      telefono: user.telefono || '',
      montoMensual: user.montoMensual || '',
      nombreTrabajo: user.nombreTrabajo || '',
      direccion: user.direccion || '',
      role: user.role,
    });
  };

  const handleEditChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    const result = await updateUser(selectedUser.uid, editedData);
    if (result.success) {
      fetchUsers();
      setSelectedUser(null);
      clearUpdateMessages();
    }
  };

  return (
    <>
      <SilkBackground />
      <Navbar />
      <Container sx={{ mt: 12, minHeight: 'calc(100vh - 64px)', pb: 8 }}>
        {response && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {response} {deletedUserId && `(ID: ${deletedUserId})`}
          </Alert>
        )}
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        {updateError && <Alert severity="error" sx={{ mb: 3 }}>{updateError}</Alert>}

        <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
          Gestión de Usuarios
        </Typography>

        <Grid container spacing={4}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={user.uid}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{
                  p: 2,
                  borderRadius: 4,
                  transition: 'all 0.3s ease',
                  boxShadow: 3,
                  backgroundColor: 'white',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <ProfileCard
                  name={user.name}
                  title={user.email}
                  handle={user.username}
                  status="Online"
                  avatarUrl={
                    user.avatarUrl ||
                    `https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png?u=${user.uid}`
                  }
                  contactText="Contactar"
                  showUserInfo={false}
                  enableTilt={true}
                  onContactClick={() => alert(`Contactar a ${user.name}`)}
                />
                {user.role !== 'ADMIN' && (
                  <>
                    <Button
                      color="error"
                      variant="outlined"
                      fullWidth
                      sx={{ mt: 2 }}
                      disabled={deleting}
                      onClick={() => handleDelete(user.uid)}
                    >
                      {deleting ? 'Eliminando...' : 'Eliminar'}
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      sx={{ mt: 1 }}
                      onClick={() => openEditModal(user)}
                    >
                      Editar
                    </Button>
                  </>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Modal
          open={Boolean(selectedUser)}
          onClose={() => setSelectedUser(null)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{ timeout: 500 }}
        >
          <Fade in={Boolean(selectedUser)}>
            <Paper
              elevation={10}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '90%', sm: 500 },
                p: 4,
                borderRadius: 4,
              }}
            >
              <Typography variant="h6" mb={2} fontWeight="bold">
                Editar Usuario
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {[
                { label: 'Nombre', name: 'name' },
                { label: 'Teléfono', name: 'telefono' },
                { label: 'Monto Mensual', name: 'montoMensual' },
                { label: 'Nombre del Trabajo', name: 'nombreTrabajo' },
                { label: 'Dirección', name: 'direccion' },
                { label: 'Rol', name: 'role' },
              ].map((field) => (
                <TextField
                  key={field.name}
                  fullWidth
                  margin="dense"
                  label={field.label}
                  name={field.name}
                  value={editedData[field.name] || ''}
                  onChange={handleEditChange}
                />
              ))}
              <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                <Button onClick={() => setSelectedUser(null)}>Cancelar</Button>
                <Button
                  variant="contained"
                  onClick={handleEditSubmit}
                  disabled={updating}
                >
                  {updating ? 'Guardando...' : 'Guardar'}
                </Button>
              </Box>
            </Paper>
          </Fade>
        </Modal>
      </Container>
    </>
  );
};

export default UsersPage;
