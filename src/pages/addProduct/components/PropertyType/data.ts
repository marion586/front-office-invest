interface SubOptions {
      id : number,
      label ?: string,
      type ?: string,
      name ?: string
}
interface OptionItem{
      id : number,
      name : string,
}

interface List {
      id : number,
      label : string,
      type ?:string,
      name ?:string,
      placeholder ?:string,
      options ?: OptionItem[],
      subOptions ?: SubOptions[]
}


export const data : List[] = [
      {
            id : 0,
            label : "Type de vente",
            type : "select",
            name : "saleType",
            placeholder : "Sélectionez",
            options : [
                  {
                        id : 0,
                        name : "Location",  
                  },
                  {
                        id : 1,
                        name : "Vente",  
                  },
            ]
      },
      {
            id : 1,
            label : "Type de bien",
            type :"select",
            name : "propertyType",
            placeholder : "Sélectionez",
            options : [
                  {
                        id : 0,
                        name : "Maison"
                  }
            ]
      },
      {
            id : 2,
            label : "Disponibilité",
            type : "select",
            name : "disponibility",
            placeholder : "Sélectionez",
            options : [
                  {
                        id : 0,
                        name : "Immediatement"
                  }
            ],
            subOptions : [
                  {
                        id : 0,
                        label : "Disponible le",
                        type : "date",
                        name : "",
                  }
            ]
      },
      {
            id : 3,
            label : "Annonce avec délai de publication",
            type : "switch",
            name : "annonce",
            options : [
                  {
                        id : 0,
                        name : "immediat"
                  }
            ]
      },
      {
            id : 4,
            label : "Copie de bail",
            type : "file",
            name : "bailCopy",
      }
];

export const footer = [
      {
            title : "(*) champ obligatoire"
      }
]