interface File{
      id : number,
      label : string,
      type : string,
      name : string
}

interface List{
      id : number,
      label : string,
      type : string,
      name : string,
      placeholder ?: string,
      file : File
 }


 export const menuList : List[] = [
      {
            id : 0,
            label : "Titre du document",
            type : "text",
            name : "documentTitle",
            file : {
                id : 0,
                label : "",
                type : "file",
                name : "fileDocument"   
            }
      }
 ]