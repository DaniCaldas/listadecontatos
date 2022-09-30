import './contacts.css'
import FormDialog from './Dialog'
import {useState} from 'react'

export default function Contacts({nome,email,numero,id,values,setValues}){


    const [open,setOpen] = useState(false)

    const handleCLickOpen = () => {
        setOpen(true)
    }


    return(
        <>
        <FormDialog 
        open={open} 
        setOpen={setOpen}
        valuenome={nome}
        valueemail={email}
        valuenumero={numero}
        id={id}
        setListDados={setValues}
        listDados={values}
        />
        <div className="dados-container"  onClick={handleCLickOpen} >
            <p>Nome: {nome}</p>
           <hr />
            <p>E-mail: {email}</p>
            <hr />
            <p>Número: {numero}</p>
            <hr />
        </div>
        </>
    )
}