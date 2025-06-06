import React, { useEffect } from 'react';
import { Container, Grid, Box } from '@mui/material';
import ProfileCard from '../../components/cards/ProfileCard';
import Navbar from '../../components/navbar/Navbar';
import SilkBackground from '../../components/animations/Background';
import useProfileDetails from '../../shared/hooks/useProfileDetails';
import SplitText from '../../components/common/SplitText';
import './userProfilePage.css'

export const ProfilePage = () => {
  const { user, loading } = useProfileDetails();

  useEffect(() => {
    if (user) {
      console.log("Datos del perfil:", user);
    }
  }, [user]);

  if (loading) return <p>Cargando perfil...</p>;

  const fields = [
    { label: 'Nombre completo', value: user.name },
    { label: 'Usuario', value: user.username },
    { label: 'Correo', value: user.email },
    { label: 'Dirección', value: user.direccion },
    { label: 'Teléfono', value: user.telefono },
    { label: 'Trabajo', value: user.nombreTrabajo },
    { label: 'Monto mensual', value: `Q. ${user.montoMensual}` },
    { label: 'Rol', value: user.role },
  ];

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

          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              alignItems="flex-start"
            >
              {fields.map((field, index) => (
                <SplitText
                  key={field.label}
                  text={`${field.label}: ${field.value}`}
                  className="profile-info-text"
                  splitType="words"
                  delay={index * 200}
                  duration={0.6}
                  from={{ opacity: 0, y: 30 }}
                  to={{ opacity: 1, y: 0 }}
                  ease="power2.out"
                  rootMargin="-50px"
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
