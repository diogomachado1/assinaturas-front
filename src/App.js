import React from 'react';
//import jsonServerProvider from 'ra-data-json-server';
import { Admin, Resource } from 'react-admin';
import { UserList, UserEdit, UserCreate } from './users';
//import {CardList,CardEdit,CardCreate } from './card';
import { SignatureList, SignatureEdit, SignatureCreate } from './signature';
import SignatureIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
//import Dashboard from './Dashboard';
import authProvider from './authProvider';
import dataProvider from './dataProvider';
import theme from './components/theme'
//const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
//<Resource options={{ label: "Modelos" }} name="card" list={CardList} edit={CardEdit} create={CardCreate} icon={SignatureIcon} />,
const App = () => (
  <Admin  theme={theme} dataProvider={dataProvider} authProvider={authProvider}>
      {permissions => [
        <Resource options={{ label: "Assinaturas" }} name="signature" list={SignatureList} edit={SignatureEdit} create={SignatureCreate} icon={SignatureIcon} />,
        permissions === 'true' ?
          <Resource options={{ label: "Usuarios" }} name="users"
            list={UserList} edit={UserEdit} create={UserCreate}
            icon={UserIcon} /> : null]}
    </Admin>
);

export default App;
