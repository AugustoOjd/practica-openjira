import { FC, useContext, useMemo, DragEvent } from 'react';
import {List, Paper} from '@mui/material'
import { EntryCard } from './EntryCard';
import { EntryStatus } from '../../interfaces';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

interface Props {
    status: EntryStatus
}

export const EntryList: FC<Props> = ({status}) => {

    const {entries, updateEntry} = useContext(EntriesContext)
    const { isDragging, endDragging } = useContext(UIContext)

    const entriesByStatus = useMemo( ()=> entries.filter(entry => entry.status === status),  [entries]);
    
    const onDropEntry = (event: DragEvent<HTMLDivElement>)=>{
        const id = event.dataTransfer.getData('text')
        
        const entry = entries.find( e => e._id === id)!;
        entry.status = status
        updateEntry(entry)
        endDragging()
    }

    const allowDrop = (event: DragEvent<HTMLDivElement>)=>{
        event.preventDefault()
    }
  return (
    <>
        <div onDrop={onDropEntry} onDragOver={allowDrop}>
            <Paper sx={{ height: 'calc(100vh - 250px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '3px 5px'  }}>
                <List sx={{ opacity: isDragging ? 0.5 : 1, transition: 'all .3s'}}>
                    {
                        entriesByStatus.map( entry=> (
                                <EntryCard key={entry._id} entry={entry} />
                        ))
                    }
                    
                </List>
            </Paper>
        </div>
    </>
  )
}
