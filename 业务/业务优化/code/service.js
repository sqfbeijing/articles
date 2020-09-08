// **** 示例1: ****
// 多参数，需要考虑顺序，消耗时间;
// 函数命名，需要消耗时间
// 参数命名，需要消耗时间
export function saveOrUpdateGroup(params, id) {
  return request(`${API_URL}group/saveOrUpdateGroup/${id}`, {
    method: "POST",
    body: params,
  });
}

export function deleteLeader(id) {
  return request(`${API_URL}group/deleteLeader?id=${id}`);
}

// **** 示例2: ****
// 方法命名和接口地址命名相同
// 参数就叫body,只有一个参数，type: object
export function saveOrUpdateGroup(body) {
  return request(`${API_URL}group/saveOrUpdateGroup/${body.id}`, {
    method: "POST",
    body,
  });
}

export function deleteLeader(body) {
  // 或者 return request(`${API_URL}group/deleteLeader?${stringify(body)}`);
  return request(`${API_URL}group/deleteLeader`, { params: body });
}
