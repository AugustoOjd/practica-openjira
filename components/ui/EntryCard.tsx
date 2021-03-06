import { FC, DragEvent, useContext, useEffect } from 'react';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../interfaces/entry';
import { UIContext } from '../../context/ui';
import { useRouter } from 'next/router';
import { dateFunction } from '../../utils';



interface Props {
    entry: Entry
}

export const EntryCard: FC<Props> = ({entry}) => {

    const { startDragging, endDragging } = useContext(UIContext)
    const router = useRouter()

    const onDragStart = (event: DragEvent)=>{
        event.dataTransfer.setData('text', entry._id)
        startDragging()
    }

    const onDragEnd = ()=>{
        endDragging()
    }

    const onClick = ()=>{
        router.push(`/entries/${entry._id}`)
    }

  return (
    <Card
        onClick={onClick}
        sx={{ marginBottom: 1}}
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        >
            <CardActionArea>

                <CardContent>

                    <Typography sx={{whiteSpace: 'pre-line'}}>
                        {entry.description}
                    </Typography>

                    <CardActions>
                        <Typography variant='body2'>
                            { dateFunction.getFormatDistanceNow( entry.createdAt )}
                        </Typography>
                    </CardActions>
                </CardContent>
            </CardActionArea>
    </Card>
  )
}
