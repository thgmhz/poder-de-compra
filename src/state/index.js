import React, { createContext, useReducer } from 'react'

import reducers from './reducers'

import brazilIcon from '../assets/images/brazil.png'
import portugalIcon from '../assets/images/portugal.png'

const StateContext = createContext()

const initialState = {
  pricing: {
    firstCountry: 50,
    secondCountry: 100,
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
