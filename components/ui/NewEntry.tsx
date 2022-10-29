import { ChangeEvent, useContext, useState } from 'react';

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import { Button, Box, TextField } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

export const NewEntry = () => {
  const [inputValue, setInputValue] = useState('')
  const [touched, setTouched] = useState(false)

  const { addNewEntry } = useContext(EntriesContext)
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext)

  const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onSave = () => {
    if (inputValue.length === 0) return;

    addNewEntry(inputValue)
    setIsAddingEntry(false)
    setTouched(false)
    setInputValue('')
  }

  const onCancel = () => {
    setIsAddingEntry(false)
    setTouched(false)
    setInputValue('')
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>
      {
        isAddingEntry ? (
          <>
            <TextField
              fullWidth
              sx={{ marginTop: 2, marginBottom: 1}}
              placeholder='Nueva entrada'
              autoFocus
              multiline
              label='nueva entrada'
              helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
              error={inputValue.length <= 0 && touched}
              value={inputValue}
              onBlur={() => setTouched(true)}
              onChange={onTextFieldChanges}
            />

            <Box display='flex' justifyContent='space-between'>
              <Button
                variant='text'
                onClick={onCancel}
              >
                Cancelar
              </Button>

              <Button
                variant='outlined'
                color='secondary'
                endIcon={<SaveOutlinedIcon />}
                onClick={onSave}
              >
                Guardar
              </Button>
            </Box>
          </>
        ) : (
          <Button
            startIcon={<AddCircleOutlinedIcon />}
            fullWidth
            variant='outlined'
            onClick={() => setIsAddingEntry(true)}
          >
            Agregar
          </Button>
        )
      }
    </Box>
  )
}
