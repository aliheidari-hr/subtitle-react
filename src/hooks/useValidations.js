import { useDispatch } from "react-redux";

export default function useValidation() {
    const dispatch = useDispatch();

    const selectBoxObj = (value, defaultValue, setValue, mandatory, label, key) => {
        if (value == defaultValue) {
            if (mandatory) {
                dispatch(setValue({ value: value, key: key, error: { isError: true, textError: `Please select an ${label}!` } }));
                return false;
            } else {
                dispatch(setValue({ value: value, key: key, error: { isError: false, textError: '' } }));
                return true;
            }
        } else {
            dispatch(setValue({ value: value, key: key, error: { isError: false, textError: '' } }));
            return true;
        }
    };

    const validator = (props) => {
        switch (props.type) {
            case 'selectBoxObj':
                return selectBoxObj(props.value, props.defaultValue, props.setValue, props.mandatory, props.label, props.key);
            default:
                return false;
        }
    };

    return validator;
}
