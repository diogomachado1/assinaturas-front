import React from 'react';
import {
    FormDataConsumer,
    Filter, Create, Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    List, Datagrid,
    TextField, EditButton,
    required,
    minLength,
    maxLength,
    email,
    UrlField
} from 'react-admin';
import Highlight from 'react-highlight.js';
import Clipboard from 'react-clipboard.js';
import Description from '@material-ui/icons/Description';
import { FieldArray } from 'redux-form';
import { ContactsFields } from './components/materialUi'
import AwesomeDebouncePromise from 'awesome-debounce-promise';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

const SignatureFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

const preview = AwesomeDebouncePromise((formData) => {
    return (<img alt='assinatura' src={`${API_URL}/preview/${formData.type}/${window.btoa(JSON.stringify(formData))}`}></img>
    )
}, 500);

const validateFields = [required('Campo obrigatório'), minLength(3, 'Tamanho  mínimo 3'), maxLength(30, 'Tamanho  máximo 33')];
const validateEmail = [required('Campo obrigatório'), minLength(3, 'Tamanho  mínimo 3'), maxLength(30, 'Tamanho  máximo 35'), email('E-mail inválido')];
export const SignatureList = props => (
    <List title="Assinaturas" filters={<SignatureFilter />} {...props}>
        <Datagrid>
            <TextField source="email" />
            <TextField source="name" label="Nome" />
            <UrlField source="url" label="Link" />
            <TextField source="position" label="Cargo" />
            <EditButton />
        </Datagrid>
    </List>
);


export class SignatureEdit extends React.Component {
    state = {
        url: null,
    };

    handleState = async formData => {
        const result = await preview(formData);
        this.setState({ url: result });
    };

    render() {
        const { props } = this
        return (
            <Edit title="Editar assinatura" {...props}>
                <SimpleForm>
                    <div className="signatureForm">
                        <div>
                            <TextInput validate={validateEmail} inputProps={{ maxLength: 30 }} label="E-mail" source="email" />
                            <TextInput validate={validateFields} inputProps={{ maxLength: 30 }} label="Nome" source="name" />
                            <TextInput validate={validateFields} inputProps={{ maxLength: 30 }} label="Cargo" source="position" />
                            <SelectInput label="Empresa" source="business" defaultValue={"empresa1"} choices={[
                                { id: 'empresa1', name: 'Empresa 1' },
                                { id: 'empresa2', name: 'Empresa 2' },
                                { id: 'empresa3', name: 'Empresa 3' },
                                { id: 'empresa4', name: 'Empresa 4' },
                                { id: 'empresa5', name: 'Empresa 5' }
                            ]} />
                            <SelectInput label="Formato" defaultValue={"png"} source="type" choices={[
                                { id: 'png', name: 'PNG' },
                                { id: 'jpeg', name: 'JPEG' },
                            ]} />
                            <FieldArray label="Contatos" name="contacts" component={ContactsFields} />
                        </div>
                        <div >
                            <FormDataConsumer>
                                {({ formData, ...rest }) => {
                                    if (formData) {
                                        const html = `<img src="${formData.url}" />`;
                                        this.handleState(formData)
                                        return (
                                            <>
                                                {this.state.url}
                                                <div className="clipBoard">
                                                    <Highlight language="html">{html}</Highlight>
                                                    <Clipboard onSuccess={(e) => {
                                                        e.trigger.classList.add('success');
                                                        setTimeout(() => {
                                                            e.trigger.classList.remove('success')
                                                        }, 1500);
                                                    }}
                                                        className="clipBoardButton"
                                                        data-clipboard-text={html}>
                                                        <Description></Description>
                                                    </Clipboard>
                                                </div>
                                            </>
                                        )
                                    }
                                }
                                }
                            </FormDataConsumer>
                        </div>
                    </div>

                </SimpleForm>
            </Edit>
        );
    }
}

//window.btoa(JSON.stringify(this.signature)
export class SignatureCreate extends React.Component {
    state = {
        url: null,
    };

    handleState = async formData => {
        const result = await preview(formData);
        this.setState({ url: result });
    };

    render() {
        const { props } = this
        return (
            <Create title="Criar assinatura" {...props}>
                <SimpleForm>
                    <div className="signatureForm">
                        <div>
                            <TextInput validate={validateEmail} inputProps={{ maxLength: 30 }} label="E-mail" source="email" />
                            <TextInput validate={validateFields} inputProps={{ maxLength: 30 }} label="Nome" source="name" />
                            <TextInput validate={validateFields} inputProps={{ maxLength: 30 }} label="Cargo" source="position" />
                            <SelectInput label="Empresa" source="business" defaultValue={"empresa1"} choices={[
                                { id: 'empresa1', name: 'Empresa 1' },
                                { id: 'empresa2', name: 'Empresa 2' },
                                { id: 'empresa3', name: 'Empresa 3' },
                                { id: 'empresa4', name: 'Empresa 4' },
                                { id: 'empresa5', name: 'Empresa 5' }
                            ]} />
                            <SelectInput label="Formato" defaultValue={"png"} source="type" choices={[
                                { id: 'png', name: 'PNG' },
                                { id: 'jpeg', name: 'JPEG' },
                            ]} />
                            <FieldArray label="Contatos" name="contacts" component={ContactsFields} />
                        </div>
                        <div >
                            <FormDataConsumer>
                                {({ formData, ...rest }) => {
                                    if (formData) {
                                        this.handleState(formData)
                                        return (
                                            <>
                                               {this.state.url}
                                            </>
                                        )
                                    }
                                }
                                }
                            </FormDataConsumer>
                        </div>
                    </div>

                </SimpleForm>
            </Create>
        )
    }
};
