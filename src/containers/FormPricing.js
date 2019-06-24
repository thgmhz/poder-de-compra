import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

import { StateContext } from '../state'
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    margin: '20px 0'
  },
  textField: {
    width: '50%',
    '&:first-child': {
      marginRight: '10px'
    },
    '& input': { 
      fontSize: '1.5em'
    },
  },
  fields: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10
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

  const textFields = selectedCountries.map((country, index) => {
    const field = index === 0
      ? 'firstCountry'
      : 'secondCountry'

    return (
      <TextField
        key={country.name}
        label={`Preço ${country.referenceLabel}`}
        className={classes.textField}
        value={index === 0 ? firstCountry : secondCountry}
        type="number"
        onChange={updatePricing.bind(this, field)}
        margin="normal"
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment position="start">{country.coinSymbol}</InputAdornment>,
        }}
      />
    )
  })

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        Digite o preço de um produto:
      </Typography>
      <div className={classes.fields}>
        {textFields}
      </div>
    </div>
  )
}

export default FormPricing
