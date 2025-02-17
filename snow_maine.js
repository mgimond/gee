
/*
Generates snow water equivalent raster from Daymet V4 data.
Can be modified to generate other climatological summaries.
*/

var state =['23'] /* Maine only. Add more states via commas */
var st_sub = ee.FeatureCollection("TIGER/2016/States")
    .filter(ee.Filter.inList('STATEFP',state));
    
var dataset = ee.ImageCollection('NASA/ORNL/DAYMET_V3')
                  .filter(ee.Filter.date('2018-10-01', '2019-04-01'));

/*
Options include:
prcp (mm)  Daily total precipitation, sum of all forms converted to water-equivalent.
srad(w/m2) Incident shortwave radiation flux density, taken as an average over the daylight period of the day.
swe (kg/m^2) Snow water equivalent, the amount of water contained within the snowpack.
tmax (C) Daily maximum 2-meter air temperature.
tmin(C) Daily minimum 2-meter air temperature.
vp (Pa) Daily average partial pressure of water vapor.
*/

var sub_met = dataset.select('swe');

// Function to crop image
var clip_images = function(image) {
  return image.clip(st_sub);
};

var sub_met_clip = sub_met.map(clip_images);

// Convert to multi-band image
var img_met = sub_met_clip.toBands().float();

var mapVis = {
  min: 0,
  max: 500,
  palette: ['red', 'orange', 'yellow', 'green', 'cyan', 'white',  '1621A2']
};
Map.setCenter(-110.21, 35.1, 4);
Map.addLayer(sub_met_clip, mapVis, 'met data');

// Export the image, specifying scale and region.
Export.image.toDrive({
  image: img_met,
  description: 'Maine_snow',
  scale: 20000,
  region: st_sub,
  fileFormat: 'TIF',
  crs: 'epsg:4326'
});
