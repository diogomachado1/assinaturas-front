import React from 'react';
import { FormDataConsumer,FileInput, ImageField, Create, Edit, SimpleForm, TextInput, List, Datagrid, TextField } from 'react-admin';

export const CardList = props => {
    return (
        <List {...props}>
            <Datagrid rowClick="edit">
                <TextField source="name" />
            </Datagrid>
        </List>
    );
}

export const CardEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput label="Nome" source="name" />
            <FileInput source="files" label="Related files" accept={"image/jpeg, image/png"} placeholder={<p>Drop your file here</p>}>
                <ImageField source="src" title="title" />
            </FileInput>
        </SimpleForm>
    </Edit>
);

export const CardCreate = props => {
    
    return (
    <Create {...props}>
        <SimpleForm>
            <TextInput label="Nome" source="name" />
            <FileInput source="files" label="Related files" accept={"image/jpeg, image/png"} placeholder={<p>Drop your file here</p>}>
                <ImageField source="src" title="title" />
            </FileInput>
            <FormDataConsumer>
                            {({ formData, ...rest }) => {
                                console.log(formData)
                            }
                            }
                        </FormDataConsumer>
        </SimpleForm>
    </Create>
)};
