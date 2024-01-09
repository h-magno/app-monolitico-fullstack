import { Stack, Grid, TextField, Box, Button } from "@mui/material"
import { fontSize, height } from "@mui/system"
import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import './RegisterBG.css'
import { register, userIsLoggedIn, emailValidation } from "../../services/auth"

import { useNavigate } from "react-router-dom"
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  
  
  const Register = ({ setCurrentRoute }) => {
      const [open, setOpen] = React.useState(false);
      const [open2, setOpen2] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleOpen2 = () => setOpen2(true);
      const handleClose = () => setOpen(false);    
    const handleClose2 = () => setOpen2(false);    

    const navigate = useNavigate()
    const location = useLocation()
    setCurrentRoute(location.pathname)

    useEffect(() => {
        userIsLoggedIn(navigate, location.pathname)
      }, [])

    const [ email , setEmail ] = useState("") 
    const [ password , setPassword ] = useState("") 
    const [ name , setName ] = useState("") 
    const [ username , setUsername ] = useState("") 

    const [validEmail, setEmailValidation] = useState(false)


    
    const emailValidation = (email) => {
        const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        console.log(regEx.test(email))
        if(regEx.test(email)){
            setEmailValidation(true)
            return true

        }
        else {
            handleOpen2()
            return false
        }
    }



    return <Grid container spacing={0} style={{background: 'white'}} >
        <Grid   item xs={0} sm={6} md={6} xl={6} >
            <Box >
                <div className='bg-register-img'> </div>
            </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6} xl={6}
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}  >
            <Stack alignItems={'center'} spacing={2} >

                <img width={'25%'} alt="logo Online Docs" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/TK_archive_icon.svg/1024px-TK_archive_icon.svg.png"></img>
                <h1 style={{fontSize: '40px'}}>ONLINE DOCS</h1>
                <p style={{fontSize: '15px'}}>Registre-se</p>
                <Stack justifyContent={'center'} style={{width: '50%'}} spacing={2}>
                    <TextField
                        value={email}
                        style={{background: 'white'}}
                        fullWidth={true}
                        label='Email'
                        type={'email'}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => {
                            emailValidation(email)
                        } }
                    >
                    </TextField>
                    <TextField
                        value={username}
                        style={{background: 'white'}}
                        fullWidth={true}
                        label='Username'
                        onChange={(e) => setUsername(e.target.value)}
                    >
                    </TextField>
                    <TextField
                        value={name}
                        style={{background: 'white'}}
                        fullWidth={true}
                        label='Nome'
                        onChange={(e) => setName(e.target.value)}
                    >
                    </TextField>
                    <TextField
                    style={{background: 'white'}}
                        value={password}
                        fullWidth={true}
                        label='Password'
                        type={'password'}
                        onChange={(e) => setPassword(e.target.value)}
                        
                    >
                    </TextField>
                    {validEmail ? 
                        <Button 
                        variant="contained" 
                        onClick={async  () => {
                            const response = await register(email, username, name, password)
                            if(response.status === 200) {
                                handleOpen()
                                // TODO: Re-envio de email
                            }
                            else if ( response.status === 404) {
                                alert('Um erro aconteceu')
                            }
                        }}
                        > Registrar </Button>
                    :
                    <Button 
                        variant="contained" 
                        onClick={async  () => {
                            alert('Dados inválidos')
                        }}
                        > Registrar </Button>
                    }
                    
                    <Button 
                    variant="contained" 
                    onClick={() => {
                        navigate('/login')
                    }}
                    >
                            Entrar
                    </Button>

                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={styleModal}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                          Enviamos um email para: {email}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Complete seu registro para poder acessar o conteúdo.
                        </Typography>
                      </Box>
                    </Modal>
                    <Modal
                      open={open2}
                      onClose={handleClose2}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={styleModal}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                          Email inválido
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Exemplo: "exemple@random.com"
                        </Typography>
                      </Box>
                    </Modal>
                   
                </Stack>
            </Stack>
        </Grid>

    </Grid>
}

export default Register