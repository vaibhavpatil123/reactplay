import axios from 'axios'

const baseUrl = 'http://localhost:4000';

export const getTodos = async ()=>{
    const res = axios.get(`${baseUrl}/api`)
                .then(d => { console.log('data=',d); return d.data } )
                .catch(error => error);
        console.log("axios res=",res)
        return res;
}


export const addUser =async (user)=>{
    const res = axios.post(`${baseUrl}/users`,user)
                .then(d => d.data)
                .catch(error => error);
        return res;
}
