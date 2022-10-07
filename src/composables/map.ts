import 'leaflet';
import L, { Control, FeatureGroup, LatLngBoundsExpression, LatLngExpression, LatLngLiteral, LayerGroup, MapOptions, } from 'leaflet';
import 'leaflet-easyprint';
import '@geoman-io/leaflet-geoman-free';
import "leaflet-draw";
interface layerType{
    type : string,
    latlng : LatLngExpression[]
}



export default class Map {
    containerid : string;
    editableLayers = new L.FeatureGroup();

    mapOptions : {[key : string] : any} = {
        zoom: 15,
        center: [51.505, -0.09],
        maxZoom: 19,
        pmIgnore: false,
    };
    map: L.Map ;
    featureGroup : FeatureGroup;
    layers : layerType[] = [];
    constructor(containerId : string){
        this.containerid = containerId;
        this.featureGroup = L.featureGroup();
        this.map = L.map(this.containerid, this.mapOptions);
        this.map.pm.setLang('fr');
        this.init();

    }

    setContainerId(id : string){
        this.containerid = id;
    }
    init(){
        
        L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                maxZoom: 50,
            }
            ).addTo(this.map)
    }
    addControl(customControl : Control){
        this.map.addControl(customControl);
    }
    /**
     * 
     * @param coord coordonner du point qui va servir de centre de la carte
     */
     fitBound(coord : any){
        this.map.setView(coord);
    }

    /**
     * 
     * @param latLong cooordonéé du marqueur à placer sur la carte
     */
    addMarker(latLong : LatLngLiteral){
        L.marker(latLong).addTo(this.map);
    }
    
    createPolygon(coordinates : LatLngExpression[]){
        return L.polygon(coordinates).addTo(this.map)
    }
    
    addPrintControl(){
        const printPlugin= (L as any).easyPrint({
            hidden: false,
            position: 'topright',
            sizeModes: ['A4Landscape'],
        });
        this.addControl(printPlugin)
    }

    //for drawing toolbar we use leaflet-geoman plugin
    addDrawControl(){
        let drawControl = new (L.Control as any).Draw({
            draw : {
                //ignoored draw options 
                rectangle : false,
                circle : false,
                polyline : false,
                circlemarker : false
            },
            edit: {
                featureGroup: this.editableLayers,
            }
        });
        this.map.addControl(drawControl);   
    }

    /**
     * listenning grawing event and add to drawn layer data 
     */
    DrawingLayerListener(){
        let selectedFeature : any = null;
        this.map.on("draw:created",(e : any)=>{
            console.log(e)
            const layer = e.layer;
            selectedFeature = e.layer;
                if(e.layerType === "polygon"){

                    let p = new L.Polygon(layer._latlngs[0]);
                    this.featureGroup.addLayer(p);
                    this.featureGroup.addTo(this.map);
                    p.addTo(this.map);

                }else if(e.layerType === "marker"){

                    let  m = new L.Marker(layer._latlng)
                    this.featureGroup.addLayer(m);
                }
            })
            // this.map.on("click", (e)=>{
            //     selectedFeature = e.target;
            //     console.log(e)
            //     if(selectedFeature){
            //         selectedFeature.editing.disable();
            //         // and Here I'll add the code to store my edited polygon in the DB or whatever I want to do with it
            //     }
            //     selectedFeature = e.target;
            //     e.target.editing.enable();
            // });
    }


}
