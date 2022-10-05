import 'leaflet';
import L, { Control, FeatureGroup, LatLngBoundsExpression, LatLngExpression, LatLngLiteral, LayerGroup, MapOptions, } from 'leaflet';
import 'leaflet-easyprint';
import '@geoman-io/leaflet-geoman-free';

interface layerType{
    type : string,
    latlng : LatLngExpression[]
}



export default class Map {
    containerid : string;
    mapOptions : {[key : string] : any} = {
        zoom: 15,
        center: [51.505, -0.09],
        maxZoom: 19,
        pmIgnore: false
    };
    map: L.Map ;
    draw : LatLngExpression[]
    featureGroup : FeatureGroup;
    layers : layerType[] = [];
    constructor(containerId : string){
        this.containerid = containerId;
        this.draw = [];
        this.featureGroup = L.featureGroup();
        this.map = L.map(this.containerid, this.mapOptions);
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
        L.polygon(coordinates).addTo(this.map)
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
        this.map.pm.addControls({
            position : 'topleft',
            drawCircleMarker : false,
            drawPolyline : false,
            drawText : false,
            rotateMode : false
        })     
    }
    /**
     * listenning grawing event and add to drawn layer data 
     */
    DrawingLayerListener(){
        this.map.on("pm:create",(e)=>{

                this.layers.push({
                        type : e.shape,
                        latlng : (e.layer as any)._latlngs[0]
                    })
            })
    }
}
