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
            label : "A+",
            color : "#0F8841"
      },
      {
            id : 1,
            label : "A",
            color : "#18B357"
      },
      {
            id : 2,
            label : "B",
            color : "#35CA34"
      },
      {
            id : 3,
            label : "C",
            color : "#68FB33"
      },
      {
            id : 4,
            label : "D",
            color : "#CDFD38"
      },
      {
            id : 5,
            label : "E",
            color : "#FFE556"
      },
      {
            id : 6,
            label : "F",
            color : "#FEC601"
      },
      {
            id : 7,
            label : "G",
            color : "#FF9935"
      },
]