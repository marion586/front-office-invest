interface SubOptions {
      id : number,
      label ?: string,
      type ?: string,
      name ?: string
}
interface OptionItem{
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
            name : "",
            placeholder : "Sélectionez",
            options : [
                  {
                      name : "Location",  
                  },
                  {
                      name : "Vente",  
                  },
            ]
      },
      {
            id : 1,
            label : "Type de bien",
            type :"select",
            name : "",
            placeholder : "Sélectionez",
            options : [
                  {
                        name : "Maison"
                  }
            ]
      },
      {
            id : 2,
            label : "Disponibilité",
            type : "select",
            name : "",
            placeholder : "Sélectionez",
            options : [],
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
            type : "radio",
            name : "",
            options : []
      },
      {
            id : 4,
            label : "Copie de bail",
            type : "",
            name : "",
            options : []
      }
];

export const footer = [
      {
            title : "(*) champ obligatoire"
      }
]