import axios from 'axios'
import * as config from './../constants/config'

export default function callApi(endpoint, method = 'GET', body){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
    headers.append('Access-Control-Allow-Credentials', 'true');
    //headers.append('GET', 'POST', 'OPTIONS');
    try{
        return axios({
                    method: method,
                    url: `${config.API_URL}/${endpoint}`,
                    data: body,
                    headers: headers
                }).catch(err =>{
                    console.log(err);
            });
    }catch(ex){
        console.log(ex)
    }
}

