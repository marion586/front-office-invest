import {get,getWithQueryParams} from "@/services/findPropertyServices";
import { StatsBase } from "fs";
import { ActionContext } from "vuex";


export const state = ()=>{
    return{

    }
}

export const actions = {
    findPropertiesByCity({ commit }: ActionContext<any, any>,payload : Object){
        const result = getWithQueryParams("the_property/search",payload);
        result.then(({data }) =>{
            console.log('status : ', data)
            if(data.status === 200){
                return data;
            }
            
        })
    }
}
