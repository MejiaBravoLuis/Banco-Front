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
} from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import SilkBackground from '../../components/animations/Background';
import { getAllUsers } from '../../services/api';
import ProfileCard from '../../components/cards/ProfileCard';
import { useDeleteUserByAdmin,useUpdateUserByAdmin } from '../../shared/hooks';

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
      <Container sx={{ mt: 10, minHeight: 'calc(100vh - 64px - 64px)' }}>
        {response && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {response} {deletedUserId && `(ID: ${deletedUserId})`}
          </Alert>
        )}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {updateError && <Alert severity="error" sx={{ mb: 2 }}>{updateError}</Alert>}

        <Grid container spacing={4}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.uid}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <ProfileCard
                  name={user.name}
                  title={user.email}
                  handle={user.username}
                  status="Online"
                  avatarUrl={user.avatarUrl || `https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png?u=${user.uid}`}
                  contactText="Contactar"
                  showUserInfo={false}
                  enableTilt={true}
                  onContactClick={() => alert(`Contactar a ${user.name}`)}
                />
                {user.role !== 'ADMIN' && (
                  <>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ mt: 1 }}
                      disabled={deleting}
                      onClick={() => handleDelete(user.uid)}
                    >
                      {deleting ? 'Eliminando...' : 'Eliminar'}
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
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
            <Paper elevation={6} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, p: 4 }}>
              <Typography variant="h6" mb={2}>Editar Usuario</Typography>
              <TextField
                fullWidth
                margin="normal"
                label="Nombre"
                name="name"
                value={editedData.name || ''}
                onChange={handleEditChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Correo"
                name="email"
                value={editedData.email || ''}
                onChange={handleEditChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Rol"
                name="role"
                value={editedData.role || ''}
                onChange={handleEditChange}
              />
              <Box mt={2} display="flex" justifyContent="space-between">
                <Button onClick={() => setSelectedUser(null)}>Cancelar</Button>
                <Button variant="contained" onClick={handleEditSubmit} disabled={updating}>
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
