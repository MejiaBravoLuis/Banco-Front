import React, { useEffect, useState } from 'react';
import { Container, Grid } from "@mui/material";
import Navbar from '../../components/navbar/Navbar';
import SilkBackground from '../../components/animations/Background';
import { getAllUsers } from '../../services/api';
import ProfileCard from '../../components/cards/ProfileCard';

export const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getAllUsers();
      if (!res.error) {
        setUsers(res.data.users || []); 
      }
    };

    fetchUsers();
  }, []);

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
        <Grid container spacing={4}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user._id}>
              <ProfileCard
                name={user.name}
                title={user.email}
                handle={user.username}
                status="Online"
                avatarUrl={
                  user.avatarUrl ||
                  `https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png?u=${user._id}`
                }
                contactText="Contactar"
                showUserInfo={false}
                enableTilt={true}
                onContactClick={() => alert(`Contactar a ${user.name}`)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default UsersPage;
