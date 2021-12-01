import axios from 'axios';

export function getAllVideogames(){
    return async function(dispatch){
       let json = await axios.get('http://localhost:3001/videogames',[]);
       dispatch({
            type:'GET_VIDEOGAMES',
            payload: json.data
       })
    }
}