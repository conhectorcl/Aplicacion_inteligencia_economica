import { mockProducts } from '../../data/mockProducts';

export async function getPricingData() {
  return Promise.resolve(mockProducts);
}