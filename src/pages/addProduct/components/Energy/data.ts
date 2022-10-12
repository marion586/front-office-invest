interface Peb{
      id : number,
      label : string,
      color ?: string
}

interface List {
      id : number,
      label : string, 
      name : string,
      type : string
}


export const menuList :List[] = [
      {
            id : 0,
            label : "Type chaudière",
            name : "boilerType",
            type : "input" 
      },
      {
            id : 1,
            label : "Date d'installation de chaudère",
            name : "boilerInstallationDate",
            type : "date" 
      },
      {
            id : 0,
            label : "Résultat PEB",
            name : "pebResult",
            type : "input" 
      },
]

export const PEBValue :Peb[] = [
      {
            id : 0,
            label : "A+"
      },
      {
            id : 1,
            label : "A"
      },
      {
            id : 2,
            label : "B"
      },
      {
            id : 3,
            label : "C"
      },
      {
            id : 4,
            label : "D"
      },
      {
            id : 5,
            label : "E"
      },
      {
            id : 6,
            label : "F"
      },
      {
            id : 7,
            label : "G"
      },
]