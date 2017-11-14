export const products = [
  {
    id: 1,
    name: 'Test product',
    price: 200,
    purchases: 3000,
    rating: 65,
    imageUrl: 'assets/ph.jpg',
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
  },
  {
    id: 2,
    name: 'Test product',
    price: 200,
    purchases: 3000,
    rating: 65,
    imageUrl: 'assets/ph1.jpg',
  },
  {
    id: 3,
    name: 'Test product',
    price: 200,
    purchases: 3000,
    rating: 65,
    imageUrl: 'assets/ph2.jpg',
  },
  {
    id: 4,
    name: 'Test product',
    price: 200,
    purchases: 3000,
    rating: 65,
    imageUrl: 'assets/ph3.jpg',
  },
  {
    id: 5,
    name: 'Test product',
    price: 200,
    purchases: 3000,
    rating: 65,
    imageUrl: 'assets/ph4.jpg',
  },
];
