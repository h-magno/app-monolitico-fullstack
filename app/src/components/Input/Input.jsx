import { TextField } from "@mui/material"
import { PropTypes } from "prop-types"

const Input = (fullWidth, style, id, label, variant, value, onChange) => {
    return <TextField 
        fullWidth={fullWidth}
        style={style}
        id={id}
        label={label}
        variant={variant}
        onChange={onChange}
        value={value}
    />
}

Input.defaultProps = {
    fullWidth: false,
    style: {},
    id:"",
    label: "oi",
    variant: "",
    onChange: () => {},
    value: "",
}
Input.prototype = {
    fullWidth: PropTypes.bool,
    style: PropTypes.object,
    id: PropTypes.string,
    label: PropTypes.string,
    variant: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
}

export default Input
// TODO: Não está enviando o component