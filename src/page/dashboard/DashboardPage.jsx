import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import SplitText from "../../components/common/SplitText";
import SilkBackground from "../../components/animations/Background";
import SpotlightCard from "../../components/cards/SpotligthCard";
import account from "../../assets/icons/account.png";
import deposit from "../../assets/icons/deposit.png";
import movimientos from "../../assets/icons/movimientos.png";
import prize from "../../assets/icons/prize.png";
import reward from "../../assets/icons/reward.png";
import "./DashboardPage.css";

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

  const handleAccountClick = () => navigate("/accounts");
  const handleDepositClick = () => navigate("/deposit");
  const handlePrizeClick = () => navigate("/prize");
  const handleMovementsClick = () => navigate("/movements");
  const handleRewardsClick = () => navigate("/reward");

  return (
    <>
      <SilkBackground />
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{
          mt: 15,
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 64px - 64px)",
          position: "relative",
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
          <Grid item xs={12} md={4} onClick={handleAccountClick}>
            <SpotlightCard
              className="custom-spotlight-card"
              style={{ cursor: "pointer" }}
            >
              <Box display="flex" justifyContent="center" mb={2}>
                <img src={account} alt="icono cuenta" width={80} height={80} />
              </Box>
              <Typography variant="h6" color="white" gutterBottom>
                Tus cuentas
              </Typography>
              <Typography variant="body2" color="gray">
                Ver tus cuentas y solicitar otra cuenta.
              </Typography>
            </SpotlightCard>
          </Grid>

          <Grid item xs={12} md={4} onClick={handleMovementsClick}>
            <SpotlightCard
              className="custom-spotlight-card"
              style={{ cursor: "pointer" }}
            >
              <Box display="flex" justifyContent="center" mb={2}>
                <img
                  src={movimientos}
                  alt="icono movimientos"
                  width={80}
                  height={80}
                />
              </Box>
              <Typography variant="h6" color="white" gutterBottom>
                Movimientos
              </Typography>
              <Typography variant="body2" color="gray">
                Ver tus últimas transacciones
              </Typography>
            </SpotlightCard>
          </Grid>

          <Grid item xs={12} md={4} onClick={handleDepositClick}>
            <SpotlightCard
              className="custom-spotlight-card"
              style={{ cursor: "pointer" }}
            >
              <Box display="flex" justifyContent="center" mb={2}>
                <img
                  src={deposit}
                  alt="icono depósito"
                  width={80}
                  height={80}
                />
              </Box>
              <Typography variant="h6" color="white" gutterBottom>
                Hacer un depósito
              </Typography>
              <Typography variant="body2" color="gray">
                Agrega saldo a tu cuenta fácilmente
              </Typography>
            </SpotlightCard>
          </Grid>

          <Grid item xs={12} md={4} onClick={handlePrizeClick}>
            <SpotlightCard
              className="custom-spotlight-card"
              style={{ cursor: "pointer" }}
            >
              <Box display="flex" justifyContent="center" mb={2}>
                <img src={prize} alt="icono premio" width={80} height={80} />
              </Box>
              <Typography variant="h6" color="white" gutterBottom>
                Ver Premios
              </Typography>
              <Typography variant="body2" color="gray">
                Canjea tus puntos por premios.
              </Typography>
            </SpotlightCard>
          </Grid>

          <Grid item xs={12} md={4} onClick={handleRewardsClick}>
            <SpotlightCard
              className="custom-spotlight-card"
              style={{ cursor: "pointer" }}
            >
              <Box display="flex" justifyContent="center" mb={2}>
                <img src={reward} alt="icono reward" width={80} height={80} />
              </Box>
              <Typography variant="h6" color="white" gutterBottom>
                Ver Premios Canjeados
              </Typography>
              <Typography variant="body2" color="gray">
                Historial de los premios que has canjeado.
              </Typography>
            </SpotlightCard>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
