export let validator = {}

export function resetValidator() {
  validator = {}
}

export function validate(props) {
  const { name, max, value, required, type } = props
  if (required && (!value || value == 0)) {
    return generateResult(props, false, "wajib diisi")
  } else if (max && value.length > max) {
    //handle max character
    return generateResult(
      props,
      false,
      "input melebihi batas maksimal karakter"
    )
  } else if (type == "number" && !parseInt(value)) {
    //handle input type number
    return generateResult(props, false, "inputan bukan angka")
  } else if (type == "link" && !value.includes("http")) {
    //handle input type link
    return generateResult(
      props,
      false,
      "harus link valid yang dilengkapi dengan, http:// atau https://"
    )
  } else if (type == "email" && !value.includes("@")) {
    //handle input type email
    return generateResult(props, false, "harus email valid")
  } else if (type == "file") {
    //handle input type file
    return handleFileValidator(props)
  }

  return generateResult(props, true)
}

export function validationChecker() {
  let is_valid = true
  Object.keys(validator).map(n => {
    is_valid = is_valid && validator[n].is_valid
  })
  return is_valid
}

export function validationSeter(keys) {
  keys.map(n => {
    if (!validator[n + "_validate"]) {
      validator[n + "_validate"] = generateResult(
        { name: n },
        false,
        "wajib diisi"
      )
    }
  })

  return validator
}

function handleFileValidator(props) {
  const { max, value } = props
  if (value.size > max) {
    //melebihi max size
    return generateResult(
      props,
      false,
      "ukuran maksimum adalah " + max / 1000000 + " MB"
    )
  }
  return generateResult(props, true)
}

function generateResult(props, is_valid = true, message = "") {
  const { name } = props
  const result = {
    is_valid,
    message
  }
  validator[name + "_validate"] = result
  return result
}
