import type { NextPage } from 'next'
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import { Layout } from '../components/layouts/Layout'
import { EntryList, NewEntry } from '../components/ui'

const HomePage: NextPage = () => {
  return (
    <Layout title='Home - OpenJira'>

      <Grid container spacing={2}>

        <Grid item xs={ 12 } sm={ 4 }>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Pendientes" />
          
            <CardContent>
              <NewEntry />
              <EntryList status='pending' />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={ 12 } sm={ 4 }>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="En Progreso" />

            <CardContent>
              <EntryList status='in-progress' />
              {/* Mostrar listado */}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={ 12 } sm={ 4 }>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Completados" />

            <CardContent>
              <EntryList status='finished' />
              {/* Mostrar listado */}
            </CardContent>
          </Card>
        </Grid>

      </Grid>

    </Layout>
  )
}

export default HomePage
