/*
Generates US precipitation raster for the continental US
*/

// Define geographic area of interest
var cc =['US'] 
var st_sub = ee.FeatureCollection("USDOS/LSIB/2013")
    .filter(ee.Filter.inList('cc',cc));

// Extract, then summarize raster
var ppt = ee.ImageCollection('OREGONSTATE/PRISM/AN81d')
                  .filter(ee.Filter.date('2018-11-01', '2019-01-30'))  // Select month via date range
                  .select('ppt') 
                  .reduce(ee.Reducer.sum());

Map.setCenter(-70, 44, 6);

var ppt_col = {
  min: 0,
  max: 700,
  palette: ['red', 'yellow', 'blue'],
};

Map.addLayer(
    ppt, ppt_col,
    'Total precip [mm]'); 

// Output to Google drive
Export.image.toDrive({
  image: ppt,
  description: 'ppt_nov_2018',
});
