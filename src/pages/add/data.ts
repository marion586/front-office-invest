
import DefaultMenu from '@/components/Icon/DefaultMenuIcon.vue';
import Adress from '@/pages/add/components/Address/index.vue';
import Photos from '@/pages/add/components/Photos/index.vue';
import Price from '@/pages/add/components/Price/index.vue';
import PropertyType from '@/pages/add/components/PropertyType/index.vue';

interface SubMenu{
      id : number,
      label : string,
      component ?: object
}

interface Menu {
      id : number,
      label : string,
      icon : string,
      subMenu ?: SubMenu[],
      component ?: object
}

export const data : Array<Object> = [
      {
            id : 0,
            label : "Information de base",
            icon : DefaultMenu,
            subMenu : [
                  {
                        id : 0,
                        label : "Type de bien",
                        component : PropertyType
                  },
                  {
                        id : 1,
                        label : "Adresse",
                        component : Adress
                  },
                  {
                        id : 2,
                        label : "Photos",
                        component : Photos
                  },
                  {
                        id : 3,
                        label : "Prix",
                        component : Price
                  },
            ]
      },
      {
            id : 2,
            label : "Information de base",
            icon : DefaultMenu,
            subMenu : [
                  {
                        id : 4,
                        label : "Générale",
                  },
                  {
                        id : 5,
                        label : "intérieur",
                  },
                  {
                        id : 6,
                        label : "Caractéristique énergetique",
                  },
            ]
      },
      {
            id : 3,
            label : "Description de l'annonce",
            icon : DefaultMenu,
            component : PropertyType,
      },
      {
            id : 4,
            label : "Documents relatifs aux biens",
            icon : DefaultMenu,
            component : PropertyType,
      }
]