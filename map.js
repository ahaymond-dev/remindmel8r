function updateLocation(data){
    // Gets the LngLat object from the mapbox data
    center = data.target.transform.center;
    $("#lat").text(center.lat);
    $("#lon").text(center.lng);
    callTrailsAPI(center.lat, center.lng);
}

(function () {
    //         navigator.geolocation.getCurrentPosition(function (position) {
    //    console.log(position.coords.latitude);
    //    console.log(position.coords.longitude);
       
    //     const queryUrl = "https://us1.locationiq.com/v1/reverse.php?key=7f4e3e6f4c7876&lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&format=json";

    //     $.ajax({
    //         url: queryUrl,
    //         method: "GET"
    //     }).then(function(response) {
    //         console.log(response);
    //         var settings = {
    //             "async": true,
    //             "crossDomain": true,
    //             "url": "https://us1.locationiq.com/v1/nearby.php?key=YOUR_PRIVATE_TOKEN&lat=" + postion.coords.latitude + "&lon=" + position.coords.longitude + "&tag=restaurant&radius=300&format=json",
    //             "method": "GET"
    //           }
              
    //           $.ajax(settings).done(function (response) {
    //             console.log(response);
    //           });
    
        
    //     });
        
       
    // },
    // function (error) {
    //     console.log("The Locator was denied. :(")
    // });
    //Add your Unwired Maps Access Token here (not the API token!)
    unwired.key = mapboxgl.accessToken = 'pk.0bf40e1baf8ee899f1d2021a0242e006';
    //Define the map and configure the map's theme
    var map = new mapboxgl.Map({
        container: 'map',
        attributionControl: false, //need this to show a compact attribution icon (i) instead of the whole text
        style: unwired.getLayer("streets"), //get Unwired's style template
        zoom: 11,
        center: [-112.03543040001409,33.525842369582534]
    });
                
    //Add Unwired's Layer Control plugin            
    //Define layers you want to add to the layer controls; the first element will be the default layer
    var layers = ["streets", "earth", "hybrid"];
    map.addControl(new unwiredLayerControl({
        key: unwired.key,
        layers: layers
    }), 'top-left');

    //Add Navigation controls to the map to the top-right corner of the map
    var nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-right');


    //Add a 'full screen' button to the map
    map.addControl(new mapboxgl.FullscreenControl());
    
    //Add a Scale to the map
    map.addControl(new mapboxgl.ScaleControl({
        maxWidth: 80,
        unit: 'metric' //imperial for miles
    }));

    //Add Geolocation control to the map (will only render when page is opened over HTTPS)
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }));

    //    adding event listener to update as you dynamically move around map
    map.on("load",updateLocation);
    map.on("moveend",updateLocation);

    })();
