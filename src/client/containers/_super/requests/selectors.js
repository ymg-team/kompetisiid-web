/**
 * @description selector to update status of found request data by id
 * @param {Object} data, found data of request
 * @param {Object} action, action from reducers
 * @param {Object} params, object from action
 */
export function updateStatus(data, action, params) {
  if (action.json && action.json.status) {
    console.log('status', action.json.status)
    // if (action.json.status !== 200) {
    //   data.note = ''
    //   data.status = 'waiting'
    //   data.updated_at = data.created_at
    // }
  } else {
    data.note = params.note
    data.status = params.status
    data.updated_at = new Date().getTime() / 1000
  }
  
  return data
}
