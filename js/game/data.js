const games = [
  {
    gameNumber: 1,
    type: 'double',
    task: 'Угадайте для каждого изображения фото или рисунок?',
    timer: 'NN',
    lives: [
      'empty',
      'full',
      'full'
    ],
    questions: [
      {
        image: 'http://placehold.it/468x458',
        alt: 'Option 1'
      },
      {
        image: 'http://placehold.it/468x458',
        alt: 'Option 2'
      }
    ],
    stats: [
      'wrong',
      'slow',
      'fast',
      'correct',
      'unknown',
      'unknown',
      'unknown',
      'unknown',
      'unknown',
      'unknown'
    ]
  },
  {
    gameNumber: 2,
    type: 'wide',
    task: 'Угадай, фото или рисунок?',
    timer: 'NN',
    lives: [
      'empty',
      'full',
      'full'
    ],
    question: {
      image: 'http://placehold.it/705x455',
      alt: 'Option 1'
    },
    stats: [
      'wrong',
      'slow',
      'fast',
      'correct',
      'wrong',
      'unknown',
      'slow',
      'unknown',
      'fast',
      'unknown'
    ]
  },
  {
    gameNumber: 3,
    type: 'triple',
    task: 'Найдите рисунок среди изображений',
    timer: 'NN',
    lives: [
      'empty',
      'full',
      'full'
    ],
    answers: [
      {
        image: 'http://placehold.it/304x455',
        alt: 'Option 1'
      },
      {
        image: 'http://placehold.it/304x455',
        alt: 'Option 1'
      },
      {
        image: 'http://placehold.it/304x455',
        alt: 'Option 1'
      }
    ],
    stats: [
      'wrong',
      'slow',
      'fast',
      'correct',
      'wrong',
      'unknown',
      'slow',
      'unknown',
      'fast',
      'unknown'
    ]
  },
  {
    gameNumber: 4,
    type: 'double',
    task: 'Угадайте для каждого изображения фото или рисунок?',
    timer: 'NN',
    lives: [
      'empty',
      'full',
      'full'
    ],
    questions: [
      {
        image: 'http://placehold.it/468x458',
        alt: 'Option 1'
      },
      {
        image: 'http://placehold.it/468x458',
        alt: 'Option 2'
      }
    ],
    stats: [
      'wrong',
      'slow',
      'fast',
      'correct',
      'unknown',
      'unknown',
      'unknown',
      'unknown',
      'unknown',
      'unknown'
    ]
  },
  {
    gameNumber: 5,
    type: 'wide',
    task: 'Угадай, фото или рисунок?',
    timer: 'NN',
    lives: [
      'empty',
      'full',
      'full'
    ],
    question: {
      image: 'http://placehold.it/705x455',
      alt: 'Option 1'
    },
    stats: [
      'wrong',
      'slow',
      'fast',
      'correct',
      'wrong',
      'unknown',
      'slow',
      'unknown',
      'fast',
      'unknown'
    ]
  },
  {
    gameNumber: 6,
    type: 'triple',
    task: 'Найдите рисунок среди изображений',
    timer: 'NN',
    lives: [
      'empty',
      'full',
      'full'
    ],
    answers: [
      {
        image: 'http://placehold.it/304x455',
        alt: 'Option 1'
      },
      {
        image: 'http://placehold.it/304x455',
        alt: 'Option 1'
      },
      {
        image: 'http://placehold.it/304x455',
        alt: 'Option 1'
      }
    ],
    stats: [
      'wrong',
      'slow',
      'fast',
      'correct',
      'wrong',
      'unknown',
      'slow',
      'unknown',
      'fast',
      'unknown'
    ]
  },
  {
    gameNumber: 7,
    type: 'double',
    task: 'Угадайте для каждого изображения фото или рисунок?',
    timer: 'NN',
    lives: [
      'empty',
      'full',
      'full'
    ],
    questions: [
      {
        image: 'http://placehold.it/468x458',
        alt: 'Option 1'
      },
      {
        image: 'http://placehold.it/468x458',
        alt: 'Option 2'
      }
    ],
    stats: [
      'wrong',
      'slow',
      'fast',
      'correct',
      'unknown',
      'unknown',
      'unknown',
      'unknown',
      'unknown',
      'unknown'
    ]
  },
  {
    gameNumber: 8,
    type: 'wide',
    task: 'Угадай, фото или рисунок?',
    timer: 'NN',
    lives: [
      'empty',
      'full',
      'full'
    ],
    question: {
      image: 'http://placehold.it/705x455',
      alt: 'Option 1'
    },
    stats: [
      'wrong',
      'slow',
      'fast',
      'correct',
      'wrong',
      'unknown',
      'slow',
      'unknown',
      'fast',
      'unknown'
    ]
  },
  {
    gameNumber: 9,
    type: 'triple',
    task: 'Найдите рисунок среди изображений',
    timer: 'NN',
    lives: [
      'empty',
      'full',
      'full'
    ],
    answers: [
      {
        image: 'http://placehold.it/304x455',
        alt: 'Option 1'
      },
      {
        image: 'http://placehold.it/304x455',
        alt: 'Option 1'
      },
      {
        image: 'http://placehold.it/304x455',
        alt: 'Option 1'
      }
    ],
    stats: [
      'wrong',
      'slow',
      'fast',
      'correct',
      'wrong',
      'unknown',
      'slow',
      'unknown',
      'fast',
      'unknown'
    ]
  },
  {
    gameNumber: 10,
    type: 'double',
    task: 'Угадайте для каждого изображения фото или рисунок?',
    timer: 'NN',
    lives: [
      'empty',
      'full',
      'full'
    ],
    questions: [
      {
        image: 'http://placehold.it/468x458',
        alt: 'Option 1'
      },
      {
        image: 'http://placehold.it/468x458',
        alt: 'Option 2'
      }
    ],
    stats: [
      'wrong',
      'slow',
      'fast',
      'correct',
      'unknown',
      'unknown',
      'unknown',
      'unknown',
      'unknown',
      'unknown'
    ]
  }
];

export const getData = (gameNumber) => {
  return games[gameNumber - 1];
};

export const gameIsExists = (gameNumber) => !!games[gameNumber - 1];
