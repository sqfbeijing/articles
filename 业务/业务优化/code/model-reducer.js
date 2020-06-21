reducers = {
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
};

// 优化1:
reducers = {
  saveState(state, { payload }) {
    const { data, prop } = payload;
    return { ...state, [prop]: data }; // 缺点：每次只能更新一个字段
  },
};

// 优化2:
reducers = {
  saveState(state, { payload }) {
    return { ...state, ...payload }; // 缺点：命名可以更简洁
  },
};

// 最终版:
reducers = {
  save(state, { payload }) {
    return { ...state, ...payload }; // 缺点：命名可以更简洁
  },
};
