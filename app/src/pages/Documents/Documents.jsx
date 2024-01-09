import { Grid, IconButton,Stack, FormControl, InputLabel, Select, Pagination, MenuItem } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material";
import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Lista }  from "../../components"
import useSWR from 'swr'
import { getUser, userIsLoggedIn } from "../../services/auth";
import axios from "axios";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import './Documents.css'
import Footer from "../../components/Footer/Footer";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



const fetcher = (...args)  => fetch(...args).then(res => res.json())

const Documents = ({ setCurrentRoute }) => {
    const [open, setOpen] = React.useState(false);
    const [deleteDoc, setDeleteDoc] = useState('')
    const handleClick = () => {
        setOpen(!open);
      };
      const deleteDocument = async (id) => {
        try {
            handleClick()
            await axios ({
                method: 'delete',
                url: `http://localhost:3002/document/${id}`,
                headers: { 'Content-Type': 'application/json'}
            })

        }
        catch(err) {
            alert('Erro ao deletar')
        }
    
}

    const location = useLocation()
    setCurrentRoute(location.pathname)
    const navigate = useNavigate()

    useEffect(() => {
        userIsLoggedIn(navigate, location.pathname)
      }, [])

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const user = getUser()


    const handleChange = (event, value) => {
        setPage(value)
    }

    const navTest = (param) => { navigate(`/${param}`) }

    const { data, error, isLoading } = useSWR(`http://localhost:3002/document?id=${user === null ? navTest('login') : user.id}&page=${page}&limit=${limit}`, fetcher, {refreshInterval: 5000})

    const columns = [
        { headerName: 'Título', key: 'nome', id: true },
        { headerName: 'Prévia', key: 'content', id: false },
        { headerName: 'Criado em', key: 'createdAt', id: false  },
        { headerName: 'Última alteração', key: 'updatedAt', id: false  },
        { headerName: 'Ações', key: 'null', id: false, action: (params) => {
            return <>
                
                <IconButton onClick={() =>  navigate(`/document/${params._id}`)} >
                    <Edit></Edit>
                </IconButton>
                <IconButton onClick={() => {
                    setDeleteDoc(params._id)
                    handleClick()
                }}
                >
                    <Delete></Delete>
                </IconButton>

            
            </>
        }  },
        
    ];
    

    let ListaProps = {
        style:{
            marginTop: '50px',
        },
        columns: columns,
        rows: data !== undefined ? data.document : []  ,
        isLoading
    }

    return <div 
    style={{
        background: 'white'
    }}>
    
    <Grid container spacing={2} justifyContent="center" style={{background: 'white '}}> 

    <Grid item xs={12} md={10} lg={10} xl={10} style={{background: 'white'}} > 
        {
            !error && data !== undefined ?  <Lista {...ListaProps}></Lista> : error ? 'Ocorreu um erro' : 'Não há dados para exibição' 
        }
         <Stack direction="row" justifyContent="space-between" style={{marginTop: '20px'}}>
            <Pagination count={data?.count} onChange={handleChange} ></Pagination>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="limit-page-label">Limite</InputLabel>
                                    <Select
                                        labelId="limit-page-label"
                                        id="limit-page"
                                        value={limit}
                                        onChange={(event) => {
                                            setLimit(event.target.value)
                                        }}
                                        label="Limit"
                                        >
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={15}>15</MenuItem>
                                </Select>
                            </FormControl>
        </Stack>
    </Grid>
    <Grid item xs={12} md={12} lg={12} xl={12}></Grid>
    </Grid>

        <Fab
        aria-label="add"
        onClick={ () => navigate('/document') }
        style={{position: 'fixed', bottom: '20px', right: '20px'}}  >
        <AddIcon/>
        </Fab>
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClick}
        aria-describedby="alert-dialog-slide-description"
        
      >
        <div style={{
            border: '2px solid black'
        }}>
        <DialogTitle >{"Tem certeza que deseja deleta esse arquivo?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Após deletar um item ele será enviado para a lixeira.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick}>Cancelar</Button>
          <Button onClick={() => {
                console.log(deleteDoc)
                deleteDocument(deleteDoc)
          }}>Sim</Button>
        </DialogActions>
        </div>
      </Dialog>
        {/* <Footer></Footer> */}
    </div>

    
}       

export default Documents