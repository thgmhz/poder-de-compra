import React, { createContext, useReducer } from 'react'

import reducers from './reducers'

import brazilIcon from '../assets/images/brazil.svg'
import portugalIcon from '../assets/images/portugal.png'
import spainIcon from '../assets/images/spain.png'
import usaIcon from '../assets/images/united-states.png'

const StateContext = createContext()

const initialState = {
  pricing: {
    firstCountry: '',
    secondCountry: '',
  },
  selectedCountries: [
    {
      id: 1,
      name: 'portugal',
      label: 'Portugal',
      referenceLabel: 'em Portugal',
      coinSymbol: '€',
      minimumWage: 600,
      icon: portugalIcon,
    },
    {
      id: 2,
      name: 'brazil',
      label: 'Brasil',
      referenceLabel: 'no Brasil',
      coinSymbol: 'R$',
      minimumWage: 998,
      icon: brazilIcon,
    },
  ],
  countries: [
    {
      id: 1,
      name: 'portugal',
      label: 'Portugal',
      referenceLabel: 'em Portugal',
      coinSymbol: '€',
      minimumWage: 600,
      icon: portugalIcon,
    },
    {
      id: 2,
      name: 'brazil',
      label: 'Brasil',
      referenceLabel: 'no Brasil',
      coinSymbol: 'R$',
      minimumWage: 998,
      icon: brazilIcon,
    },
    {
      id: 3,
      name: 'spain',
      label: 'Espanha',
      referenceLabel: 'na Espanha',
      coinSymbol: '€',
      minimumWage: 1050,
      icon: spainIcon,
    },
    {
      id: 4,
      name: 'usa',
      label: 'EUA',
      referenceLabel: 'nos EUA',
      coinSymbol: 'US$',
      minimumWage: 1276,
      icon: usaIcon,
    },
  ],
}

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState)
  const value = { state, dispatch }

  return (
    <StateContext.Provider value={value}>
      {children}
    </StateContext.Provider>
  )
}

const StateConsumer = StateContext.Consumer

export {
  StateContext,
  StateProvider,
  StateConsumer,
}
