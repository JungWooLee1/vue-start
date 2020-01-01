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
    halted:true, // 게임이 중단
    result: '',
    openedCount: 0,
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
      state.halted = false;
      state.opendCount = 0;
      state.result = '';
    },
    [OPEN_CELL](state, { row, cell }) {
      let openedCount = 0;
      const checked = [];
      function checkAround(row, cell) { // 주변 8칸 지뢰인지 확인
        const checkRowOrCellIsUndefined = row < 0 || row >= state.tableData.length || cell < 0 || cell >= state.tableData[0].length;
        if (checkRowOrCellIsUndefined) { // undefined 방지
          return;
        }
        // mine이나 flag일 경우 검사하지 않음
        if ([CODE.OPENED , CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(state.tableData[row][cell])) {
          return;
        }
        // 한번 체크한 칸은 다시 열지 않음
        if (checked.includes(row + '/' + cell)) {
          return;
        } else {
          checked.push(row + '/' + cell);
        }

        let around = [];
        if (state.tableData[row - 1])
        {
          around = around.concat([
            state.tableData[row - 1][cell - 1], state.tableData[row - 1][cell], state.tableData[row - 1][cell + 1]
          ]);
        }
        around = around.concat([
          state.tableData[row][cell -1], state.tableData[row][cell], state.tableData[row][cell + 1]
        ]);

        if (state.tableData[row + 1])
        {
          around = around.concat([
            state.tableData[row + 1][cell - 1], state.tableData[row + 1][cell], state.tableData[row + 1][cell + 1]
          ]);
        }
        const counted = around.filter(function(v) {
          return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
        });
        // 주변칸에 지뢰가 하나도 없으면 주변 8칸 열어보고 지뢰가 있으면 숫자 표시하기
        if (counted.length === 0 && row > -1) {
          const near = [];
          if (row -1 > -1) {
            near.push([row - 1, cell - 1]);
            near.push([row - 1, cell]);
            near.push([row - 1, cell + 1]);
          }
          near.push([row, cell - 1]);
          near.push([row, cell + 1]);
          if (row + 1 < state.tableData.length) {
            near.push([row + 1, cell - 1]);
            near.push([row + 1, cell]);
            near.push([row + 1, cell + 1]);
          }
          near.forEach((n) => {
            if (state.tableData[n[0]][n[1]] !== CODE.OPENED) {
              checkAround(n[0], n[1]);
            }
          })
        }
        if (state.tableData[row][cell] === CODE.NORMAL) {
          openedCount += 1;
        }

        Vue.set(state.tableData[row], cell, counted.length);
      }
      checkAround(row,  cell);

      let halted = false;
      let result;
      if (state.data.row * state.data.cell - state.data.mine === state.opendCount + openedCount) { // 가로 * 세로 - 지뢰갯수 = 지금까지 연 칸의 갯수 + 방금 연 갯수
        halted = true;
        result = `${state.timer}초만에 승리하셨습니다.`;
      }

      state.opendCount += openedCount;
      state.halted = halted;
      state.result = result;
    },
    [CLICK_MINE](state, {row, cell}){
      state.halted = true;
      Vue.set(state.tableData[row], cell, CODE.CLICKED_MINE);
    },
    [FLAG_CELL](state, { row, cell }) {
      if (state.tableData[row][cell] === CODE.MINE) {
        Vue.set(state.tableData[row], cell, CODE.FLAG_MINE);
      }
      else {
        Vue.set(state.tableData[row], cell, CODE.FLAG);
      }
    },
    [QUESTION_CELL](state, {row, cell}){
      if (state.tableData[row][cell] === CODE.FLAG_MINE) {
        Vue.set(state.tableData[row], cell, CODE.QUESTION_MINE);
      }
      else {
        Vue.set(state.tableData[row], cell, CODE.QUESTION);
      }
    },
    [NORMALIZE_CELL](state, {row, cell}){
      if (state.tableData[row][cell] === CODE.QUESTION_MINE) {
        Vue.set(state.tableData[row], cell, CODE.MINE);
      }
      else {
        Vue.set(state.tableData[row], cell, CODE.NORMAL);
      }
    },
    [INCREMENT_TIMER](state){
      state.timer +=1;
    },

  },
  actions: {

  },
});
