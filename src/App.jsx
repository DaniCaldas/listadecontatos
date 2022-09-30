import './App.css'
import {AiFillPhone} from 'react-icons/ai'
import {useState,useEffect} from 'react'
import  Axios  from 'axios'
import Contacts from './components/Contacts'
import Swal from 'sweetalert2'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

function App() {

  const [values, setValues] = useState()
  const [contacts, setContacts] = useState([])

  function handleChange(event){
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value
    }))
  }

  function handleClick(){

    let inputnome = document.getElementById('nome').value
    var inputemail = document.getElementById('email').value
    var inputnumero = document.getElementById('numero').value

    if(inputnome == '' || inputemail =='' || inputnumero == ''){
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Ops... Algo deu errado!',
        showConfirmButton: false,
        timer: 1500
      })
    
    }
    else{
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Contato Salvo!',
        showConfirmButton: false,
        timer: 1500
      })

    Axios.post("http://localhost:3000/register",{
      id:values.id,
      nome: values.nome,
      email: values.email,
      numero: values.numero
    })
    .then(() =>{
      Axios.post("http://localhost:3000/search", {
        id:values.id,
        nome: values.nome,
        email: values.email,
        numero: values.numero

      }).then(
        (response) => {
        setContacts([
          ...contacts,
          {
            id: values.id,
            nome: values.nome,
            email: values.email,
            numero: values.numero
          }
        ])
      })
    })    
  }
   
  }

  useEffect(()=>{
    Axios.get("http://localhost:3000/getcontacts")
    .then((response)=>{
      setContacts(response.data)
      console.log(contacts)
    })
  },[contacts])
  

  return (
    
    <div>
      

        <div className="container">
          <h1>Lista de Contatos<AiFillPhone/></h1>

        <Stack
          component="form"
          sx={{
            width: '35ch',
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
          label="Nome"
          id="nome"
          style={{ marginBottom: 20}}
          
          size="small"
          onChange={handleChange}
          name="nome"
          />
          
          <TextField
          label="E-mail"
          id="email"
          style={{ marginBottom: 20}}
          defaultValue=""
          size="small"
          onChange={handleChange}
          name="email"
          />

          <TextField
          label="Número"
          id="numero"
          style={{ marginBottom: 20}}
          defaultValue=""
          size="small"
          onChange={handleChange}
          name="numero"
          />
          </Stack>

          <button onClick={handleClick}>Adicionar</button>
          <p>Adicione seus Contatos</p>
        </div>
        <div className='dados'>
      
          {typeof contacts !== "undefined" &&
                contacts.map((contact) =>{
                  return (
                  <Contacts
                  key={contact.id}
                  nome={contact.nome}
                  numero={contact.numero}
                  email={contact.email}
                  id={contact.id}
                  values={contacts}
                  setValues={setContacts}
                  />)
                })
              }
          </div>
    </div>
  )
}

export default App
