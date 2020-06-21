import * as R from "ramda";
// 挨个引入,消耗时间
import {
  queryCategoryList,
  queryDepartmentGroupList,
  querySalesGrpTree,
  queryGroupListByCategoryId,
  queryGroupUserListByGroupId,
  changeLeader,
} from "@/services/group";

export default {
  namespace: "group",
  state: {
    listData: [], // 需要思考变量命名,消耗时间
    queryCrmGroupList: [],
    queryCrmUserListByGroupId: [],
  },

  effects: {
    //参数解构给service层,消耗时间
    // 需要考虑方法命名，消耗时间
    *changeLeader({ payload: { categoryId, data } }, { call }) {
      //新按顺序传递参数给service层,消耗时间
      yield call(changeLeader, categoryId, data);
    },

    *queryGroupUserListByGroupId({ payload }, { call, put }) {
      const response = yield call(queryGroupUserListByGroupId, payload);
      if (!response || response.code !== 200) {
        return;
      }

      const { data } = response;
      // 需要寻找对应的reducer 方法,消耗时间
      yield put({
        type: "setListData",
        payload: data,
      });
    },
  },

  reducers: {
    // 需要为每个store中的字段定义对应的reducer方法,消耗时间
    setEveryLevelCount(state, { payload }) {
      return { ...state, everyLevelCount: payload };
    },
    setStockList(state, { payload }) {
      return { ...state, stockList: payload };
    },
    setListData(state, { payload }) {
      return { ...state, history: payload };
    },
  },
};
