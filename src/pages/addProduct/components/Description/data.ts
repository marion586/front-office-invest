 interface List{
      id : number,
      label : string,
      type : string,
      name : string,
      placeholder ?: string
 }

 export const itemList : List[] = [
      {
            id : 0,
            label : "Détails",
            type : 'textArea',
            name : "details",
      }
 ]