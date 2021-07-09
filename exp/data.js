
fetch('/data.json')
    .then((response) => {
        return response.json()
    })
    .then((content) => {
        console.log(content[2].Longitude);

    })
    .catch((err) => {
        console.log(err);
    })




    // map.on('load', function () {

    //     marker = new mapboxgl.Marker()
    //       .setLngLat([
    //         element.longitude, element.latitude
    //       ])
    //       .addTo(map);
    //   });
