import React, { useEffect, useState } from 'react';
import { Container, Grid, Button, Box, Alert } from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import SilkBackground from '../../components/animations/Background';
import { getAllUsers } from '../../services/api';
import ProfileCard from '../../components/cards/ProfileCard';
import { useDeleteUserByAdmin } from '../../shared/hooks';

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [deletedUserId, setDeletedUserId] = useState(null);

  const {
    deleteUser,
    loading: deleting,
    response,
    error,
    clearMessages,
  } = useDeleteUserByAdmin();

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
    console.log('🧨 Intentando eliminar usuario con ID:', id);
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

  return (
    <>
      <SilkBackground />
      <Navbar />
      <Container
        sx={{
          mt: 10,
          minHeight: 'calc(100vh - 64px - 64px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          zIndex: 1,
          position: 'relative',
        }}
      >
        {response && (
          <Alert severity="success" sx={{ mb: 2 }}>
             {response} {deletedUserId && `(ID: ${deletedUserId})`}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
             {error}
          </Alert>
        )}

        <Grid container spacing={4}>
          {users.map((user) => {
            const userId = user.uid;

            return (
              <Grid item xs={12} sm={6} md={4} key={userId}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <ProfileCard
                    name={user.name}
                    title={user.email}
                    handle={user.username}
                    status="Online"
                    avatarUrl={
                      user.avatarUrl ||
                      `https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png?u=${userId}`
                    }
                    contactText="Contactar"
                    showUserInfo={false}
                    enableTilt={true}
                    onContactClick={() => alert(`Contactar a ${user.name}`)}
                  />

                  {user.role !== 'ADMIN' && (
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ mt: 1 }}
                      disabled={deleting}
                      onClick={() => handleDelete(userId)} 
                    >
                      {deleting ? 'Eliminando...' : 'Eliminar'}
                    </Button>
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default UsersPage;
