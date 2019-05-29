import { UPDATE_MINIMUM_WAGE, UPDATE_PRICING } from "./constants"

const reducers = (state, action) => {
  const { type, payload } = action

  if (type === UPDATE_MINIMUM_WAGE) {
    const { selectedCountries } = state

    const updatedValues = selectedCountries.map(stateCountry => {
      const { country, minimumWage } = payload

      return country === stateCountry.name
        ? { ...stateCountry, minimumWage }
        : stateCountry
    })

    const newState = {
      ...state,
      selectedCountries: updatedValues
    }

    return newState
  }
  
  if (type === UPDATE_PRICING) {
    const { pricing } = state
    const { countryPos, value } = payload

    const newPricingState = {
      ...pricing,
      [countryPos]: Number(value)
    }

    const newState = {
      ...state,
      pricing: newPricingState
    }

    return newState
  }
  
}

export default reducers