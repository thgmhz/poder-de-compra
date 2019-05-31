import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Typography from '@material-ui/core/Typography'

import { StateContext } from '../state'

const useStyles = makeStyles(() => ({
  title: {
    alignSelf: 'flex-start',
    marginBottom: '5px'
  },
  subtitle: {
    alignSelf: 'flex-start',
    marginBottom: '10px'
  },
  textField: {
    width: '50%',
    '&:first-child': {
      marginRight: '10px'
    }
  },
  fields: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between'
  },
}))

const FormPricing = () => {
  const classes = useStyles()

  const { state, dispatch } = useContext(StateContext)
  const { pricing, selectedCountries } = state
  const { firstCountry, secondCountry } = pricing

  const updatePricing = (countryPos, event) => dispatch({
    type: 'UPDATE_PRICING',
    payload: {
      countryPos,
      value: event.target.value
    }
  })

  const textFields = selectedCountries.map((country, index) => (
    <TextField
      key={country.name}
      label={country.label}
      className={classes.textField}
      value={index === 0 ? firstCountry : secondCountry}
      type="tel"
      onChange={updatePricing.bind(this, index === 0 ? 'firstCountry' : 'secondCountry')}
      margin="normal"
      variant="outlined"
      InputProps={{
        startAdornment: <InputAdornment position="start">{country.coinSymbol}</InputAdornment>,
      }}
    />
  ))

  return (
    <React.Fragment>
      <Typography variant="h6" className={classes.title}>
        Preço
      </Typography>
      <Typography variant="subtitle2" className={classes.subtitle}>
        Digite o preço de um produto em cada país
      </Typography>
      <div className={classes.fields}>
        {textFields}
      </div>
    </React.Fragment>
  )
}

export default FormPricing
