export const  useGoogleMapAPI = function(){
    // console.log(process.env);
    // const API_KEY = process.env.GOOLE_MAPS_API_KEY;
    const API_KEY = "AIzaSyDYsKnr7KjV2OvyyQsYy4mShI5EDNH-vb0";
    const CALLBACK_NAME = 'gmapsCallback';
    let initialized = !!window.google;
    let resolveInitPromise;
    let rejectInitPromise;
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

export const removeScript = ()=>{
    document.querySelectorAll("head > script").forEach(item=>{
        item.remove()
    })  
    
}
