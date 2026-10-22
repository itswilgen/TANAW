import type { SignatureDrink } from '../types'

export const signatures: SignatureDrink[] = [
  {
    name: 'Sea Salt Barako Latte',
    origin: 'Batangas Barako',
    notes: ['Dark chocolate', 'Salted cream', 'Smoke'],
    description: 'The one we’d order first. Bold Liberica espresso over ice, softened by a salted cream cap.',
    price: 210,
    photo: { name: 'sig-sea-salt-latte', alt: 'Milk being poured into a glass of iced coffee on a wooden coaster' },
  },
  {
    name: 'Sagada Pour-Over',
    origin: 'Sagada, Mountain Province',
    notes: ['Stone fruit', 'Cacao', 'Honey'],
    description: 'Hand-poured to order so the fruit in this high-grown Arabica comes through clearly.',
    price: 240,
    photo: { name: 'sig-sagada-pour-over', alt: 'Coffee brewing through a paper filter in a Chemex at the brew bar' },
  },
  {
    name: 'Muscovado Cold Brew',
    origin: 'Benguet',
    notes: ['Molasses', 'Orange peel', 'Cocoa'],
    description: 'Steeped for 18 hours, sweetened with Negros muscovado and a twist of orange.',
    price: 190,
    photo: { name: 'sig-muscovado-cold-brew', alt: 'Cold brew coffee over ice in a mason jar on a sunlit table' },
  },
  {
    name: 'Tablea Mocha',
    origin: 'Mt. Apo × Batangas tablea',
    notes: ['Roasted cacao', 'Brown sugar', 'Cinnamon'],
    description: 'Espresso and steamed milk with stone-ground tablea, the chocolate of Filipino childhood mornings.',
    price: 200,
    photo: { name: 'sig-tablea-mocha', alt: 'Hot chocolate being poured into a white mug' },
  },
]
