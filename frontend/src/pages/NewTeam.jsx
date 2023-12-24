/* eslint-disable react/prop-types */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
import useOneTeam from '../hooks/useOneTeam';

function FileInputElement({ formData, handleDeleteFile, handleInput, name }) {
  return (
    <Box display="flex" alignItems="center" paddingY={3}>
      <Typography color="grey">Logo:</Typography>
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

export default function NewTeamForm() {
  const {
    isUpdating: isCreating,
    toggleUpdate: toggleCreate,
    handleInput,
    error,
    success,
    formData,
    handleDeleteFile,
    handleSubmit
  } = useOneTeam();
  const properties = [
    {
      name: 'name',
      placeholder: 'Chelsea FC',
      text: 'Nombre del equipo:'
    },
    {
      name: 'tla',
      placeholder: 'CHE',
      text: 'Abreviatura del equipo:'
    },
    {
      name: 'founded',
      placeholder: '1905',
      text: 'Año fundación del club:'
    },
    {
      name: 'clubColors',
      placeholder: 'Royal Blue / White',
      text: 'Colores del equipo:'
    },
    {
      name: 'venue',
      placeholder: 'Stamford Bridge',
      text: 'Nuevo nombre del estadio:'
    },
    {
      name: 'address',
      placeholder: 'Fulham Road London SW6 1HS',
      text: 'Dirección:'
    },
    {
      name: 'phone',
      placeholder: '+44 (0871) 9841955',
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
          open={isCreating}
          PaperProps={{
            style: { color: 'ghostwhite', backgroundColor: 'rgba(0,0,0,0.97)', padding: 10 }
          }}>
          <DialogTitle id="alert-dialog-title">{`¿Desea crear el equipo ${formData.name}?`}</DialogTitle>
          <DialogActions sx={{ margin: 'auto' }}>
            <Button
              variant="outlined"
              id="create-new-team"
              color="success"
              onClick={(e) => handleSubmit(e)}>
              Aceptar
            </Button>
            <Button
              variant="outlined"
              id="cancel-update"
              color="error"
              onClick={toggleCreate}
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
          <Button variant="outlined" id="isCreating" color="success" onClick={toggleCreate}>
            Enviar
          </Button>
          <Button variant="outlined" color="warning">
            <Link to="/">Salir sin editar</Link>
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

// function InputElement({ name, error, placeholder, text, type = 'text' }) {
//   return (
//     <label htmlFor={name} className="relative w-fit">
//       {text}{' '}
//       <input
//         type={type}
//         id={name}
//         name={name}
//         placeholder={`${placeholder}`}
//         className={`px-1 outline-none border border-transparent ${
//           error && name === 'name' ? 'border-red-400' : ''
//         } text-black focus:border-sky-400`}
//       />
//       {error && (
//         <span className="absolute text-xs top-1 ml-1 whitespace-nowrap text-red-400">
//           Nombre requerido
//         </span>
//       )}
//     </label>
//   );
// }

// function NewTeam() {
//   const navigate = useNavigate();
//   const [isName, setIsName] = useState(false);

//   const handleUpload = (e) => {
//     e.preventDefault();
//     if (!e.currentTarget.name.value) {
//       setIsName(true);
//       return;
//     }

//     fetch('http://localhost:8080/new-team', {
//       method: 'post',
//       body: new FormData(e.currentTarget)
//     })
//       .then((res) => res.json())
//       .then((data) => navigate(`/${data.id}`));
//   };

//   return (
//     <form className="flex flex-col items-center gap-2" onSubmit={handleUpload}>
//       <h3 className="text-3xl font-bold tracking-wider mb-4">Nuevo equipo</h3>
//       <InputElement error={isName} name="name" placeholder="Chelsea FC" text="Nombre del equipo:" />
//       <InputElement name="tla" placeholder="CHE" text="Abreviatura:" />
//       <InputElement name="founded" placeholder="1905" text="Año fundación del club:" />
//       <InputElement name="website" placeholder="www.chelseafc.com" text="Website del club:" />
//       <InputElement name="clubColors" placeholder="Blue / White" text="Colores del equipo:" />
//       <InputElement name="venue" placeholder="Stamford Bridge" text="Nombre del estadio:" />
//       <InputElement name="email" placeholder="chelsea@chelsea.com" text="E-mail del club:" />
//       <InputElement name="file" text="Logo del club:" type="file" />
//       <input
//         type="submit"
//         className="w-1/3 transition border cursor-pointer hover:bg-black/50"
//         value="Enviar"
//       />
//       <Link to="/" className="w-1/3 text-center transition border hover:bg-black/50">
//         Salir sin crear
//       </Link>
//     </form>
//   );
// }

// export default NewTeam;
