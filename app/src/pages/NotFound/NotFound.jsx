import React, { useEffect, useRef } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import 'quill/dist/quill.snow.css'
import { useState } from "react";
import { Box } from "@mui/material";

import './NotFound.css'
import { height } from "@mui/system";


const NotFound = ({ setCurrentRoute }) => {

    const location = useLocation()
    setCurrentRoute(location.pathname)


    const navigate = useNavigate()

    useEffect(() => {
        navigate(`/not-found`)
    }, [])


  return (
<>
<div style={{
	width: '100vw',
	height: '100vh',
	background: 'black',
}}>
<figure>
	
	<div class="sad-mac"></div>
	<figcaption>
		<span class="sr-text">Error 404: Not Found</span>
		<span class="e"></span>
		<span class="r"></span>
		<span class="r"></span>
		<span class="o"></span>
		<span class="r"></span>
		<span class="_4"></span>
		<span class="_0"></span>
		<span class="_4"></span>
		<span class="n"></span>
		<span class="o"></span>
		<span class="t"></span>
		<span class="f"></span>
		<span class="o"></span>
		<span class="u"></span>
		<span class="n"></span>
		<span class="d"></span>
	</figcaption>
</figure>
</div>
</>
  );
}

export default NotFound