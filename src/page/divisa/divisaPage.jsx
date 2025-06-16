import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
} from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import SilkBackground from "../../components/animations/Background";

export const DivisaPage = () => {
  const [exchangeRates, setExchangeRates] = useState([]);

  const essentialCurrencies = ["USD", "EUR", "MXN", "COP", "CRC"];
  const API_KEY = "cur_live_afxlaxoTNGkuzKcSuU7uo9k2M3iNyW7NkGvptUvK";

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const res = await fetch(
          `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}&base_currency=GTQ`
        );
        const data = await res.json();

        if (!data || !data.data) throw new Error("No se encontraron tasas.");

        const rates = essentialCurrencies.map((code) => ({
          code,
          rate: data.data[code]?.value || 0,
        }));

        setExchangeRates(rates);
      } catch (err) {
        console.error("Error al cargar tasas de cambio:", err);
      }
    };

    fetchExchangeRates();
  }, []);

  return (
    <>
      <SilkBackground />
      <Navbar />
      <Container className="deposit-container">
        <Typography variant="h5" sx={{ mt: 4 }}>
          Tasa de Cambio (1 Quetzal)
        </Typography>

        <Paper sx={{ p: 2, mb: 4 }}>
          {exchangeRates.length > 0 ? (
            exchangeRates.map((curr) => (
              <Typography key={curr.code}>
                1 GTQ = {curr.rate.toFixed(2)} {curr.code}
              </Typography>
            ))
          ) : (
            <Typography>Cargando tasas de cambio...</Typography>
          )}
        </Paper>
      </Container>
    </>
  );
};
