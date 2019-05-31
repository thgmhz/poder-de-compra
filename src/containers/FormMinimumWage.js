import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Typography from '@material-ui/core/Typography'

import { StateContext } from '../state'

const useStyles = makeStyles(() => ({
  title: {
    alignSelf: 'flex-start',
    marginBottom: '10px'
  },
  textField: {
    width: '50%',
    margin: '10px',
  },
  formWrapper: {
    display: 'flex',
    width: '100%',
    margin: '0 0 10px'
  },
  card: {
    width: '100%',
    margin: '10px 0',
    textAlign: 'center'
  }
}))

const FormMinimumWage = () => {
  const classes = useStyles()

  const { state, dispatch } = useContext(StateContext)
  const { selectedCountries } = state

  const updateMinimumWage = (country, event) => dispatch({
    type: 'UPDATE_MINIMUM_WAGE',
    payload: {
      country,
      minimumWage: event.target.value
    }
  })

  const textFields = selectedCountries.map(country => (
    <TextField
      key={country.name}
      label={country.label}
      className={classes.textField}
      value={country.minimumWage}
      type="tel"
      onChange={updateMinimumWage.bind(this, country.name)}
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
        Salário Mínimo
      </Typography>
      <div className={classes.formWrapper}>
        {textFields}
      </div>
    </React.Fragment>
  )
}

export default FormMinimumWage
