/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Icon,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { CloudUpload, DeleteForever } from '@mui/icons-material';

function FileInputElement({ formData, handleDeleteFile, handleInput, name }) {
  return (
    <Box display="flex" alignItems="center" paddingY={3}>
      <Typography color="grey">Nuevo logo: </Typography>
      <Box flexGrow={1} display="flex" justifyContent="center">
        {formData.crestUrl ? (
          <>
            <Typography
              fontSize="small"
              color="primary"
              sx={{ maxWidth: '80%', overflow: 'ellipsis', px: 1 }}>
              {formData.crestUrl.name}
            </Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteFile}
              sx={{ padding: 0.5, alignSelf: 'center' }}>
              <Icon>
                <DeleteForever sx={{ verticalAlign: 'top' }} />
              </Icon>
            </Button>
          </>
        ) : (
          <Button component="label" name={name} variant="contained" startIcon={<CloudUpload />}>
            Subir archivo
            <input type="file" name={name} hidden accept="image/*" onChange={handleInput} />
          </Button>
        )}
      </Box>
    </Box>
  );
}

function InputElement({ name, placeholder, text, handleInput, formData, error, success }) {
  return (
    <TextField
      variant="standard"
      placeholder={placeholder?.toString()}
      name={name}
      value={formData[name]}
      label={text}
      error={Boolean(error[name])}
      helperText={error[name]}
      color={success[name] ? 'success' : 'primary'}
      onChange={handleInput}
      sx={{ input: { color: 'white' }, label: { color: 'gray' } }}
    />
  );
}

function EditTeamForm({
  team,
  handleSubmit,
  toggleEdit,
  handleInput,
  formData,
  error,
  success,
  handleDeleteFile,
  toggleUpdate,
  isUpdating
}) {
  const { name, tla, founded, clubColors, venue, address, phone } = team;
  const properties = [
    {
      name: 'name',
      placeholder: name,
      text: 'Nuevo nombre del equipo:'
    },
    {
      name: 'tla',
      placeholder: tla,
      text: 'Abreviatura del equipo:'
    },
    {
      name: 'founded',
      placeholder: founded,
      text: 'Año fundación del club:'
    },
    {
      name: 'clubColors',
      placeholder: clubColors,
      text: 'Colores del equipo:'
    },
    {
      name: 'venue',
      placeholder: venue,
      text: 'Nuevo nombre del estadio:'
    },
    {
      name: 'address',
      placeholder: address,
      text: 'Dirección:'
    },
    {
      name: 'phone',
      placeholder: phone,
      text: 'Teléfono:'
    }
  ];

  return (
    <Container>
      <Box
        component="form"
        sx={{
          width: '90%',
          margin: 'auto',
          backgroundColor: 'rgba(0,0,0,0.1)',
          padding: 2
        }}>
        <Dialog
          open={isUpdating}
          PaperProps={{
            style: { color: 'ghostwhite', backgroundColor: 'rgba(0,0,0,0.97)', padding: 10 }
          }}
          onClose={() => {}}>
          <DialogTitle id="alert-dialog-title">¿Desea realizar los cambios?</DialogTitle>
          <DialogActions sx={{ margin: 'auto' }}>
            <Button variant="outlined" color="success" onClick={handleSubmit}>
              Aceptar
            </Button>
            <Button
              variant="outlined"
              id="cancel-update"
              color="error"
              onClick={toggleUpdate}
              autoFocus>
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>

        <Stack spacing={2} mb={2}>
          {properties.map(({ name: propertyName, placeholder, text }) => {
            return (
              <InputElement
                key={propertyName}
                handleInput={handleInput}
                error={error}
                success={success}
                formData={formData}
                name={propertyName}
                placeholder={placeholder}
                text={text}
              />
            );
          })}

          <FileInputElement
            formData={formData}
            handleDeleteFile={handleDeleteFile}
            handleInput={handleInput}
            name="crestUrl"
          />
        </Stack>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 4, mb: 1 }}>
          <Button variant="outlined" color="success" onClick={toggleUpdate}>
            Enviar
          </Button>
          <Button variant="outlined" color="warning" onClick={toggleEdit}>
            Salir sin editar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default EditTeamForm;
