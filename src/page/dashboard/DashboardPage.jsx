import React from 'react'
import { Box, Container } from '@mui/material'
import Navbar from '../../components/navbar/Navbar'
import SplitText from '../../components/common/SplitText'
import SilkBackground from '../../components/animations/Background'
import SpotlightCard from '../../components/cards/SpotligthCard'
import './DashboardPage.css'

export const DashboardPage = () => {
  return (
    <>
      <SilkBackground />
      <Navbar />
      <Container
        maxWidth="md"
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
          text="Hola, bienvenido"
          className="welcome-text"
          splitType="words"
          delay={400}
          duration={0.6}
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
          ease="power2.out"
          rootMargin="-50px"
        />

        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
        <h1>aaaa</h1>
        </SpotlightCard>
      </Container>
    </>
  )
}
