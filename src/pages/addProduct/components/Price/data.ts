interface List {
      id : number, 
      label : string,
      name : string,
      required : boolean
}

export const menuList : List[] = [
      {
            id : 0,
            label : "Montant",
            name : "cost",
            required : true
      },
      {
            id : 1,
            label : "Montant de réserve minimum",
            name : "minCost",
            required : true
      },
      {
            id : 2,
            label : "Cadastre",
            name : "cadastre",
            required : true
      },
      {
            id : 3,
            label : "Revenu cadastral",
            name : "cadastreRevenu",
            required : true
      },
]