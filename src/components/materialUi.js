import React from 'react';
import { Field } from 'redux-form';
import SelectField from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import TextField from '@material-ui/core/TextField';

import './materialUi.scss'
const renderSelectField = ({ input, label, meta: { touched, error }, children }) => (
    <>
        <InputLabel shrink htmlFor="age-native-label-placeholder">
            {label}
        </InputLabel>
        <SelectField
            label={label}
            {...input}
            onChange={(event, index, value) =>  input.onChange(event.target.value) }
            children={children} />
    </>
)

const renderTextField = ({ input, label, meta: { touched, error }, children }) => {
    return (
    <>
        <TextField
            margin="normal"
            placeholder={label}
            {...input}
            onChange={(event, index, value) => input.onChange(event.target.value)}
        />
    </>
)}

const ContactsFields = ({ fields, meta: { error, submitFailed } }) => {
    const upField = (index) => {
        fields.swap(index, index - 1)
    }
    const downField = (index) => {
        fields.swap(index, index + 1)
    }
    return (
        <div className="contactsArray">
            {fields.map((member, index) => (
                <li key={index}>
                    <div>
                        {index > 0 ? <IconButton onClick={() => upField(index)}>
                            <ArrowDropUp />
                        </IconButton> : null}
                        <IconButton className="removeContact" onClick={() => fields.remove(index)}>
                            <DeleteIcon />
                        </IconButton>
                        {index < fields.length - 1 ? <IconButton onClick={() => downField(index)}>
                            <ArrowDropDown />
                        </IconButton> : null}
                    </div>
                    <span>
                        <Field
                            name={`${member}.id`}
                            component={renderSelectField}
                            label="Contato"
                        >
                            <MenuItem value={"movel"} >Tel. Movel</MenuItem>
                            <MenuItem value={"fixo"} >Tel. Fixo</MenuItem>
                            <MenuItem value={"telegram"} >Telegram</MenuItem>
                            <MenuItem value={"whatsapp"} >Whatsapp</MenuItem>
                            <MenuItem value={"skype"} >Skype</MenuItem>
                        </Field>
                        <Field maxLength="30" name={`${member}.value`} component={renderTextField} label="Valor" />
                    </span>
                </li>
            ))}
            <Button variant="contained" color="primary" onClick={() => fields.push({ id: 'telegram' })}>
                <AddIcon />
                Contato
        </Button>
            {submitFailed && error && <span>{error}</span>}
        </div>
    )
};

export { renderSelectField, ContactsFields }