// src/pages/deposit/DepositPage.jsx

import React from 'react';
import { Container } from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import SilkBackground from '../../components/animations/Background';

export const DepositPage = () => {
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
      </Container>
    </>
  );
};

export default DepositPage;
