import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import Header from './components/Header'
import brazilIcon from './assets/images/brazil.png'
import portugalIcon from './assets/images/portugal.png'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '20px'
  },
  title: {
    alignSelf: 'flex-start',
    marginBottom: '10px'
  },
  textField: {
    width: '50%',
    margin: '10px',
  },
  valuesWrapper: {
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

const calcPercentage = (value1, value2) => {
  const result = value1 * 100 / value2
  
  const response = result === Infinity
    ? 0
    : result

  return response.toFixed(2)
}

const getMoreExpensiveCountry = ({
  portugalMinimumWage,
  brazilMinimumWage,
  portugalPrice,
  brazilPrice
}) => {
  const portugalResult = calcPercentage(portugalPrice, portugalMinimumWage)
  const brazilResult = calcPercentage(brazilPrice, brazilMinimumWage)

  const portugalIsMoreExpensive = portugalResult >= brazilResult

  const difference = portugalIsMoreExpensive
    ? portugalResult - brazilResult
    : brazilResult - portugalResult

  const message = portugalIsMoreExpensive
    ? 'em Portugal'
    : 'no Brasil'

  const icon = portugalIsMoreExpensive
    ? <img src={portugalIcon} alt={message} />
    : <img src={brazilIcon} alt={message} />

  return {
    difference: difference.toFixed(2),
    message,
    icon,
    portugalResult,
    brazilResult,
  }
}

const App = () => {
  const classes = useStyles()

  const [portugalMinimumWage, setPortugalMinimumWage] = useState(600)
  const [brazilMinimumWage, setBrazilMinimumWage] = useState(998)

  const [portugalPrice, setPortugalPrice] = useState(100)
  const [brazilPrice, setBrazilPrice] = useState(100)

  const moreExpensiveCountry = getMoreExpensiveCountry({
    portugalMinimumWage,
    brazilMinimumWage,
    portugalPrice,
    brazilPrice,
  })
  
  const handleChange = (setState, event) => {
    const eventValue = event.target.value
    const finalValue = eventValue.replace(/,/g, '.')
    
    setState(finalValue)
  }

  return (
    <React.Fragment>
      <Header />
      <div className={classes.container}>
        <Typography variant="h6" className={classes.title}>
          Salário Mínimo
        </Typography>
        <div className={classes.valuesWrapper}>
          <TextField
            id="outlined-select-currency"
            label="Portugal"
            className={classes.textField}
            value={portugalMinimumWage}
            type="tel"
            onChange={handleChange.bind(this, setPortugalMinimumWage)}
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: <InputAdornment position="start">€</InputAdornment>,
            }}
          />
          <TextField
            id="outlined-select-currency"
            label="Brasil"
            className={classes.textField}
            value={brazilMinimumWage}
            type="tel"
            onChange={handleChange.bind(this, setBrazilMinimumWage)}
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>,
            }}
          />
        </div>
        <Typography variant="h6" className={classes.title}>
          Preço
        </Typography>
        <div className={classes.valuesWrapper}>
          <TextField
            label="Portugal"
            className={classes.textField}
            value={portugalPrice}
            onChange={handleChange.bind(this, setPortugalPrice)}
            type="tel"
            margin="normal"
            variant="filled"
            InputProps={{
              startAdornment: <InputAdornment position="start">€</InputAdornment>,
            }}
          />
          <TextField
            label="Brasil"
            className={classes.textField}
            value={brazilPrice}
            onChange={handleChange.bind(this, setBrazilPrice)}
            margin="normal"
            variant="filled"
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>,
            }}
          />
        </div>
        <Card className={classes.card}>
          <CardContent>
            { moreExpensiveCountry.icon }
            <Typography gutterBottom variant="h6" component="h6">
              { moreExpensiveCountry.difference }%
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Mais caro { moreExpensiveCountry.message }
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            { moreExpensiveCountry.icon }
            <Typography gutterBottom variant="h6" component="h6">
              { moreExpensiveCountry.portugalResult }%
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              do salário mínimo de Portugal
            </Typography>
          </CardContent>
        </Card>        
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="h6" component="h6">
              Brasil
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <strong>{ moreExpensiveCountry.brazilResult }%</strong> do salário mínimo do Brasil <br />
            </Typography>
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  )
}

export default App
