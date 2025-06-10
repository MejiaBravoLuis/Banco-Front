import React, { useState } from 'react';
import {
  Container,
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Card,
  CardContent,
  CardActions,
  Divider,
} from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import SilkBackground from '../../components/animations/Background';
import {
  useCreatePrize,
  useEditPrize,
  useGetAllPrizes,
} from '../../shared/hooks';

export const PrizePage = () => {
  const [editingPrizeId, setEditingPrizeId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    precioPuntos: '',
    descripcion: '',
  });

  const {
    createPrize,
    loading: creating,
    response: createResponse,
    error: createError,
    clearMessages: clearCreate,
  } = useCreatePrize();

  const {
    editPrize,
    loading: editing,
    response: editResponse,
    error: editError,
    clearMessages: clearEdit,
  } = useEditPrize();

  const {
    prizes,
    loading: loadingPrizes,
    error: loadError,
    refetch: refetchPrizes,
  } = useGetAllPrizes();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearCreate();
    clearEdit();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingPrizeId) {
      await editPrize(editingPrizeId, formData);
    } else {
      await createPrize(formData);
    }
    setFormData({ nombre: '', precioPuntos: '', descripcion: '' });
    setEditingPrizeId(null);
    await refetchPrizes();
  };

  const handleEditClick = (prize) => {
    setEditingPrizeId(prize._id);
    setFormData({
      nombre: prize.nombre,
      precioPuntos: prize.precioPuntos,
      descripcion: prize.descripcion,
    });
  };

  return (
    <>
      <SilkBackground />
      <Navbar />
      <Container sx={{ mt: 12, mb: 8 }}>
        <Box
          sx={{
            backgroundColor: '#1e1e2f',
            p: 4,
            borderRadius: 4,
            boxShadow: 5,
            mb: 5,
          }}
        >
          <Typography variant="h4" gutterBottom color="white" fontWeight="bold">
            {editingPrizeId ? '✏️ Editar Premio' : '🎁 Crear Nuevo Premio'}
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputProps={{ style: { color: 'white' } }}
                  sx={{ input: { color: 'white' }, label: { color: '#bbb' } }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Precio en Puntos"
                  name="precioPuntos"
                  type="number"
                  value={formData.precioPuntos}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputProps={{ style: { color: 'white' } }}
                  sx={{ input: { color: 'white' }, label: { color: '#bbb' } }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Descripción"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputProps={{ style: { color: 'white' } }}
                  sx={{ input: { color: 'white' }, label: { color: '#bbb' } }}
                />
              </Grid>
            </Grid>

            <Box mt={3} display="flex" gap={2}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
              >
                {editingPrizeId ? 'Actualizar Premio' : 'Crear Premio'}
              </Button>
              {editingPrizeId && (
                <Button
                  variant="outlined"
                  onClick={() => {
                    setEditingPrizeId(null);
                    setFormData({
                      nombre: '',
                      precioPuntos: '',
                      descripcion: '',
                    });
                    clearCreate();
                    clearEdit();
                  }}
                >
                  Cancelar
                </Button>
              )}
            </Box>

            {(createResponse || editResponse) && (
              <Alert severity="success" sx={{ mt: 3 }}>
                {createResponse || editResponse}
              </Alert>
            )}
            {(createError || editError) && (
              <Alert severity="error" sx={{ mt: 3 }}>
                {createError || editError}
              </Alert>
            )}
          </Box>
        </Box>

        <Typography variant="h5" color="white" mb={2}>
          🎉 Premios Disponibles
        </Typography>

        {loadError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {loadError}
          </Alert>
        )}

        <Grid container spacing={3}>
          {loadingPrizes ? (
            <Typography color="white">Cargando premios...</Typography>
          ) : prizes.length === 0 ? (
            <Typography color="white">No hay premios disponibles.</Typography>
          ) : (
            prizes.map((prize) => (
              <Grid item xs={12} sm={6} md={4} key={prize._id}>
                <Card
                  sx={{
                    backgroundColor: '#2d2d44',
                    color: 'white',
                    borderRadius: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Typography variant="h6">{prize.nombre}</Typography>
                    </Box>
                    <Typography variant="body2" color="#bbb" gutterBottom>
                      {prize.descripcion}
                    </Typography>
                    <Divider sx={{ my: 1, borderColor: '#555' }} />
                    <Typography variant="subtitle2" color="#a5d6a7">
                      🎯 Puntos: {prize.precioPuntos}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => handleEditClick(prize)}
                      variant="outlined"
                      sx={{ m: 1 }}
                    >
                      Editar
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </>
  );
};

export default PrizePage;
