export const userGroups = {
  invited: {
    genders: [],
    options: {
      filters: 'cloathing:false',
      attributesToRetrieve: ['*', '-cloathingPrices'],
    },
  },
  'employee-no-cloathing': {
    genders: [],
    options: {
      attributesToRetrieve: ['*', '-cloathingPrices'],
    },
  },
  'employee-female-cloathing': {
    genders: ['women', 'unisex'],
    options: {
      attributesToRetrieve: ['*', '-cloathingPrices.men'],
    },
  },
  'employee-male-cloathing': {
    genders: ['men', 'unisex'],
    options: {
      attributesToRetrieve: ['*', '-cloathingPrices.women'],
    },
  },
}
