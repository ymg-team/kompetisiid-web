/**
 * function to remove data by id
 * @params (int) id
 * @params (object) data, structure data = {type1:{result:{}}, type2:{result:{}}
 */
export function removeById(id, state, action) {
  Object.keys(state).map(n => {
    if (state[n].result) {
      state[n].result.map((m, key) => {
        if (m.id === id) {
          state[n].result[key]["is_delete"] = true
          if (action.json) {
            if (action.json.status === 200) {
              delete state[n].result[key]
              state[n].total = state[n].total - 1
            } else {
              state[n].result[key]["is_delete"] = false
            }
          }
        }
      })
    }
  })

  return state
}

/**
 * function to update data by key
 * @param (object) state, full data, structure data = {type1:{result:{}}, type2:{result:{}}}
 * @param (string) key
 * @param (object) json, object from superagent response
 */
export function updateByKey(id, state, selector) {
  Object.keys(state).map(n => {
    if (state[n].result) {
      state[n].result.map((m, key) => {
        if (m.id === id) {
          state[n].result[key] = selector(m)
        }
      })
    }
  })

  return state
}

/**
 * function to push more data to object javascript
 */
export function pushData(currentdata, nextdata) {
  nextdata.map(n => {
    currentdata.push(n)
  })
  return currentdata
}

/**
 * function to set loading state on reducer
 */
export function setToLoading(state, action) {
  if (!state[action.filter]) state[action.filter] = {}
  state[action.filter].is_loading = true
  return Object.assign({}, state)
}

/**
 * @description function to receive json response and update store 
 * @param {object} state , state from redux 
 * @param {object} action , action from redux
 */
export function receiveData(state, action) {
  if(!state[action.filter]) state[action.filter] = {}
  if(!action.json) {
    state[action.filter].is_loading = true
    return Object.assign({}, state)
  }
  else {
    state[action.filter].is_loading = false 
    return Object.assign({}, state, { [action.filter]: action.json })
  }
}

/**
 * function to handle receive api response on reducer
 * @param {*} state
 * @param {*} action
 */
export function receiveApiResponse(state, action) {
  if (action.json) {
    if (action.filter) {
      state[action.filter] = action.json
    } else {
      state = action.json
    }
  } else {
    if (action.filter) {
      state[action.filter] = { is_loading: true }
    } else {
      state = { is_loading: true }
    }
  }

  return Object.assign({}, state)
}
