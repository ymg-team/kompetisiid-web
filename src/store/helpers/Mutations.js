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

  // state[action.filter] = action.json || {}
  // state[action.filter].is_loading = false
  // return Object.assign({}, state)
}

/**
 * @description funcrtion to subscribe competition
 * @param {*} state 
 * @param {*} action 
 * @param {*} params 
 * @param {*} selector 
 */
export function subscribeCompetition(state, action, callback) {
  
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
          if (selector) n = selector(n, action, params)
        }
      })
    }
  })

  return Object.assign({}, state)
}

/**
 * @description function to update detail data by filter
 * @param {object} state, state from reducer
 * @param {object} action, action from reducer 
 * @param {string} action.filter to maping right data
 */
export function updateDetailByFilter(state = {}, action, callback) {
  const keys = Object.keys(state)
  keys.map(key => {
    if(state[key] && key == action.filter ) callback(state[key], state, action )
  })
  return Object.assign({}, state)
}

/**
 * @description function to handle loadmore on list
 * @param {object} state = state for reducer
 * @param {object} action = action from reducer
 * @param {string} action.filter
 */
export function receiveMoreListByFilter(state, action) {
  const { filter } = action
  if (action.json && action.json.status) {
    state[filter].is_loading = false
    state[filter].status = action.json.status
    state[filter].message = action.json.message
    // push to data
    if (action.json.status == 200) {
      state[filter].data = state[filter].data.concat(action.json.data)
    }
  } else {
    state[filter].is_loading = true
  }

  return Object.assign({}, state)
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
