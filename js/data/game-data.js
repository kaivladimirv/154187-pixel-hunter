export const testTasks = [
  {
    type: 'two-of-two',
    question: 'Угадайте для каждого изображения фото или рисунок?',
    answers: [
      {
        'image': {
          'url': 'http://placehold.it/468x458',
          'width': 468,
          'height': 458
        },
        'type': 'photo'
      },
      {
        'image': {
          'url': 'http://placehold.it/468x458',
          'width': 468,
          'height': 458
        },
        'type': 'painting'
      }
    ]
  },
  {
    type: 'tinder-like',
    question: 'Угадай, фото или рисунок?',
    answers: [
      {
        'image': {
          'url': 'http://placehold.it/705x455',
          'width': 705,
          'height': 455
        },
        'type': 'photo'
      }
    ]
  },
  {
    type: 'one-of-three',
    question: 'Найдите рисунок среди изображений',
    answers: [
      {
        'image': {
          'url': 'http://placehold.it/304x455',
          'width': 304,
          'height': 455
        },
        'type': 'photo'
      },
      {
        'image': {
          'url': 'http://placehold.it/304x455',
          'width': 304,
          'height': 455
        },
        'type': 'painting'
      },
      {
        'image': {
          'url': 'http://placehold.it/304x455',
          'width': 304,
          'height': 455
        },
        'type': 'photo'
      }
    ]
  },
  {
    type: 'two-of-two',
    question: 'Угадайте для каждого изображения фото или рисунок?',
    answers: [
      {
        'image': {
          'url': 'http://placehold.it/468x458',
          'width': 468,
          'height': 458
        },
        'type': 'photo'
      },
      {
        'image': {
          'url': 'http://placehold.it/468x458',
          'width': 468,
          'height': 458
        },
        'type': 'painting'
      }
    ]
  },
  {
    type: 'tinder-like',
    question: 'Угадай, фото или рисунок?',
    answers: [
      {
        'image': {
          'url': 'http://placehold.it/705x455',
          'width': 705,
          'height': 455
        },
        'type': 'photo'
      }
    ]
  },
  {
    type: 'one-of-three',
    question: 'Найдите рисунок среди изображений',
    answers: [
      {
        'image': {
          'url': 'http://placehold.it/304x455',
          'width': 304,
          'height': 455
        },
        'type': 'photo'
      },
      {
        'image': {
          'url': 'http://placehold.it/304x455',
          'width': 304,
          'height': 455
        },
        'type': 'painting'
      },
      {
        'image': {
          'url': 'http://placehold.it/304x455',
          'width': 304,
          'height': 455
        },
        'type': 'photo'
      }
    ]
  },
  {
    type: 'two-of-two',
    question: 'Угадайте для каждого изображения фото или рисунок?',
    answers: [
      {
        'image': {
          'url': 'http://placehold.it/468x458',
          'width': 468,
          'height': 458
        },
        'type': 'photo'
      },
      {
        'image': {
          'url': 'http://placehold.it/468x458',
          'width': 468,
          'height': 458
        },
        'type': 'painting'
      }
    ]
  },
  {
    type: 'tinder-like',
    question: 'Угадай, фото или рисунок?',
    answers: [
      {
        'image': {
          'url': 'http://placehold.it/705x455',
          'width': 705,
          'height': 455
        },
        'type': 'photo'
      }
    ]
  },
  {
    type: 'one-of-three',
    question: 'Найдите рисунок среди изображений',
    answers: [
      {
        'image': {
          'url': 'http://placehold.it/304x455',
          'width': 304,
          'height': 455
        },
        'type': 'photo'
      },
      {
        'image': {
          'url': 'http://placehold.it/304x455',
          'width': 304,
          'height': 455
        },
        'type': 'painting'
      },
      {
        'image': {
          'url': 'http://placehold.it/304x455',
          'width': 304,
          'height': 455
        },
        'type': 'photo'
      }
    ]
  },
  {
    type: 'two-of-two',
    question: 'Угадайте для каждого изображения фото или рисунок?',
    answers: [
      {
        'image': {
          'url': 'http://placehold.it/468x458',
          'width': 468,
          'height': 458
        },
        'type': 'photo'
      },
      {
        'image': {
          'url': 'http://placehold.it/468x458',
          'width': 468,
          'height': 458
        },
        'type': 'painting'
      }
    ]
  }
];

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

export const taskTypes = {
  TWO_OF_TWO: 'two-of-two',
  TINDER_LIKE: 'tinder-like',
  ONE_OF_THREE: 'one-of-three'
};

export const answerTypes = {
  PAINTING: 'painting',
  PHOTO: 'photo'
};
