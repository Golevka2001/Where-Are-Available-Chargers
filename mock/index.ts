const generateRandomStatus = (): number => {
  if (Math.random() < 0.1) {
    return 2;
  } else {
    return Math.floor(Math.random() * 2);
  }
};

const generateRandomData = (): any => {
  const data: any = {};

  let stationNameList = [
    '东门北侧',
    '东门南侧',
    '西门北侧',
    '西门南侧',
    '南门西侧',
    '南门东侧',
    '北门东北侧',
    '北门东南侧',
  ];
  stationNameList = stationNameList.filter(() => Math.random() > 0.2);

  for (let i = 0; i < stationNameList.length; i++) {
    const stationName = stationNameList[i];
    data[stationName] = {};

    const chargerCount = Math.floor(Math.random() * 5) + 1;

    for (let j = 0; j < chargerCount; j++) {
      const chargerName = String.fromCharCode(65 + j);
      const chargerStatus: number[] = [];

      for (let k = 0; k < 10; k++) {
        const socketStatus = generateRandomStatus();
        chargerStatus.push(socketStatus);
      }

      if (Math.random() < 0.1) {
        data[stationName][chargerName] = null;
      } else {
        data[stationName][chargerName] = chargerStatus;
      }
    }
  }

  return data;
};

export default [
  {
    url: '/api/get_status',
    method: 'get',
    timeout: Math.floor(Math.random() * 1000) + 500, // 0.5-1.5s
    statusCode: 200,
    response: () => {
      const testData = {
        update_message: {
          last_success_start_time: Date.now(),
          last_success_end_time: Date.now() + 1000,
        },
        status_detail: generateRandomData(),
      };
      return testData;
    },
  },
];
