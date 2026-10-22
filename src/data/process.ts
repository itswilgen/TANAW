import type { ProcessStep } from '../types'

export const processSteps: ProcessStep[] = [
  {
    title: 'Source',
    body: 'We buy directly from growers in Benguet, Sagada, Batangas and Mt. Apo, and only cherries picked ripe make the cut.',
    detail: 'Direct trade, paid above market',
    photo: { name: 'process-source', alt: 'Ripe red coffee cherries on the branch' },
  },
  {
    title: 'Roast',
    body: 'Small batches every week, profiled for each origin so a Barako tastes like Barako and Sagada keeps its fruit.',
    detail: 'Roasted weekly, rested 7 days',
    photo: { name: 'process-roast', alt: 'Freshly roasted coffee beans pouring into a roaster’s cooling tray' },
  },
  {
    title: 'Brew',
    body: 'Every shot is weighed and timed, and every pour-over is made by hand. We dial in again each morning.',
    detail: 'Weighed, timed, tasted',
    photo: { name: 'process-brew', alt: 'Espresso streaming from a portafilter into a cup' },
  },
  {
    title: 'Serve',
    body: 'Brought to your table with a note on where it came from, so you know whose hands it passed through.',
    detail: 'Origin card with every pour-over',
    photo: { name: 'process-serve', alt: 'A barista pouring steamed milk into a cup of espresso' },
  },
]
