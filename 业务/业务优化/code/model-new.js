import * as R from "ramda";
// 全量导入
import * as api from "@/services/group";

export default {
  namespace: "group",
  state: {
    queryProjectTree: [], // 字段名称和接口「/group/queryProjectTree」命名相同
    saveOrUpdateInfo: {},
    querySalesGrpTree: {},
  },

  effects: {
    *changeGroup({ payload }, { call }) {
      yield call(api.changeGroup, payload);
    },
    // 方法命名和「queryProjectTree」命名相同
    *queryProjectTree({ payload }, { call, put }) {
      // payload原样传递给service层
      const response = yield call(api.queryProjectTree, payload);
      if (!response || response.code !== 200) {
        return;
      }

      const { data } = response || {};
      yield put({
        type: "save",
        payload: {
          queryProjectTree: data,
        },
      });
    },
  },

  reducers: {
    //只需一个方法即可
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
