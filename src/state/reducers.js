import { 
  UPDATE_MINIMUM_WAGE,
  UPDATE_PRICING 
} from "./constants"

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
      [countryPos]: value ? Number(value) : ''
    }

    const newState = {
      ...state,
      pricing: newPricingState
    }

    return newState
  }

  if (type === 'CHOOSE_COUNTRY') {
    const { selectedCountries, countries } = state

    const countryToAdd = countries.find(country => country.id === payload.addId)
    const removedCountryIndex = selectedCountries.findIndex(country => country.id === payload.removeId)
    
    selectedCountries[removedCountryIndex] = countryToAdd

    const newState = {
      ...state
    }

    return newState
  }
  
}

export default reducers