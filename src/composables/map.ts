import 'leaflet';
import L, { Control, FeatureGroup, LatLng, LatLngBoundsExpression, LatLngExpression, LatLngLiteral, LayerGroup, MapOptions, } from 'leaflet';
import 'leaflet-easyprint';
import '@geoman-io/leaflet-geoman-free';
import "leaflet-draw";
import { A } from 'vitest/dist/global-fe52f84b';
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
    addMarker(latLong : LatLngLiteral,eventHandler=()=>{}){
        const marker = L.marker(latLong).addTo(this.map);
        marker.on('click',eventHandler)
        return marker;
    }
    
    createPolygon(coordinates : LatLngExpression[], eventHandler=()=>{} ){
        const polygon =  L.polygon(coordinates).addTo(this.map);
        polygon.on('click', eventHandler);
        return polygon;
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
    getCurrentFeaturesCoordinates(layer : layerType | layerType[]){
        return this.layers[this.layers.length -1];
    };
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
    DrawingLayerListener(
                        polygonGetter = (feat : {})=>{},
                        markerGetter = (feat : {} )=>{}
                        ){
        
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
                    const feat = {
                        type : layerType.polygon,
                        latlng : (p.getLatLngs() as [][])[0],
                        layerID : this.featureGroup.getLayerId(p) 
                    }
                    this.layers.push(feat);
                    polygonGetter(feat);

                }else if(e.layerType === layerType.marker){
                    //handle marker layers after creation
                    let  m = new L.Marker(layer._latlng)
                    this.featureGroup.addLayer(m);
                    this.featureGroup.addTo(this.map);
                    const feat = {
                        type : layerType.marker,
                        latlng : m.getLatLng(),
                        layerID : this.featureGroup.getLayerId(m)
                    }
                    this.layers.push(feat);
                    markerGetter(feat)
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
            
    }


}
