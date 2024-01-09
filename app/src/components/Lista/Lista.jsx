import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Lista.css'

    const Lista = ({style, columns, rows, isLoading}) =>  {
      return (
        <TableContainer component={Paper} style={style} >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>

                {
                columns.map((column, idx) => <TableCell key={`${idx}`}>{column.headerName}</TableCell> )
                }

              </TableRow>
            </TableHead>
            <TableBody>
              {

                isLoading ? 'Carregando' : 
                // TODO: add component de loading
    
                rows.length > 0 ? 
                (
                  rows.map((row, idx, e) => (
                    <TableRow key={`${idx}`} style ={ idx % 2? { background : "RGB(217 231 244)" }:{ background : "white" }} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    {
                        columns.map(column => {
                          // TODO: Alterar formatação das datas
                                // if(column.headerName === 'Última alteração' || column.headerName === 'Criado em') {
                                //  return row.updatedAt.slice(0, -15)

                                // }
                                if (column.action) {
                                  return column.action(row, row.updatedAt)
                                }
                                if (column.headerName === 'Prévia') {
                                  return  row.content.substring(3, 30).replace('<p>', '').replace('</p>', '')
                                }
                                else {
                                  if(column.id){
                                    return <TableCell 
                                              
                                              style={{ fontWeight: 'bold'}} 
                                              component="th"
                                              scope="row">{row[column.key]}
                                          
                                              </TableCell>
                                  }
                                  else{
                                      return <TableCell>{row[column.key]}</TableCell>
                                  }
                                }
                                
                            
                        })
                    }
                </TableRow>
                  ))
                )
                : 
                (
                  <>
                  <h2 style={{ padding: '30px'}}>Nenhum documento foi criado ainda.</h2>
                  <div className='indicator'></div>
                  </>
                )
              }
            </TableBody>
          </Table>
        </TableContainer>
      );
    
    }

    Lista.defaultProps = {
      style: {},
      columns: [],
      rows: [],
      isLoading: false
    }


export default Lista