// 插座状态图例列表
// 在 src/components/status-page/status-detail-drawer/SocketStatusLegend.vue 中使用

export const detailDrawerLegendList = [
  {
    color: 'success',
    content: 1,
    text: '空闲',
  },
  {
    color: 'warning',
    content: null,
    text: '占用',
  },
  // 暂不添加故障的图例
  // {
  //   color: 'default',
  //   content: null,
  //   text: '故障',
  // },
];
