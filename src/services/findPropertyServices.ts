import {Http} from "./http";

export const get = (url : string) =>{
        return Http.get(url)    
    }

export const getWithQueryParams = (url : string, params : any) =>{
    let formatted_params = "?";    
    const p = Object.keys(params)
        p.forEach(elt=>{
            formatted_params += `${elt}=${params[elt]}&`
        })
        formatted_params +=";"
        formatted_params = formatted_params.replace("&;","");

        console.log(formatted_params);
        return Http.get(url+formatted_params)    
    }


// async getMultiQuery(type, parametre) {
    
//     return await this.http.get(WS[this.model][type] + params);
// }