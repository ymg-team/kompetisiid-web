/**
 * Created by yussan on 12/11/16.
 */

let formdata = []

export default {
    is_valid: true,
    formdata: [],

    validate(props)
    {
        let message = '', is_valid = true, result;

        //is number
        if(props.type === 'number' && !Number.isInteger(parseInt(props.value)))
        {
            is_valid = false
            message = props.name+' input bukan angka'
        }

        //setup minimum
        if(props.min && (props.value.length < props.min ))
        {
            is_valid = false
            message = 'minimal karakter adalah '+props.min
        }

        //setup maximum
        if(props.max && (props.value.length > props.max))
        {
            is_valid = false
            message = 'maksimal karakter adalah '+props.max
        }

        //input is required
        if(!props.required || (props.required && props.value.length > 0))
        {
            if(is_valid)
            {
                is_valid = true
            }
            else
            {
                is_valid = false
                message = message
            }
        }else{
            is_valid = false
            message = props.name+' wajib diisi'
        }

        //validate result
        result = {
            name: props.name,
            is_valid: is_valid,
            message: message
        }

        //assign
        this.formdata.find(n => {
            if(n.name === props.name)
            {
                result = Object.assign(n, result)
            }
        })

        return result
    },

    validateFile(props)
    {
        let message = '', is_valid = true, result;

        //default max size 2MB
        let max = props.max ? props.max : 2000000;

        //max upload file size
        if (props.file.size > max) {
            is_valid = false
            message = 'melewati batas ukuran file'
        }

        //validate result
        result = {
            name: props.name,
            is_valid: is_valid,
            message: message
        }

        //assign
        this.formdata.find(n => {
            if (n.name === props.name) {
                result = Object.assign(n, result)
            }
        })
    },

    validateSubmit()
    {
        this.is_valid = this.formdata.length < 1 ? false : true
        const _this = this
        this.formdata.map((n) => {
            _this.is_valid = _this.is_valid && n.is_valid
        })

        return _this.is_valid
    },

    stateData(state, inputarray)
    {
        inputarray.map((n) => {
            this.formdata.find(m => {
                if(m.name === n)
                {
                    state['validate_'+n] = m;
                }
            })
        })

        return state
    }
}