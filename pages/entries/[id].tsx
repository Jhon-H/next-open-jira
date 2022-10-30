import { ChangeEvent, useContext, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { isValidObjectId } from "mongoose";

import {
  Button,
  capitalize,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  IconButton,
  TextField,
} from "@mui/material"
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { dbEntries } from "../../database";
import { dateFunctions } from "../../utils";
import { EntriesContext } from "../../context/entries";
import { Entry, EntryStatus } from "../../interfaces";
import { Layout } from "../../components/layouts"


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
  entry: Entry
}

const EntryPage = ({ entry }: Props) => {  
  const router = useRouter()

  const { updateEntry, deleteEntry } = useContext(EntriesContext)

  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [touched, setTouched] = useState(false)

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus( event.target.value as EntryStatus )
  }

  const onSave = () => {
    if (inputValue.trim().length === 0) return

    const updateEntryVal: Entry = {
      ...entry,
      status,
      description: inputValue
    }

    updateEntry(updateEntryVal, true)
  }

  const onDelete = () => {
    deleteEntry(entry._id, true)
    router.push('/')
  }

  return (
    <Layout title={inputValue.length <= 6 ? inputValue : inputValue.substring(0, 7) + '...'}>
      <Grid
        container
        justifyContent='center'
        sx={{ marginTop: 2 }}
      >

        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader 
              title="Entrada:"
              subheader={`Creada hace ${dateFunctions.getFormatDistanceToNow(entry.createdAt)} minutos.`}
            />

            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva entada"
                autoFocus
                multiline
                value={inputValue}
                label="Nueva entrada"
                helperText={isNotValid && "Ingrese un valor"}
                onBlur={() => setTouched(true)}
                error={isNotValid}
                onChange={onTextFieldChanged}
              />

              <FormControl>
                <FormLabel>Estado: </FormLabel>
                <RadioGroup
                  row
                  value={status}
                  onChange={onStatusChanged}
                >
                  {
                    validStatus.map( option => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={capitalize(option)}
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActions>
              <Button
                startIcon={<SaveAsOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 0}
              >
                Save
              </Button>
            </CardActions>

          </Card>
        </Grid>
      </Grid>

      <Button onClick={onDelete} >
        <IconButton sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'error.dark'
        }}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Button>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const { id } = params as { id: string };

  
  const entry = await dbEntries.getEntryById(id)
  
  if (!isValidObjectId(id)) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  } 

  console.log('execute god')
  
  return {
    props: {
      entry
    }
  }
}

export default EntryPage
