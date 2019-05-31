import React, { useContext } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import Page from '../components/Page'
import ChooseCountries from '../containers/ChooseCountries'
import FormPricing from '../containers/FormPricing'

import { StateContext } from '../state'

const useStyles = makeStyles(() => ({
  card: {
    width: '100%',
    margin: '10px 0',
    textAlign: 'center'
  },
  seila: {
    display: 'flex',
  }
}))

const getPercentageOnMinimumWage = ({ pricing, minimumWage }) => {
  const result = pricing * 100 / minimumWage
  
  const response = result === Infinity
    ? 0
    : result

  return Number(response.toFixed(2))
}

const getMoreExpensiveCountry = ({ selectedCountries, pricing }) => {
  const firstCountry = {
    ...selectedCountries[0],
    percentage: getPercentageOnMinimumWage({
      pricing: pricing.firstCountry,
      minimumWage: selectedCountries[0].minimumWage
    })
  }

  const secondCountry = {
    ...selectedCountries[1],
    percentage: getPercentageOnMinimumWage({
      pricing: pricing.secondCountry,
      minimumWage: selectedCountries[1].minimumWage
    })
  }

  const isFirstCountryMoreExpensive = firstCountry.percentage > secondCountry.percentage

  const response = isFirstCountryMoreExpensive
    ? {
      moreExpensiveCountry: firstCountry,
      lessExpensiveCountry: secondCountry,
      differenceBetween: firstCountry.percentage - secondCountry.percentage,
    } : {
      moreExpensiveCountry: secondCountry, 
      lessExpensiveCountry: firstCountry,
      differenceBetween: secondCountry.percentage - firstCountry.percentage,
    }

  return response
}

const PriceComparision = () => {
  const classes = useStyles()

  const { state } = useContext(StateContext)
  const { selectedCountries, pricing } = state

  const result = getMoreExpensiveCountry({
    selectedCountries,
    pricing,
  })

  const {
    moreExpensiveCountry,
    lessExpensiveCountry,
    differenceBetween,
  } = result 

  return (
    <Page>
      <ChooseCountries />
      <FormPricing />
      <Card className={classes.card}>
        <CardContent>
          <img src={ moreExpensiveCountry.icon } alt={moreExpensiveCountry.label} />
          <Typography gutterBottom variant="h6" component="h6">
            { differenceBetween.toFixed(2) }%
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            mais caro { moreExpensiveCountry.referenceLabel }
          </Typography>
        </CardContent>
      </Card>
      <div className={classes.seila}>
        <Card className={classes.card}>
          <CardContent>
            <img src={ moreExpensiveCountry.icon } alt={moreExpensiveCountry.label} />
            <Typography gutterBottom variant="h6" component="h6">
              { moreExpensiveCountry.percentage }%
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              do salário mínimo { moreExpensiveCountry.referenceLabel }
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <img src={ lessExpensiveCountry.icon } alt={lessExpensiveCountry.label} />
            <Typography gutterBottom variant="h6" component="h6">
              { lessExpensiveCountry.percentage }%
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              do salário mínimo { lessExpensiveCountry.referenceLabel }
            </Typography>
          </CardContent>
        </Card>
      </div>
    </Page>
  )
}

export default PriceComparision