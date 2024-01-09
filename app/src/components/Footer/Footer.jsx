import React from "react";
import "./Footer.css"

import { Box, Button, Stack, TextField  } from "@mui/material";


const Footer = () => {

    return( <>

        <div id="footer-div">
            <div id="footer-infos">
                <Stack
                    direction="column"
                    justifyContent="center"
                    spacing={2}>
                
                        <li className="title">Dados Pessoais</li>
                        <li>Minha conta</li>
                        <li>Meus pedidos</li>
                        <li>Meu Carrinho</li>
                </Stack>
                <Stack
                    direction="column"
                    justifyContent="center"
                    spacing={2}>
                        <li className="title">Dúvidas frequentes</li>
                        <li>Como comprar</li>
                        <li>Entrega e frete</li>
                        <li>Trocas e devoluções</li>
                        <li>Formas de pagamento</li>
                        <li>Politica de segurança</li>
                        <li>Politica de privacidade</li>
                        <li>Fale conosco</li>
                </Stack>
                <Stack
                    direction="column"
                    justifyContent="center"
                    spacing={2}>
                
                        <li className="title">Fale conosco</li>
                        <li>SAC(XX) XXXX-XXXX</li>
                        <li>Horários de atendimento</li>
                        <div id="footer-social-media"></div>
                </Stack>
            </div>
            <div id="footer-newsletter">
                <h4>Olá!</h4>
                <p>Para receber novidades e promoções exclusivas da OnlineDocs, <br></br> assine nosso NewsLetter.</p>
                <TextField id="standard-basic" style={{backgroundColor: 'rgb(238, 238, 238)', marginBottom: '10px'}} label="Digite seu email" variant="standard" color="action" />
                <Button variant="contained" fullWidth color="success" > Assinar </Button>
            </div>

            

        </div>

        

        
    </> )
    
}

export default Footer