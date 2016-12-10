let data = {
  title: 'Победа!',
  results: [
    {
      taskNumber: 1,
      status: 'success',
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
      ],
      points: 100,
      total: 900,
      totalFinal: 950,
      extra: [
        {
          name: 'fast',
          title: 'Бонус за скорость',
          value: 1,
          points: 50,
          total: 50,
        },
        {
          name: 'heart',
          title: 'Бонус за жизни',
          value: 2,
          points: 50,
          total: 100,
        },
        {
          name: 'slow',
          title: 'Штраф за медлительность',
          value: 2,
          points: 50,
          total: -100,
        }
      ]
    },
    {
      taskNumber: 2,
      status: 'fail',
      stats: [
        'wrong',
        'slow',
        'fast',
        'correct',
        'wrong',
        'unknown',
        'slow',
        'wrong',
        'fast',
        'wrong'
      ],
      totalFinal: 'fail',
      extra: []
    },
    {
      taskNumber: 3,
      status: 'success',
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
      ],
      points: 100,
      total: 900,
      totalFinal: 950,
      extra: [
        {
          name: 'heart',
          title: 'Бонус за жизни',
          value: 2,
          points: 50,
          total: 100,
        }
      ]
    },
  ]
};

export default () => data;
