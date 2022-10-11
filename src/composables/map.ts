import 'leaflet';
import L, { Control, FeatureGroup, LatLng, LatLngBoundsExpression, LatLngExpression, LatLngLiteral, LayerGroup, MapOptions, } from 'leaflet';
import 'leaflet-easyprint';
import '@geoman-io/leaflet-geoman-free';
import "leaflet-draw";

interface layerType{
    type : string,
    latlng : any[] | LatLngExpression,
    layerID : number
}


const layerType = {
    polygon : "polygon",
    marker : "marker"
}
export default class Map {
    containerid : string;
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
     fitBound(coord : LatLngExpression){
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
                featureGroup: this.featureGroup,
            }
        });
        this.map.addControl(drawControl);   
    }
    getFeatures(){
        return this.layers;
    }
    getPolygonFeatures(){
        return  this.layers.filter(e =>(e.type  === layerType.polygon))
    }
    getMarkerFeatures(){
        return  this.layers.filter(e =>(e.type  === layerType.marker))
    }
    /**
     * ######## ALL ABOUT DRAWING LAYERS ##########
     * listenning drawing event and add to drawn layer data 
     */
    DrawingLayerListener(){
        
        let selectedFeature : any = null;
        this.map.on("draw:created",(e : any)=>{
            console.log(e)
            const layer = e.layer;
            selectedFeature = e.layer;
                if(e.layerType === layerType.polygon){
                    // handle polygon layer after creation
                    let p = new L.Polygon(layer._latlngs[0]);
                    this.featureGroup.addLayer(p);
                    this.featureGroup.addTo(this.map);
                    this.layers.push({
                        type : layerType.polygon,
                        latlng : (p.getLatLngs() as [][])[0],
                        layerID : this.featureGroup.getLayerId(p) 
                    })

                }else if(e.layerType === layerType.marker){
                    //handle marker layers after creation
                    let  m = new L.Marker(layer._latlng)
                    this.featureGroup.addLayer(m);
                    this.featureGroup.addTo(this.map);

                    this.layers.push({
                        type : layerType.marker,
                        latlng : m.getLatLng(),
                        layerID : this.featureGroup.getLayerId(m)
                    })
                }

                this.featureGroup.eachLayer(layer=>{
                })
                console.log("layers : ",this.featureGroup.getLayers())
                console.log('local layer : ', this.layers)
            })

            this.map.on((L as any).Draw.Event.DELETED, e => {
                (e as any).layers.eachLayer((layer : any) => {
                   console.log( "deleted item", layer._leaflet_id)
                   this.layers.forEach(l=>{
                    if(l.layerID === layer._leaflet_id){
                        const index = this.layers.indexOf(l);
                        console.log(index)
                        this.layers.splice(index)
                    }
                    })
                console.log(this.layers)
                });
             })

             this.map.on((L as any).Draw.Event.EDITED, e => {
                console.log(e)
                console.log("layers : ",this.layers);
            });
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
