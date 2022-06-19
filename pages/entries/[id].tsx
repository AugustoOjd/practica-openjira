import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton, Input } from '@mui/material'
import React, {ChangeEvent, useState} from 'react'
import { Layout } from '../../components/layouts'
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import { Entry, EntryStatus } from '../../interfaces';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useMemo, FC, useContext } from 'react';
import { GetServerSideProps } from 'next';
import { EntriesContext } from '../../context/entries';
import { dbEntries } from '../../database';
import { dateFunction } from '../../utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];


interface Props{
    entry: Entry
}


const EntryPage:FC<Props> = ({entry}) => {


    const { updateEntry } = useContext(EntriesContext)


    const [InputValue, setInputValue] = useState(entry.description)
    const [Status, setStatus] = useState<EntryStatus>(entry.status)
    const [Touched, setTouched] = useState(false)

    const isNotValid = useMemo(()=> InputValue.length <= 0 && Touched, [InputValue, Touched])

    const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>)=>{
        setInputValue(event.target.value)
    }

    const onStatusChanged= (event: ChangeEvent<HTMLInputElement>)=>{
        setStatus(event.target.value as EntryStatus)
    }

    const onSave = ()=>{

        if(InputValue.trim().length === 0) return

        const updatedEntry: Entry ={
            ...entry,
            status: Status,
            description: InputValue

        }

        updateEntry( updatedEntry, true )
    }

  return (
    <>
        <Layout title={ InputValue.substring(0, 10) + '...'}>
            
            <Grid
                container
                justifyContent={'center'}
                sx={{marginTop: 2}}>
                
                <Grid item xs={12} sm={8} md={6}>

                    <Card>
                        <CardHeader 
                        title={`Entrada: ${InputValue}`}
                        subheader={`Creada ${ dateFunction.getFormatDistanceNow(entry.createdAt)}`}>

                        </CardHeader>
                        <CardContent>
                            <TextField
                                sx={{marginTop: 2, marginBottom: 1}}
                                fullWidth
                                placeholder='Nueva entrada'
                                autoFocus
                                multiline
                                label='Nueva entrada'
                                value={InputValue}
                                onChange={onInputValueChanged }
                                helperText={ isNotValid && 'Ingrese un valor'}
                                onBlur={()=> setTouched(true)}
                                error={isNotValid}
                                >

                            </TextField>

                            <FormControl>
                                <FormLabel>
                                    Estado:
                                </FormLabel>
                                <RadioGroup row value={Status} onChange={onStatusChanged}>
                                    {
                                        validStatus.map(option => (
                                            <FormControlLabel key={option} value={option} control={<Radio/>} label={capitalize(option)} />

                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>

                        <CardActions>
                            <Button
                                startIcon={<SaveAsOutlinedIcon/>}
                                variant='contained'
                                fullWidth
                                onClick={onSave}
                                disabled={ InputValue.length <= 0 }
                            >
                                Guardar
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            <IconButton sx={{ position: 'fixed', bottom: 30, right: 30, backgroundColor: 'error.dark'}}>
                <DeleteOutlineOutlinedIcon/>
            </IconButton>
        </Layout>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async ({params})=>{
    
    const { id } = params as {id: string}

    const entry = await dbEntries.getEntryById(id)

    if( !entry ){
        return {
            redirect:{
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props:{
            entry
        }
    }
}

export default EntryPage