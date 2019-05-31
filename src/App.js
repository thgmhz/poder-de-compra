import React from 'react'
import { StateProvider } from './state'

import Header from './components/Header'

import PriceComparision from './pages/PriceComparision'

const App = () => {
  return (
    <StateProvider>
      <Header />
      <PriceComparision />
    </StateProvider>
  )
}

export default App
