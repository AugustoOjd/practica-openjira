import {FC, useEffect, useReducer} from 'react'
import { EntriesContext, entriesReducer } from "./";
import { Entry } from '../../interfaces';
import {entriesApi} from '../../apis';
import { useSnackbar } from 'notistack';

export interface EntriesState {
    entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: []
}

interface props {
    children?: React.ReactNode;
}

export const EntriesProvider: FC<props> = ({children})=>{

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)
    const {enqueueSnackbar} = useSnackbar()

    const addNewEntry = async (description: string)=>{

        const { data } = await entriesApi.post<Entry>('/entries', {description})

        dispatch({type: '[Entry] Add-Entry', payload: data})
    }

    const updateEntry = async ({_id, description, status}: Entry, showSnackbar = false)=>{
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {description, status})

            dispatch({ type: '[Entry] ENTRY-UPDATED', payload: data})

            if(showSnackbar){
                enqueueSnackbar('Entrada actualizada', {
                    variant: 'success',
                    autoHideDuration: 200,
                    anchorOrigin:{
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
            }

        } catch (error) {
            console.log(error)
        }
        
    }

    const refreshEntries = async ()=>{
        const {data} = await entriesApi.get<Entry[]>('./entries')
        dispatch({ type: '[Entry] Refresh-Data', payload: data})
        console.log(data)
    }

    useEffect(() => {
        refreshEntries()
    }, [])
    
 
    return(
        <>
            <EntriesContext.Provider value={{
                ...state, 

                addNewEntry,
                updateEntry

            }}>

            {children}
            </EntriesContext.Provider>
        </>
    )
}