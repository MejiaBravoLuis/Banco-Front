import React, { useEffect, useState } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import SilkBackground from "../../components/animations/Background";
import ProfileCard from "../../components/cards/ProfileCard";
import { usePendingUsers } from "../../shared/hooks/usePendingUsers";
import Sidebar from "../../components/sidebar/Sidebar";

export const AcceptUsersPage = () => {
  const { users, loading, error, acceptPendingUser } = usePendingUsers();
  const [pending, setPending] = useState([]);

  useEffect(() => {
    if (!loading && !error && users) {
      setPending(users);
    }
  }, [users, loading, error]);

  if (loading) return <p>Cargando usuarios pendientes...</p>;
  if (error) return <p>Error al cargar usuarios.</p>;

  const handleAcceptClick = async (userId, userName) => {
    const result = await acceptPendingUser(userId);
    if (result.success) {
      alert(`Usuario ${userName} aceptado correctamente`);
    } else {
      alert("Error al aceptar usuario");
    }
  };

  return (
    <>
      <SilkBackground
        speed={6}
        scale={1}
        noiseIntensity={0}
        rotation={0}
        color={"#e87d7d"}
      />
      <Sidebar />
      <Container
        sx={{
          mt: 10,
          minHeight: "calc(100vh - 64px - 64px)",
          zIndex: 1,
          position: "relative",
        }}
      >
        <Grid container spacing={4} alignItems="flex-start">
          {pending.map((user) => {
            const fields = [
              { label: "Nombre completo", value: user.name },
              { label: "Usuario", value: user.username },
              { label: "Correo", value: user.email },
              { label: "Rol", value: user.role },
            ];

            return (
              <React.Fragment key={user.uid}>
                <Grid item xs={12} md={6}>
                  <ProfileCard
                    name={user.name}
                    title={user.email}
                    handle={user.username}
                    status="Pendiente"
                    avatarUrl={
                      user.avatarUrl ||
                      `https://bhspowwownews.bufsd.org/wp-content/uploads/2024/12/tyler.png?u=${user.uid}`
                    }
                    contactText="Aceptar"
                    showUserInfo={true}
                    enableTilt={true}
                    onContactClick={() =>
                      handleAcceptClick(user.uid, user.name)
                    }
                  />
                </Grid>

                <Grid item xs={12} md={6}></Grid>
              </React.Fragment>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default AcceptUsersPage;
