const gamesList = [
  {
    gameNumber: 1,
    type: 'double',
    task: 'Угадайте для каждого изображения фото или рисунок?',
    questions: [
      {
        type: 'photo',
        image: 'http://placehold.it/468x458',
        alt: 'Option 1'
      },
      {
        type: 'paint',
        image: 'http://placehold.it/468x458',
        alt: 'Option 2'
      }
    ]
  },
  {
    gameNumber: 2,
    type: 'wide',
    task: 'Угадай, фото или рисунок?',
    question: {
      type: 'photo',
      image: 'http://placehold.it/705x455',
      alt: 'Option 1'
    }
  },
  {
    gameNumber: 3,
    type: 'triple',
    task: 'Найдите рисунок среди изображений',
    answers: [
      {
        type: 'photo',
        image: 'http://placehold.it/304x455',
        alt: 'Option 1'
      },
      {
        type: 'photo',
        image: 'http://placehold.it/304x455',
        alt: 'Option 1'
      },
      {
        type: 'paint',
        image: 'http://placehold.it/304x455',
        alt: 'Option 1'
      }
    ]
  },
  {
    gameNumber: 4,
    type: 'double',
    task: 'Угадайте для каждого изображения фото или рисунок?',
    questions: [
      {
        type: 'photo',
        image: 'http://placehold.it/468x458',
        alt: 'Option 1'
      },
      {
        type: 'paint',
        image: 'http://placehold.it/468x458',
        alt: 'Option 2'
      }
    ]
  },
  {
    gameNumber: 5,
    type: 'wide',
    task: 'Угадай, фото или рисунок?',
    question: {
      type: 'photo',
      image: 'http://placehold.it/705x455',
      alt: 'Option 1'
    }
  },
  {
    gameNumber: 6,
    type: 'triple',
    task: 'Найдите рисунок среди изображений',
    answers: [
      {
        type: 'photo',
        image: 'http://placehold.it/304x455',
        alt: 'Option 1'
      },
      {
        type: 'photo',
        image: 'http://placehold.it/304x455',
        alt: 'Option 1'
      },
      {
        type: 'paint',
        image: 'http://placehold.it/304x455',
        alt: 'Option 1'
      }
    ]
  },
  {
    gameNumber: 7,
    type: 'double',
    task: 'Угадайте для каждого изображения фото или рисунок?',
    questions: [
      {
        type: 'photo',
        image: 'http://placehold.it/468x458',
        alt: 'Option 1'
      },
      {
        type: 'paint',
        image: 'http://placehold.it/468x458',
        alt: 'Option 2'
      }
    ]
  },
  {
    gameNumber: 8,
    type: 'wide',
    task: 'Угадай, фото или рисунок?',
    question: {
      type: 'photo',
      image: 'http://placehold.it/705x455',
      alt: 'Option 1'
    }
  },
  {
    gameNumber: 9,
    type: 'triple',
    task: 'Найдите рисунок среди изображений',
    answers: [
      {
        type: 'photo',
        image: 'http://placehold.it/304x455',
        alt: 'Option 1'
      },
      {
        type: 'photo',
        image: 'http://placehold.it/304x455',
        alt: 'Option 1'
      },
      {
        type: 'paint',
        image: 'http://placehold.it/304x455',
        alt: 'Option 1'
      }
    ]
  },
  {
    gameNumber: 10,
    type: 'double',
    task: 'Угадайте для каждого изображения фото или рисунок?',
    questions: [
      {
        type: 'photo',
        image: 'http://placehold.it/468x458',
        alt: 'Option 1'
      },
      {
        type: 'paint',
        image: 'http://placehold.it/468x458',
        alt: 'Option 2'
      }
    ]
  }
];

export const games = gamesList;

export const gameSettings = {
  maxLives: 3,
  timeLimit: 30,
  timeLimitForFastAnswer: 10,
  timeLimitForSlowAnswer: 20,
  pointsPerRightAnswer: 100,
  pointsPerEachLife: 50
};

export const extraList = {
  'fast': {
    title: 'Бонус за скорость',
    points: 50
  },
  'heart': {
    title: 'Бонус за жизни',
    points: 50
  },
  'slow': {
    title: 'Штраф за медлительност',
    points: 50
  }
};
