import { Button, TextField } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Box } from '@mui/system';
import { useContext } from 'react';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui/';

export const NewEntry = () => {

    const {addNewEntry} = useContext(EntriesContext)
    const {isAddingEntry, setIsAddingEntry} = useContext(UIContext)

    const [IsAdding, setIsAdding] = useState(false)
    const [InputValue, setInputValue] = useState('')
    const [Touched, setTouched] = useState(false)

    const onTextChanges = (event: ChangeEvent<HTMLInputElement>)=>{
        setInputValue(event.target.value)
    }

    const onSave = ()=> {
        if(InputValue.length >= 0){
            addNewEntry(InputValue)
        }

            setIsAddingEntry(false)
            setTouched(false)
            setInputValue('')
    }

  return (
    <Box sx={{marginBottom: 2, paddingX: 1}}>

    {
        isAddingEntry ? (
            <>


    <TextField
        fullWidth
        sx={{marginTop: 2, marginBottom: 1}}
        placeholder= 'Nueva entrada'
        autoFocus
        label='Nueva Entrada'
        helperText={ InputValue.length <= 0 && Touched && 'Ingrese un valor'} 
        error={ InputValue.length <= 0 && Touched}
        value={InputValue}
        onChange={onTextChanges}
        onBlur={()=> setTouched(true) }
    />

    <Box display={'flex'} justifyContent={'space-between'}>
        <Button
            variant='outlined'
            color='secondary'
            endIcon={<SaveOutlinedIcon/>}
            onClick={onSave}
            >
                Guardar
        </Button>
        <Button
            variant='text'
            onClick={()=> setIsAddingEntry(false)}
            >
                Cancelar
        </Button>
    </Box>


    </>
        )

        :

        (
            <Button
            startIcon={<AddOutlinedIcon/>}
            fullWidth
            variant='outlined'
            onClick={() => setIsAddingEntry(true)}
            >
                Agregar nueva tarea
            </Button>
        )
    }
    </Box>
  )
}
