import React, { useContext } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import Page from '../components/Page'
import Image from '../components/Image'
import ChooseCountries from '../containers/ChooseCountries'
import FormPricing from '../containers/FormPricing'

import { StateContext } from '../state'

const useStyles = makeStyles(() => ({
  card: {
    width: '100%',
    margin: '10px 0',
    textAlign: 'center',
  },
  horizontalContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    '& h6': {
      fontSize: '1.8em',
      marginBottom: 0
    },
    '& p': {
      fontSize: '1.3em'
    }
  },
  twoCardsWrapper: {
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

const getHowMuchItBuy = ({ pricing, minimumWage }) => {
  let resultTimes = (minimumWage / pricing).toFixed(2)
  let resultMonths = (pricing / minimumWage).toFixed(2)

  const resultTimesSplited = resultTimes.split('.')
  resultTimes = resultTimesSplited[1] === '00' ? resultTimesSplited[0] :  resultTimes

  const resultMonthsSplited = resultMonths.split('.')
  resultMonths = resultMonthsSplited[1] === '00' ? resultMonthsSplited[0] :  resultMonths

  const useTimesText = resultTimes > 1

  const text1 = `Você compra este produto ${!useTimesText ? 'em' : ''}`

  const text2 = useTimesText
    ? `${resultTimes} ${resultTimes === 1 ? 'vez' : 'vezes'}`
    : `${resultMonths} ${resultMonths === 1 ? 'mês' : 'meses'}`

  const text3 = `com o salário mínimo de ${minimumWage}`

  return { text1, text2, text3 }
}

const getResult = ({ selectedCountries, pricing }) => {
  const firstCountry = {
    ...selectedCountries[0],
    percentage: getPercentageOnMinimumWage({
      pricing: pricing.firstCountry,
      minimumWage: selectedCountries[0].minimumWage
    }),
    howMuchItBuy: getHowMuchItBuy({
      referenceLabel: selectedCountries[0].referenceLabel,
      pricing: pricing.firstCountry,
      minimumWage: selectedCountries[0].minimumWage
    })
  }

  const secondCountry = {
    ...selectedCountries[1],
    percentage: getPercentageOnMinimumWage({
      pricing: pricing.secondCountry,
      minimumWage: selectedCountries[1].minimumWage
    }),
    howMuchItBuy: getHowMuchItBuy({
      referenceLabel: selectedCountries[1].referenceLabel,
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

  const result = getResult({
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
      <br />

      {
        pricing.firstCountry > 0 && pricing.secondCountry > 0
          ? (
            <>
              <Typography variant="h6">
                Poder de compra:
              </Typography>
              <br />
              <HowMutchItBuy
                country={moreExpensiveCountry}
              />
              <HowMutchItBuy
                country={lessExpensiveCountry}
              />
              <br /><br />

              <Typography variant="h6">
                País mais caro:
              </Typography>
              <Card className={classes.card}>
                <CardContent className={classes.horizontalContent}>
                  <div>
                    <Image
                      src={moreExpensiveCountry.icon}
                      alt={moreExpensiveCountry.label}
                      size="small"
                    />
                  </div>
                  <div>
                    <Typography gutterBottom variant="h6" component="h6">
                      { differenceBetween.toFixed(2) }%
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      mais caro { moreExpensiveCountry.referenceLabel }
                    </Typography>
                  </div>
                </CardContent>
              </Card>
              <br /><br />

              <Typography variant="h6">
                % em cima do salário mínimo:
              </Typography>
              <div className={classes.twoCardsWrapper}>
                <Card className={classes.card}>
                  <CardContent>
                    <Image 
                      src={ moreExpensiveCountry.icon } 
                      alt={moreExpensiveCountry.label} 
                      size="x-small"
                    />
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
                    <Image
                      src={lessExpensiveCountry.icon}
                      alt={lessExpensiveCountry.label}
                      size="x-small"
                    />
                    <Typography gutterBottom variant="h6" component="h6">
                      { lessExpensiveCountry.percentage }%
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      do salário mínimo { lessExpensiveCountry.referenceLabel }
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : null
      }
    </Page>
  )
}

const HowMutchItBuy = ({ country }) => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardContent className={classes.horizontalContent}>
        <div style={{width: '30%'}}>
          <Image
            src={country.icon}
            alt={country.label}
            size="small"
          />
        </div>
        <div style={{textAlign:'left', fontSize: '80%'}}>
          <Typography variant="body2" color="textSecondary" component="p">
            {country.howMuchItBuy.text1}
          </Typography>
          <Typography gutterBottom variant="h6" component="h6">
            {country.howMuchItBuy.text2}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {country.howMuchItBuy.text3}
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default PriceComparision