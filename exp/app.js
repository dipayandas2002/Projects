


mapboxgl.accessToken = 'pk.eyJ1IjoiZGlwYXlhbmRhczM2MCIsImEiOiJja3Fybm1xZXUxMWFjMzJuYnlqeDhkYjJtIn0.kqhXRux7wwHsaj9rOL3v_w';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  zoom: 3.5,
  center: [80, 22],
  minZoom: 4,


});
var geocoder = new MapboxGeocoder({ accessToken: mapboxgl.accessToken });
map.addControl(geocoder);


// var llb = new mapboxgl.LngLatBounds(85, 25);
// map.dragPan.disable()
// iconsole.log(map.getZoom())




fetch('https://api.covid19india.org/v2/state_district_wise.json')
  .then((response) => {
    return response.json()
  })
  .then((content) => {
    // console.log(content[1].districtData[1].district);
    // console.log(content);



    content.forEach(element => {
      element.districtData.forEach(districtData => {


        // console.log(districtData.district);

        fetch('https://raw.githubusercontent.com/dipayandas2002/udemy/main/exp/data.json')
          .then((response) => {
            return response.json()
          })
          .then((pos) => {

            // console.log(pos[2].District);

            pos.forEach(posElement => {
              // var index =  pos.indexOf(districtData.district)
              if (districtData.district == posElement.District) {

                map.on('load', function () {

                  // marker = new mapboxgl.Marker()
                  //   .setLngLat([
                  //     posElement.Longitude, posElement.Latitude
                  //   ])
                  //   .color("#ebcc34")
                  //   .addTo(map);



                  var r = 255 - districtData.confirmed / 100;
                  var g = 255 - districtData.recovered / 100;


                  marker = new mapboxgl.Marker({
                    color: `rgb(${r},${g},255)`,
                    draggable: false,
                    scale: 0.6

                  }).setLngLat([posElement.Longitude, posElement.Latitude])

                    .setPopup(new mapboxgl.Popup().setHTML(`<div>INFO</div><div><strong>State</strong>  :  ${element.state}</div>
                    <div><strong>District</strong>  :  ${districtData.district}</div>
                    <div><strong>Confirmed</strong>  :  ${districtData.confirmed}</div>
                    <div><strong>Recovered</strong>  :  ${districtData.recovered}</div>
                    <a href="http://www.google.com">google</a>`))
                    .addTo(map);

                })

              }


            }



              // console.log(index);

            )

          })
          .catch((err) => {
            console.log(err);
          })








      })



    })






  })
  .catch((err) => {
    // Do something for an error here
  })
