import React from 'react';
import { Container } from '@mui/material';
import ProfileCard from '../../components/cards/ProfileCard';
import Navbar from '../../components/navbar/Navbar';
import SilkBackground from '../../components/animations/Background';
import useUserProfileDetails from '../../shared/hooks/useProfileDetails';

export const ProfilePage = () => {
  const { user, loading } = useUserProfileDetails();

  if (loading) return <p>Cargando perfil...</p>;

  return (
    <>
      <SilkBackground />
      <Navbar />
      <Container
        sx={{
          mt: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 64px - 64px)',
          zIndex: 1,
          position: 'relative',
        }}
      >
        <ProfileCard
          name={user.name}
          title={user.nombreTrabajo}
          handle={user.username}
          status="Online"
          avatarUrl={user.avatarUrl || 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/bc538b345188bdcb2d2be5b2894d471ba54aeea53b03862429205ed49d693bbe.png'}
          contactText="Contactar"
          showUserInfo={true}
          enableTilt={true}
          onContactClick={() => console.log('Contacto')}
        />
      </Container>
    </>
  );
};
