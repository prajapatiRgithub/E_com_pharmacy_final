module.exports = {
  validCity: {
    model : 'City',
  },
  validState: {
    model : 'State',
  },
  validCountry: {
    model : 'Country',
  },
  inValidAddress: {
    model : 123,
  },
  invalidCondition: {
    model     : 'City',
    condition : 123,
  },
  invalidAttribute: {
    model     : 'City',
    attribute : 123,
  },
  emptyAttribute: {
    model     : 'City',
    attribute : [],
  },
  invalidModel: {
    model : 'Cityq2',
  },
};