import * as React from 'react';
import {useState} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Axios  from 'axios';
import Swal from 'sweetalert2'

export default function FormDialog(props) {
  
    const [editvalues,setEditValues] = useState({
        id:props.id,
        nome:props.nome,
        email:props.email,
        numero:props.numero
    })

    const handleEditDados = () => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Contato Editado!',
        showConfirmButton: false,
        timer: 1500
      })

        Axios.put("http://localhost:3000/edit",{
            id:editvalues.id,
            nome:editvalues.nome  || props.valuenome,
            email:editvalues.email || props.valueemail,
            numero:editvalues.numero || props.valuenumero 
        }).then(() => {
            props.setListDados(
                props.listDados.map((value) => {
                    return value.id == editvalues.id
                    ? {
                        id:editvalues.id || props.id,
                        nome:editvalues.nome  ||  props.valuenome,
                        email:editvalues.email  || props.valueemail,
                        numero:editvalues.numero || props.valuenumero
                    }
                    : value
                })
            )
        })
        handleClose()
        console.log(editvalues)
    }


    const handleDeleteValues = () => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Contato Deletado!',
        showConfirmButton: false,
        timer: 1500
      })
      Axios.delete(`http://localhost:3000/delete/${editvalues.id}`)
      
      handleClose()
      
    }

    const handleChangeValues = (values) => {
      setEditValues((prevValues) => ({
        ...prevValues,
        [values.target.id]: values.target.value,
      }));
    };


  const handleClose = () => {
    props.setOpen(false)
  };

  

  return (
    
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Editar</DialogTitle>
        <DialogContent>

          <TextField
            defaultValue={props.valuenome}
            onChange={handleChangeValues}
            autoFocus
            margin="dense"
            id="nome"
            label="Nome"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
           defaultValue={props.valueemail}
           onChange={handleChangeValues}
            autoFocus
            margin="dense"
            id="email"
            label="E-mail"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
           defaultValue={props.valuenumero}
           onChange={handleChangeValues}
            autoFocus
            margin="dense"
            id="numero"
            label="Número"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteValues}>Excluir</Button>
          <Button onClick={handleEditDados}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
