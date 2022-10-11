var googleMapID = 'google-map-script';

export const useGoogleMapAPI = function () {
    const API_KEY = import.meta.env.VITE_GOOLE_MAPS_API_KEY;
    const CALLBACK_NAME = 'gmapsCallback';
    // This promise handles the initialization
    // status of the google maps script.

    // We inject a new script tag into
    // the `<head>` of our HTML to load
    // the Google Maps script.

    const initPromise = new Promise((resolve, reject) => {
        // If Google Maps already is initialized
        // the `initPromise` should get resolved
        // eventually.
        const scriptTester = document.querySelectorAll('#' + googleMapID);
        if (scriptTester.length < 1) {
            const script = document.createElement('script');
            script.id = googleMapID;
            script.async = true;
            script.defer = true;
            script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}`;
            document.querySelector('head').appendChild(script);
            script.onload = () => {
                resolve(window.google);
            };
            script.onerror = () => {
                reject('otrany tsy lasa');
            };
        }
    });

    return initPromise;
};

export const removeScript = () => {
    delete window.google;
    document.querySelectorAll('head>script').forEach((item) => {
        if (item.src.includes('googleapis')) {
            item.remove();
        }
    });
};
/**
 *
 * @param {HTMLImputElement} input - input element of the field
 * @param {Array} fields - list on fields de return
 * @param {Object} options - autocomple optionss
 */
export const autocomplet = (input) => {
    if (!window.google) {
        const result = useGoogleMapAPI();
        result.then((google) => {
            console.log('nandalo');
            const auto = new google.maps.places.Autocomplete(input);
            input.addEventListener('place_changed', (e) => {
                const res = auto.getPlace();
                console.log(res);
            });
        });
    } else {
        const auto = new window.google.maps.places.Autocomplete(input);
        console.log('yes nandalo', auto);
        input.addEventListener('place_changed', (e) => {
            const res = auto.getPlace();
            console.log(res);
        });
    }
};

/**
 * converte address to geographical coordinates (lat long)
 * @param {String} address Some address
 * @returns {Promise}
 * @return_Formate {regularName : Array, coordinates : {lat,long}}
 */
export const geocode = (address = '') => {
    const statusCode = {
        success: 'OK',
    };
    const result = useGoogleMapAPI();
    const p1 = new Promise((resolve) => {
        if (!window.google) {
            result.then((google) => {
                const geocoder = new google.maps.Geocoder();
                geocoder.geocode(
                    { address: address },
                    function (results, status) {
                        if (status === statusCode.success) {
                            const pointer = results[0];
                            const resp = {
                                regularName: pointer.address_components,
                                coordinates: {
                                    lat: pointer.geometry.location.lat(),
                                    lng: pointer.geometry.location.lng(),
                                },
                            };
                            resolve(resp);
                        }
                    }
                );
            });
        } else {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: address }, function (results, status) {
                if (status === statusCode.success) {
                    const pointer = results[0];
                    const resp = {
                        regularName: pointer.address_components,
                        coordinates: {
                            lat: pointer.geometry.location.lat(),
                            lng: pointer.geometry.location.lng(),
                        },
                    };
                    resolve(resp);
                }
            });
        }
    });
    return p1;
};
