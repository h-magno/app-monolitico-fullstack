import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Footer from "../../components/Footer/Footer.jsx";
import SearchIcon from '@mui/icons-material/Search';

import "./Home.css"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { width } from "@mui/system";

import { userIsLoggedIn } from "../../services/auth.js";

// require('dotenv').config()

const Home = () => {

  const navigate = useNavigate()


    return (

        <>
      
      <ul id="menu-area">
        <Link to="/home" id="logo-menu" >
          <div>Online Docs</div>
        </Link>
        
        <div id="searchbar-menu">
          <div id="lupa-icon">
            <SearchIcon 
              color="action"
              sx={{
                fontSize: "30px",
                marginLeft: '15px',
                marginTop: "8px"
              }}
            />           
            </div>
          <input type="text" placeholder="O que você está procurando?" ></input>
        </div>
        <div id="menu-topo">
          <li><NavLink to={"/home"}>HOME</NavLink></li>
          <li><NavLink to={"/documents"}>MEUS DOCUMENTOS</NavLink></li>
          {userIsLoggedIn() ? <li><NavLink to={"/profile"}>PERFIL</NavLink></li> : <li><NavLink to={"/login"}>LOGIN</NavLink></li>}
        </div>
      </ul>
      
      
      
       <div id="main-home">
       
        <Grid container spacing={2} id='bg-homepage' style={{
          flexDirection: 'column',
          background: 'black',

        }} >
            <Grid xl={12} md={12} sm={12} xs={12} item
            style={{
              padding: '0px',
              background: 'white',

            }}
            >
                <div
                style={{
                  padding: '0px 60px',
                  height: '1000px',
                  boxSizing: 'border-box',
                  background: 'lightgrey',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}>
                    <img alt='' 
                    style={{width: '250px'}}
                    src={`https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/TK_archive_icon.svg/1024px-TK_archive_icon.svg.png`}>
                    </img>
                  <p
                  style={{
                    fontSize: '20px',
                    textAlign: 'center',
                    margin: '30px 0px'
                  }}>
                    Online Docs tem o objetivo de criar e armazenar documentos pessoais com suporte para vídeos, imagens, gráficos, tabelas, e dashboards.
                    <br></br>Crie documentos impactantes com a OnlineDocs hoje mesmo!
                  </p>
                  <Link to={userIsLoggedIn() ? '/document' : '/login'}
                  style={{
                    color: 'black',
                    position: 'relative'
                  }}>
                  <Box
                  sx={{
                    width: '650px',
                    height: '350px',
                    cursor: 'pointer',
                    background: 'white',
                    borderRadius: '10px',
                  }}>
                    {userIsLoggedIn() ? <Box 
                        className="fake-document-box"
                         id="box4-coluna-direita-home" 
                         sx={{
                          boxSizing: 'border-box',
                          width: '100%',
                          height: '100%',
                          cursor: 'text',
                          position: 'relative',
                         '&:hover': {
                             transitionDuration: '0.5s'
                             }
                          }}>

                            <div
                              className="init-type"
                              style={{
                                height: '20px',
                                width: '2px',
                                top: '120px',
                                left: '20px',
                                zIndex: '98',
                                position: 'absolute',
                                cursor: 'pointer'
                              }}
                            ></div>
                    </Box> 
                    : 
                    <Box 
                        className="fake-document-box2"
                         id="box4-coluna-direita-home" 
                         sx={{
                          boxSizing: 'border-box',
                          width: '100%',
                          height: '100%',
                          cursor: 'pointer',
                          position: 'relative',
                         '&:hover': {
                             transitionDuration: '0.5s'
                             }
                          }}>

                            <div
                              className="init-type"
                              style={{
                                height: '20px',
                                width: '2px',
                                top: '120px',
                                left: '20px',
                                zIndex: '98',
                                position: 'absolute',

                              }}
                            ></div>
                    </Box>
                    }
                  </Box>
                </Link>

              </div>

            </Grid>
            <Grid xl={12} md={12} sm={12} xs={12} item>
                <div
                style={{
                  height: '700px',
                  display: 'flex',
                  justifyContent: 'center',
                  paddingTop: '70px',
                  boxSizing: 'border-box'
                }}>

                    <Box 
                         id="box4-coluna-direita-home" 
                         sx={{
                          width: '1000px',
                          height: '350px',
                          cursor: 'pointer',

                         background: 'white',

                         '&:hover': {
                             transform: 'scale(0.98)',
                             transitionDuration: '0.5s'
                             }
                          }}>

                    </Box>

              </div>

            </Grid>
            
                    
                
        </Grid>

        <Footer/>
       </div>
       </>
    )

}

export default Home


  // const editorRef = useRef(null);

  // const location = useLocation();
  // const params = useParams();

  // const fetcher = (...args) => fetch(...args).then(res => res.json())