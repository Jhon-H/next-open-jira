import { DragEvent, useContext } from 'react'
import { useRouter } from 'next/router';

import { Card, CardActionArea, CardContent, CardActions, Typography } from '@mui/material'

import { Entry } from '../../interfaces/entry';
import { dateFunctions } from '../../utils';
import { UIContext } from '../../context/ui';

interface Props {
  entry: Entry;
}

export const EntryCard = ({ entry }: Props) => {
  const { startDragging, endDragging } = useContext(UIContext)
  const router = useRouter()

  const onDragStart = (event: DragEvent) => {
    startDragging()
    event.dataTransfer.setData('text', entry._id)
    
  }
  
  const onDragEnd = () => {
    endDragging()
  }

  const onClick = () => {
    router.push(`/entries/${entry._id}`)
  }

  return (
    <Card
      sx={{ marginBottom: 1}}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {entry.description}
          </Typography>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'end', }}>
          <Typography variant='body2'>{dateFunctions.getFormatDistanceToNow(entry.createdAt)}</Typography>
        </CardActions>
      </CardActionArea>

    </Card>
  )
}
