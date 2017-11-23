export const productStatsMock = {
  monthPurchasesBySource: {
    context: {
      label: 'Direct',
      data: [68, 22, 57, 27, 58, 95, 94, 52, 71, 82, 72, 84],
    },
    blogs: {
      label: 'Context ads',
      data: [50, 48, 92, 40, 99, 91, 93, 11, 100, 76, 29, 64],
    },
    email: {
      label: 'Email campaigns',
      data: [39, 87, 43, 9, 33, 4, 98, 90, 81, 21, 46, 45],
    },
  },
  purchasesByDeviceType: {
    mobile: {
      label: 'Mobile',
      data: 68,
    },
    tablet: {
      label: 'Tablet',
      data: 15,
    },
    desktop: {
      label: 'Desktop',
      data: 17,
    },
  },
  reviews: {
    positive: {
      label: 'Positive',
      data: [68, 22, 57, 27, 58, 95, 94, 52, 71, 82, 72, 84],
    },
    negative: {
      label: 'Negative',
      data: [50, 48, 92, 40, 99, 91, 93, 11, 100, 76, 29, 64],
    },
  },
  purchasesByCountry: {
    USA: 1100,
    FRA: 800,
    DEU: 700,
    RUS: 500,
    SVK: 200,
    AUS: 100,
  },
};
