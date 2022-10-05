import 'leaflet';
import 'leaflet-easyprint';
let id = "";
 
/**
 * 
 * @param {String} id 
 */
export const init = (id)=>{
    let map = L.map(id, {
        zoom: 15,
        center: [51.505, -0.09],
        maxZoom: 19,
        });
        L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution:
                    '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
            }
        ).addTo(map)
}
/**
 * 
 * @param {Map} map the map component
 * @param {Object} polygone_obj - object cntaining polygon bject
 * @param {Array} polygone_arr - array from polygon object
 * @param {Object} events  - list of event need in renderMap function
 * @param {Object} conditions - list of boolean variables needed for display or not controls
 */


export default class Map{
    containerid;
    map;
    constructor(containerId){
        this.containerid = containerId;
        console.log("map is instantiate")

    }
    setContainerId(id){
        this.containerid = id;
    }
    init(){
        this.map = L.map(this.containerid, {
            zoom: 15,
            center: [51.505, -0.09],
            maxZoom: 19,
        });
        L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution:
                '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
            }
            ).addTo(this.map)
    }
}
