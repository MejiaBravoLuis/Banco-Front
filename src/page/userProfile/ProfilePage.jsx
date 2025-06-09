import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Box,
  TextField,
  Button,
  Alert,
  Typography,
} from '@mui/material';
import ProfileCard from '../../components/cards/ProfileCard';
import Navbar from '../../components/navbar/Navbar';
import SilkBackground from '../../components/animations/Background';
import SplitText from '../../components/common/SplitText';
import { useProfileDetails, useUpdateProfile } from '../../shared/hooks';
import './userProfilePage.css';

export const ProfilePage = () => {
  const { user, loading } = useProfileDetails();
  const {
    submitProfileUpdate,
    loading: updating,
    response,
    error,
    clearMessages,
  } = useUpdateProfile();

  const [formData, setFormData] = useState({
    name: '',
    direccion: '',
    nombreTrabajo: '',
    montoMensual: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        direccion: user.direccion || '',
        nombreTrabajo: user.nombreTrabajo || '',
        montoMensual: user.montoMensual || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    clearMessages();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitProfileUpdate(formData);
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    clearMessages();
  };

  if (loading) return <p>Cargando perfil...</p>;

  return (
    <>
      <SilkBackground />
      <Navbar />
      <Container
        sx={{
          mt: 10,
          minHeight: 'calc(100vh - 64px - 64px)',
          zIndex: 1,
          position: 'relative',
        }}
      >
        <Grid container spacing={4} alignItems="flex-start">
          {/* Tarjeta del usuario */}
          <Grid item xs={12} md={6}>
            <ProfileCard
              name={user.name}
              title={user.nombreTrabajo}
              handle={user.username}
              status="Online"
              avatarUrl={
                user.avatarUrl ||
                'https://d15f34w2p8l1cc.cloudfront.net/overwatch/bc538b345188bdcb2d2be5b2894d471ba54aeea53b03862429205ed49d693bbe.png'
              }
              contactText="Contactar"
              showUserInfo={true}
              enableTilt={true}
              onContactClick={() => console.log('Contacto')}
            />
          </Grid>

          {/* Información o formulario */}
          <Grid item xs={12} md={6}>
            {!isEditing ? (
              <Box
                display="flex"
                flexDirection="column"
                gap={2}
                alignItems="flex-end"
              >
                <Typography variant="h6" align="right" color="white">
                  Información del Perfil
                </Typography>
                {[
                  { label: 'Nombre completo', value: user.name },
                  { label: 'Usuario', value: user.username },
                  { label: 'Correo', value: user.email },
                  { label: 'Rol', value: user.role },
                  { label: 'Dirección', value: user.direccion },
                  { label: 'Trabajo', value: user.nombreTrabajo },
                  { label: 'Monto mensual', value: user.montoMensual },
                ].map((field, index) => (
                  <Box key={field.label} sx={{ width: '100%' }}>
                    <SplitText
                      text={`${field.label}: ${field.value}`}
                      className="profile-info-text"
                      splitType="words"
                      delay={index * 150}
                      duration={0.6}
                      from={{ opacity: 0, y: 30 }}
                      to={{ opacity: 1, y: 0 }}
                      ease="power2.out"
                      rootMargin="-50px"
                    />
                  </Box>
                ))}

                <Button variant="contained" onClick={handleEditToggle}>
                  Editar Perfil
                </Button>
              </Box>
            ) : (
              <Box
                display="flex"
                flexDirection="column"
                gap={2}
                component="form"
                onSubmit={handleSubmit}
              >
                <Typography variant="h6" color="white">
                  Editar Perfil
                </Typography>

                <TextField
                  fullWidth
                  label="Nombre completo"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  InputProps={{ style: { color: 'white' } }}
                  sx={{ input: { color: 'white' }, label: { color: '#ccc' } }}
                />

                <TextField
                  fullWidth
                  label="Dirección"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  InputProps={{ style: { color: 'white' } }}
                  sx={{ input: { color: 'white' }, label: { color: '#ccc' } }}
                />

                <TextField
                  fullWidth
                  label="Trabajo"
                  name="nombreTrabajo"
                  value={formData.nombreTrabajo}
                  onChange={handleChange}
                  InputProps={{ style: { color: 'white' } }}
                  sx={{ input: { color: 'white' }, label: { color: '#ccc' } }}
                />

                <TextField
                  fullWidth
                  label="Monto mensual"
                  name="montoMensual"
                  type="number"
                  value={formData.montoMensual}
                  onChange={handleChange}
                  InputProps={{ style: { color: 'white' } }}
                  sx={{ input: { color: 'white' }, label: { color: '#ccc' } }}
                />

                {error && <Alert severity="error">{error}</Alert>}
                {response && <Alert severity="success">{response}</Alert>}

                <Box display="flex" gap={2} mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={updating}
                  >
                    {updating ? 'Guardando...' : 'Guardar Cambios'}
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: user.name || '',
                        direccion: user.direccion || '',
                        nombreTrabajo: user.nombreTrabajo || '',
                        montoMensual: user.montoMensual || '',
                      });
                      clearMessages();
                    }}
                  >
                    Cancelar
                  </Button>
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProfilePage;
