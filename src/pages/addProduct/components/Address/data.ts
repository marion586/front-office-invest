interface List{
      id : Number,
      label : string,
      name : string,
      type : string,
      hasMap ?: boolean,
      required ?: boolean
}


export const inputList : List[] = [
      {
            id : 0,
            label : "Adress",
            name : "address",
            type : "input",
            hasMap : true,
            required : true,
      },
      {
            id : 1,
            label : "Pays",
            name : "country",
            type : "input",
            required : true,
      },
      {
            id : 2,
            label : "Région",
            name : "region",
            type : "input",
            required : true,
      },
      {
            id : 3,
            label : "Commune",
            name : "commune",
            type : "input",
            required : true,
      },
      {
            id : 4,
            label : "Code postal",
            name : "postalCode",
            type : "input",
            required : true
      },
]