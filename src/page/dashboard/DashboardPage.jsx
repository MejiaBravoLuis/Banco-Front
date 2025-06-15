import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import SplitText from "../../components/common/SplitText";
import SilkBackground from "../../components/animations/Background";
import SpotlightCard from "../../components/cards/SpotligthCard";
import "./DashboardPage.css";
import movimientos from "../../assets/icons/movimientos.png";
import deposit from "../../assets/icons/deposit.png";
import prize from "../../assets/icons/prize.png"

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
    navigate("/deposit");
  };

  const handleMovementsClick = () => {
    navigate("/movements");
  };

  const handlePrizesClick = () => {
    navigate("/prize")
  }

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
          <Grid item xs={12} md={4} onClick={handleMovementsClick}>
            <SpotlightCard
              className="custom-spotlight-card"
              style={{ cursor: "pointer" }}
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <img
                  src={movimientos}
                  alt="Icono de movimientos"
                  style={{
                    width: "94px",
                    height: "94px",
                    marginBottom: "16px",
                  }}
                />
                <Typography variant="h6" color="white" gutterBottom>
                  Movimientos
                </Typography>
                <Typography variant="body2" color="gray" align="center">
                  Ver tus últimas transacciones y actividad reciente
                </Typography>
              </Box>
            </SpotlightCard>
          </Grid>

          <Grid item xs={12} md={4} onClick={handleDepositClick}>
            <SpotlightCard
              className="custom-spotlight-card"
              style={{ cursor: "pointer" }}
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <img
                  src={deposit}
                  alt="Icono de movimientos"
                  style={{
                    width: "94px",
                    height: "94px",
                    marginBottom: "16px",
                  }}
                />
                <Typography variant="h6" color="white" gutterBottom>
                  Depositos
                </Typography>
                <Typography variant="body2" color="gray" align="center">
                  Añade saldo a tu cuenta o transfiere a otras cuentas
                </Typography>
              </Box>
            </SpotlightCard>
          </Grid>

          <Grid item xs={12} md={4} onClick={handlePrizesClick}>
            <SpotlightCard
              className="custom-spotlight-card"
              style={{ cursor: "pointer" }}
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <img
                  src={prize}
                  alt="Icono de movimientos"
                  style={{
                    width: "94px",
                    height: "94px",
                    marginBottom: "16px",
                  }}
                />
                <Typography variant="h6" color="white" gutterBottom>
                  Premios
                </Typography>
                <Typography variant="body2" color="gray" align="center">
                  Usa tus puntos para ganar increíbles premios
                </Typography>
              </Box>
            </SpotlightCard>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
