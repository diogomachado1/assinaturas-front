import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    DELETE_MANY,
    fetchUtils,
} from 'react-admin';
import { stringify } from 'query-string';

const API_URL = process.env.REACT_APP_API_URL||'http://localhost:4000/api';

/**
 * @param {String} type One of the constants appearing at the top of this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertDataProviderRequestToHTTP = (type, resource, params) => {
    console.log(params)
    switch (type) {
    case GET_LIST: {
        const { page, perPage } = params.pagination;
        const query = {
            page: page,
            size: perPage,
            filter: params.filter.q,
        };
        return { url: `${API_URL}/${resource}?${stringify(query)}` };
    }
    case GET_ONE:
        return { url: `${API_URL}/${resource}/${params.id}` };
    case GET_MANY: {
        const { page, perPage } = params.pagination;
        const query = {
            page: page,
            size: perPage,
            filter: params.filter,
        };
        return { url: `${API_URL}/${resource}?${stringify(query)}` };
    }
    case GET_MANY_REFERENCE: {
        const { page, perPage } = params.pagination;
        //const { field, order } = params.sort;
        const query = {
            page: page,
            size: perPage,
            filter: params.filter,
        };
        return { url: `${API_URL}/${resource}?${stringify(query)}` };
    }
    case UPDATE:
        return {
            url: `${API_URL}/${resource}/${params.id}`,
            options: { method: 'PUT', body: JSON.stringify(params.data) },
        };
    case CREATE:
            if(resource === 'card'){
                const data = new FormData();
                console.log( params.data.files.src)
                data.append("file", params.data.files.rawFile, params.data.files.title);
                console.log('test')
                return {
                    url: `${API_URL}/${resource}`,
                    options: { method: 'POST', body: data },
                };
            }else{
                return {
                    url: `${API_URL}/${resource}`,
                    options: { method: 'POST', body: JSON.stringify(params.data) },
                };

            }
    case DELETE:
        return {
            url: `${API_URL}/${resource}/${params.id}`,
            options: { method: 'DELETE' },
        };
    case DELETE_MANY:
        return {
            url: `${API_URL}/${resource}/${params.ids}`,
            options: { method: 'DELETE' },
        };
    default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
};

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top of this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} Data Provider response
 */
const convertHTTPResponseToDataProvider = (response, type, resource, params) => {
    const { json } = response;
    switch (type) {
    case GET_LIST:
        return {
            data: json.data.map(x => {
                x.id=x._id;
                return x;
            }),
            total: json.count
            //parseInt(headers.get('content-range').split('/').pop(), 10),
        };
    case GET_ONE:
        json.id = json._id;
        return {
            data: json
            //parseInt(headers.get('content-range').split('/').pop(), 10),
        };
    case UPDATE:
        json.id = json._id;
        return {
            data: json
            //parseInt(headers.get('content-range').split('/').pop(), 10),
        };
    case CREATE:
        return { data: { ...params.data, id: json._id } };
    case DELETE_MANY:
        return {
            data: json.data.map(x => x),
            //total: json.count
            //parseInt(headers.get('content-range').split('/').pop(), 10),
        };
        case DELETE:
                const obj = {}
                obj.id=json.data[0];
                return {
                    data: obj,
                    //total: json.count
                    //parseInt(headers.get('content-range').split('/').pop(), 10),
                };
    default:
        return { data: json };
    }
};

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for response
 */
export default (type, resource, params) => {
    const { fetchJson } = fetchUtils;
    let { url, options } = convertDataProviderRequestToHTTP(type, resource, params);
    if(!options){
        options = {}
    }
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    // if(resource === 'card'){
    //     options.headers = new Headers({ 'Content-Type': 'multipart/form-data' });
    // } 
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`)
    return fetchJson(url, options)
        .then(response => convertHTTPResponseToDataProvider(response, type, resource, params));
};