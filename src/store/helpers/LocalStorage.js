function checking()
{
  if(typeof(Storage) !== 'undefined') return true
  return false
}

export function setStorage(key, val)
{
  if(checking())
  {
    localStorage.setItem(key, val)
  }else 
  {
    console.error('local storage not supported for your browser')
  }
}

export function getStorage(key)
{
  if(checking())
  {
    return localStorage.getItem(key)
  }else 
  {
    console.error('local storage not supported for your browser')
  }
}