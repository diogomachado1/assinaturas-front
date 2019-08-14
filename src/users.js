import React from 'react';
import { BooleanInput, EmailField, Create, Edit, SimpleForm, TextInput, List, Datagrid, TextField } from 'react-admin';

export const UserList = props => {
    return (
        <List {...props}>
            <Datagrid rowClick="edit">
                <EmailField source="email" />
                <TextField source="name" />
                <TextField source="_id" />
            </Datagrid>
        </List>
    );
}

export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm>
           <TextInput label="Email" source="email" />
           <TextInput label="Nome" source="name" />
           <TextInput label="Senha" type="password" source="password" />  
           <BooleanInput label="Admin" source="admin" /> 
        </SimpleForm>
    </Edit>
);

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput label="Email" source="email" />
            <TextInput label="Nome" source="name" />
            <TextInput label="Senha" type="password" source="password" />
        </SimpleForm>
    </Create>
);
