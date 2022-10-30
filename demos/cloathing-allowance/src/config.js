export const userGroups = {
  invited: {
    cloathingGenders: [],
    options: {
      filters: 'cloathing:false',
      attributesToRetrieve: ['*', '-cloathingPrices'],
    },
  },
  'employee-no-cloathing': {
    cloathingGenders: [],
    options: {
      attributesToRetrieve: ['*', '-cloathingPrices'],
    },
  },
  'employee-female-cloathing': {
    cloathingGenders: ['women', 'unisex'],
    options: {
      attributesToRetrieve: ['*', '-cloathingPrices.men'],
    },
  },
  'employee-male-cloathing': {
    cloathingGenders: ['men', 'unisex'],
    options: {
      attributesToRetrieve: ['*', '-cloathingPrices.women'],
    },
  },
}
