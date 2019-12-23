import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, // 0 이상이면 다 opened
};

// 지뢰 : -7 , 오픈 : 0 이상, 깃발: -3


// [
//  ['-1', '-1', '-7']
//  ['-1', '-1', '-1']
//  ['-1', '-1', '-1']
// [


// row * cell 칸에 지뢰를 mine개 심는 함수
const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  const candidate = Array(row * cell).fill().map((arr, i) => {
    return i;
  });

  const shuffle = [];
  // 후보군 선정 : 지뢰를 제외한 모든 칸의 갯수만
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }

  console.log(shuffle);
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  // 랜덤하게 지뢰를 심어주는 함수
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  console.log(data);
  return data;
};

export default new Vuex.Store({
  state: {
    tableData: [],
    data: {
      row: 0,
      cell: 0,
      mine: 0,
    },
    timer: 0,
    result: '',
  },
  getters: {

  },
  mutations: {
    [START_GAME](state, { row, cell, mine }){

      // 아래 경우에는 데이터 자체를 통째로 바꾸는 것이기 때문에 Vue.set을 이용하지 않아도 괜찮음
      state.data = {
        row,
        cell,
        mine,
      };
      // Vue.set(state.data, 'row', row);
      // Vue.set(state.data, 'cell', cell);
      // Vue.set(state.data, 'mine', mine);

      state.tableData = plantMine(row, cell, mine);
      state.timer = 0;
    },
    [OPEN_CELL](state){},
    [CLICK_MINE](state){},
    [FLAG_CELL](state){},
    [QUESTION_CELL](state){},
    [NORMALIZE_CELL](state){},
    [INCREMENT_TIMER](state){},

  },
  actions: {

  },
});
