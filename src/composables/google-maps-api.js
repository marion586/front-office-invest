export const  useGoogleMapAPI = function(){
    // console.log(import.meta.env.GOOLE_MAPS_API_KEY);
    // const API_KEY = import.meta.env.GOOLE_MAPS_API_KEY;
    const API_KEY = "AIzaSyDYsKnr7KjV2OvyyQsYy4mShI5EDNH-vb0";
    const CALLBACK_NAME = 'gmapsCallback';
    let initialized = !!window.google;
    let resolveInitPromise;
    let rejectInitPromise;
    if(!window.google){  
        // This promise handles the initialization
        // status of the google maps script.
        const initPromise = new Promise((resolve, reject) => {
            resolveInitPromise = resolve;
            rejectInitPromise = reject;
        });
        // If Google Maps already is initialized
        // the `initPromise` should get resolved
        // eventually.
        if (initialized) {
            console.log("yes script is successfully  loaded");

            return initPromise;
        }
        initialized = true;
        // The callback function is called by
        // the Google Maps script if it is
        // successfully loaded.
        window[CALLBACK_NAME] = () => resolveInitPromise(window.google);

        // We inject a new script tag into
        // the `<head>` of our HTML to load
        // the Google Maps script.
        const script = document.createElement('script');
        script.id = "google-map";
        script.async = true;
        script.defer = true;
        script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&sensor=false&key=${API_KEY}&callback=${CALLBACK_NAME}`;
        script.onerror = rejectInitPromise;
        document.querySelector('head').appendChild(script);
        return initPromise;
        // console.log(initPromise);
        // inject("google", initPromise);
    }
}

export const removeScript = ()=>{
    delete window.google; 
    document.querySelectorAll("head > script").forEach(item=>{
        item.remove()
    })
}
/**
 * 
 * @param {HTMLImputElement} input - input element of the field
 * @param {Array} fields - list on fields de return
 * @param {Object} options - autocomple optionss
 */
export const autocomplet = (input)=>{
    if(!window.google){
        const result = useGoogleMapAPI();
        result.then((google)=>{
            const auto = new google.maps.places.Autocomplete(input)  
            input.addEventListener("place_changed", (e)=>{
                const res= auto.getPlace();
                console.log(res)
            });                                      
        })
        }else{
            const auto = new window.google.maps.places.Autocomplete(input)  
            input.addEventListener("place_changed", (e)=>{
                const res= auto.getPlace();
                console.log(res)
            });     
        }
    }


/**
 * converte address to geographical coordinates (lat long)
 * @param {String} address Some address 
 * @returns {Promise} 
 * @return_Formate {regularName : Array, coordinates : {lat,long}}
 */
export const geocode =  (address="")=>{
    const p1 = new Promise((resolve)=>{
        if(!window.google){
       const result = useGoogleMapAPI();
            result.then((google)=>{
                const geocoder = new google.maps.Geocoder();
                    geocoder.geocode({'address' : address}, function(results,status){
                        if (status === 'OK') {
                            const pointer = results[0];
                            const resp ={
                                regularName : pointer.address_components,
                                coordinates : {
                                    lat : pointer.geometry.location.lat(),
                                    lng : pointer.geometry.location.lng(),
                                }
                            }
                            resolve(resp);
                        }
                    })
                })
        }else{
            const geocoder = new window.google.maps.Geocoder();
                    geocoder.geocode({'address' : address}, function(results,status){
                        if (status === 'OK') {
                            const pointer = results[0];
                            const resp ={
                                regularName : pointer.address_components,
                                coordinates : {
                                    lat : pointer.geometry.location.lat(),
                                    lng : pointer.geometry.location.lng(),
                                }
                            }
                            resolve(resp);
                        }
                    })
        }
        
    })
    return p1;
}
