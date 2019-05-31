import React, { useState, useContext } from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import ArrowIcon from '@material-ui/icons/ArrowDropDown';
import { makeStyles } from '@material-ui/core/styles'

import { StateContext } from '../state'

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 0 60px',
  },
  countryButton: {
    fontSize: '1.3em',
    fontWeight: 'bold',
    boxShadow: 'none',
  },
  versus: {
    margin: '0 20px',
    fontSize: '0.8em',
  },
  rightIcon: {
    marginLeft: '5px'
  }
}))

const CountryVSCountry = () => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)
  const { state, dispatch } = useContext(StateContext)
  const { countries, selectedCountries } = state

  const firstCountry = selectedCountries[0]
  const secondCountry = selectedCountries[1]

  const handleClick = (countryId, event) => {
    console.log(event)
    setAnchorEl(event.currentTarget)
  }
  
  const handleClose = (countryId, event) => {
    console.log(countryId)
    setAnchorEl(null)
  }

  return (
    <div className={classes.wrapper}>
      <Button
        color="primary"
        variant="outlined"
        className={classes.countryButton}
        onClick={handleClick.bind(this, firstCountry.id)}
        aria-owns={anchorEl ? 'countries-menu' : null}
        aria-haspopup={true}
      >
        {firstCountry.label}
        <ArrowIcon className={classes.rightIcon} />
      </Button>
      <Typography variant="h6" className={classes.versus}>
        X
      </Typography>
      <Button
        color="primary"
        variant="outlined"
        className={classes.countryButton}
        onClick={handleClick.bind(this, secondCountry.id)}
        aria-owns={anchorEl ? 'countries-menu' : null}
        aria-haspopup={true}
      >
        {secondCountry.label}
        <ArrowIcon className={classes.rightIcon} />
      </Button>
      <Menu
        id="countries-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {
          countries.map(country => (
            <MenuItem onClick={handleClose.bind(this, country.id)}>
              {country.label}
            </MenuItem>
          ))
        }
      </Menu>
    </div>
  )
}

export default CountryVSCountry
