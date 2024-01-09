import React, { useEffect, useRef } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'
import { useState } from "react";
import useSWR from 'swr'
import { Editor } from '@tinymce/tinymce-react';
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/material";
import { getUser, userIsLoggedIn } from "../../services/auth";

import './Document.css'
import { width } from "@mui/system";
  
const Document = ({ setCurrentRoute }) => {
    const editorRef = useRef(null);
    const navigate = useNavigate();
    const params = useParams();

    const location = useLocation();
    setCurrentRoute(location.pathname)

    const fetcher = (...args) => fetch(...args).then(res => res.json())

    const { data, error, isLoading } = useSWR(`http://localhost:3002/document/${params.id === undefined ? 0 : params.id}`, fetcher, { refreshInterval: 5000 })
    const userId = getUser()
    

    const  [ titleVar , setTitle] = useState("")
    const  [ content , setContent] = useState("")


    const loadDoc = async ()=> {
      if(params.id !== undefined) {
        setTitle(data.doc.nome)
        setContent(data.doc.content)
      }
    }

    const updateDoc = async () => {
      if(params.id !== undefined){
          await fetch(`http://localhost:3002/document/${params.id}`, {
              method: 'PATCH',
              body: JSON.stringify({
                  nome: titleVar,
                  content: editorRef.current.getContent()
              }),
              headers: {
                  'Content-type': 'application/json; charset=UTF-8',
              },
          })
      }else{
          await fetch(`http://localhost:3002/document`, {
              method: 'POST',
              body: JSON.stringify({
                  nome: titleVar,
                  content: editorRef.current.getContent(),
                  id: userId.id
              }),
              headers: {
                  'Content-type': 'application/json; charset=UTF-8',
              },
          })
      }
    }
      

  useEffect(() => {
    if(params.id !== undefined) {
      loadDoc()
    }
  }, [data])

  useEffect(() => {
    userIsLoggedIn(navigate, null)
  }, [])


  return (
    <div style={{
      height: '120vh',
      width: '100%',
      background: 'lightgrey'
    }} >
      <Box style ={{
      padding: '10px',
    }}>

      <div style={{
        margin: 'auto',
        maxWidth: '1300px',
      }}>
         <TextField
          value={titleVar}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          label='Título'
          className="title-document-input"
          sx={{
            width: '100%',
            marginBottom: '-10px',
            borderRadius: '10px 10px 0px 0px',
            textAlign: 'center'
          }}
          InputLabelProps={{
            className: 'label-title'
          }}
          >
        </TextField>


        <div
        style={{
          border: '1px solid grey',
          borderRadius: '0px 0px 10px 10px',

        }}
        >
        <Editor
        
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={content}
        init={{
          
          height: 650,
          menubar: false,
          plugins: [
            'save'
          ],
          theme_advanced_buttons3_add : "save",
          toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          statusbar: false,
          entity_encoding: 'raw',

        }}
         />
        </div>
      <Button onClick={updateDoc} 
      style={{
        background: 'black',
        marginTop: '10px',
        float: 'right',
        marginBottom: '100px'
        }}
      size='large'
      variant="contained">Salvar alterações</Button>
      </div>

    </Box>

    </div>
  )
}

export default Document