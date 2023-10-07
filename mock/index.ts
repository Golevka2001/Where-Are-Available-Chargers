// mockjs 生成嵌套数据实在太麻烦了，没用 mockjs 的模板语法
const generateRandomStatus = (): number => {
  const random = Math.random();
  if (random < 0.1) {
    return 2;
  } else {
    return Math.floor(Math.random() * 2);
  }
};

const generateRandomData = (): any => {
  const data: any = {};

  const locations = [
    '东门北侧',
    '东门南侧',
    '西门北侧',
    '西门南侧',
    '南门西侧',
    '南门东侧',
    '北门东北侧',
    '北门东南侧',
  ];

  for (let i = 0; i < locations.length; i++) {
    const location = locations[i];
    data[location] = {};

    const numOfDevices = Math.floor(Math.random() * 5) + 1; // Generate random number of devices

    for (let j = 0; j < numOfDevices; j++) {
      const deviceName = String.fromCharCode(65 + j);
      const status: number[] = [];

      for (let k = 0; k < 10; k++) {
        const randomStatus = generateRandomStatus();
        status.push(randomStatus);
      }

      const random = Math.random();
      if (random < 0.1) {
        data[location][deviceName] = null;
      } else {
        data[location][deviceName] = status;
      }
    }
  }

  return data;
};

export default [
  {
    url: '/api/get_status',
    method: 'get',
    response: () => {
      const testData = {
        update_message: {
          last_success_start_time: Date.now(),
          last_success_end_time: Date.now(),
        },
        status_detail: generateRandomData(),
      };
      return testData;
    },
  },
];
