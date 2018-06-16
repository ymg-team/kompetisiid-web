/**
 * @description function to handle request list data by filter
 * @param {String} params.filter
 */
export function requestListByFilter(state, action) {
  if (!state[action.filter]) state[action.filter] = {}
  state[action.filter].is_loading = true
  return Object.assign({}, state)
}

/**
 * @description function to handle receive list data by filter
 * @param {String} params.filter
 */
export function receiveListByFilter(state, action) {
  state[action.filter] = action.json || {}
  state[action.filter].is_loading = false
  return Object.assign({}, state)
}

/**
 * @description function to update list data by id
 * @param {Number} params.id
 * @param {Function} params.selector
 */
export function updateListbyId(state, action, params, selector) {
  // maping object
  Object.keys(state).map(key => {
    if (state[key].data) {
      state[key].data.map((n, key) => {
        if (n.id === params.id) {
          if(selector) n = selector(n, action, params)
        }
      })
    }
  })

  return Object.assign({}, state)
}
