import React, { useState, useContext } from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ArrowIcon from '@material-ui/icons/ArrowDropDown'
import { makeStyles } from '@material-ui/core/styles'

import Image from '../components/Image'
import { StateContext } from '../state'

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    width: '100%'
  },
  countryButton: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '50%',
    fontSize: '1.3em',
    fontWeight: 'bold',
    boxShadow: 'none',
  },
  versus: {
    margin: '0 20px',
    fontSize: '0.8em',
    color: '#aaa'
  },
  rightIcon: {
    marginLeft: '5px'
  },
  disabled: {
    opacity: '0.5'
  }
}))

const CountryVSCountry = () => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)
  const [clickedCountryId, setClickedCountryId] = useState(null)
  
  const { state, dispatch } = useContext(StateContext)
  const { countries, selectedCountries } = state

  const firstCountry = selectedCountries[0]
  const secondCountry = selectedCountries[1]

  const handleSelectOpen = (countryId, event) => {
    setClickedCountryId(countryId)
    setAnchorEl(event.currentTarget)
  }
  
  const handleChooseCountry = ({ addId, removeId }) => {
    handleClose()
    dispatch({
      type: 'CHOOSE_COUNTRY',
      payload: { addId, removeId }
    })    
  }

  const handleClose = () => setAnchorEl(null)

  const countryAlreadySelected = (countryId) =>
    firstCountry.id === countryId || secondCountry.id === countryId
      ? true
      : false

  return (
    <div className={classes.wrapper}>
      <Button
        color="primary"
        variant="outlined"
        className={classes.countryButton}
        onClick={handleSelectOpen.bind(this, firstCountry.id)}
        aria-owns={anchorEl ? 'countries-menu' : null}
        aria-haspopup={true}
      >
        <span className={classes.label}>{firstCountry.label}</span>
        <ArrowIcon className={classes.rightIcon} />
      </Button>
      <Typography variant="h6" className={classes.versus}>
        vs
      </Typography>
      <Button
        color="primary"
        variant="outlined"
        className={classes.countryButton}
        onClick={handleSelectOpen.bind(this, secondCountry.id)}
        aria-owns={anchorEl ? 'countries-menu' : null}
        aria-haspopup={true}
      >
        <span className={classes.label}>{secondCountry.label}</span>
        <ArrowIcon className={classes.rightIcon} />
      </Button>
      <Menu
        id="countries-menu"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handleClose}
      >
        {
          countries.map(country => {
            let disabled = false

            if (countryAlreadySelected(country.id)) {
              disabled = true
            }

            const onClick = handleChooseCountry.bind(this, {
              addId: country.id,
              removeId: clickedCountryId
            })

            return (
              <MenuItem
                key={country.id}
                onClick={disabled ? null : onClick}
                className={disabled ? classes.disabled : null}
              >
                <ListItemIcon>
                  <Image
                    src={country.icon}
                    alt={country.label}
                    size="x-small"
                  />
                </ListItemIcon>
                <ListItemText primary={country.label} />
              </MenuItem>
            )
          })
        }
      </Menu>
    </div>
  )
}

export default CountryVSCountry
