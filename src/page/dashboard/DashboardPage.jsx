import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import SplitText from '../../components/common/SplitText';
import SilkBackground from '../../components/animations/Background';
import SpotlightCard from '../../components/cards/SpotligthCard';
import './DashboardPage.css';
 
export const DashboardPage = () => {
  const [username, setUsername] = useState("guest");
  const navigate = useNavigate();
 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUsername(parsedUser.username || "bienvenido");
      } catch (error) {
        console.error("Error parsing user:", error);
      }
    }
  }, []);
 
  const handleDepositClick = () => {
    navigate('/deposit');
  };
 
  return (
    <>
      <SilkBackground />
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{
          mt: 15,
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 64px - 64px)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <SplitText
          key={username}
          text={`Hola ${username}, bienvenido`}
          className="welcome-text"
          splitType="words"
          delay={400}
          duration={0.6}
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
          ease="power2.out"
          rootMargin="-50px"
        />
 
        <Grid container spacing={4} mt={4}>
          <Grid item xs={12} md={4}>
            <SpotlightCard className="custom-spotlight-card">
              <Typography variant="h6" color="white" gutterBottom>
                Movimientos
              </Typography>
              <Typography variant="body2" color="gray">
                Ver tus últimas transacciones
              </Typography>
            </SpotlightCard>
          </Grid>
 
          <Grid item xs={12} md={4}>
            <SpotlightCard
              className="custom-spotlight-card"
              
              style={{ cursor: 'pointer' }}
            >
              <Typography variant="h6" color="white" gutterBottom onClick={handleDepositClick}>
                Hacer un depósito
              </Typography>
              <Typography variant="body2" color="gray" onClick={handleDepositClick}>
                Agrega saldo a tu cuenta fácilmente
              </Typography>
            </SpotlightCard>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
 