interface ListItem{
      id : number,
      label : string,
      name : string,
      type : string,
      placeholder ?: string
}


interface List{
      id : number,
      title : string,
      item : ListItem[]
}


export const menuList :List[] = [
      {
            id : 0,
            title : "A propos du chambre",
            item : [
                  {
                        id : 0,
                        label : "Nombre de chambre",
                        name : "roomNumber",
                        type : 'input',
                  }
            ]
      }
]

export const details : ListItem[] = [
      {
            id : 0,
            label : "Chambre à coucher",
            name : "bedroom",
            type : "input",
      },
      {
            id : 1,
            label : "Nombre de salle de bain",
            name : "bathRoom",
            type : "input",
      },
      {
            id : 2,
            label : "Surface (en m²)",
            name : "surface",
            type : "input",
      },
]


export const room :ListItem[] = [
      {
            id : 0,
            label : "Surface de chambre",
            name : "roomSurface",
            type : "input",
      },
      {
            id : 1,
            label : "Type de vitrage",
            name : "mirror",
            type : "input",
      },
      {
            id : 1,
            label : "Dérnière rénovation",
            name : "lastRenovation",
            type : "input",
      },
      {
            id : 3,
            label : "Type de chauffage",
            name : "heatingType",
            type : "input",
      },
]