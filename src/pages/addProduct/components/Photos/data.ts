interface SubTitle {
      id : number,
      text : string
}

interface List{
      id : number,
      label : string,
      name : string,
      type ?: string,
      subtitle ?: SubTitle[]
}


export const inputItem : List[] = [
      {
            id : 0,
            label : "Lien de la vidéo",
            name : "videoLink",
            type : "input",
      },
      {
            id : 1,
            label : "Image",
            name : "image",
            type : "file",
            subtitle : [
                  {
                        id : 0,
                        text : 'La taille maximale par image est 5MB'
                  },
                  {
                        id : 1,
                        text : "Formats acceptés JPG"
                  }
            ]  
      }
]