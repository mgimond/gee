/*
Create a hillshade raster from a DEM layer
*/

var state =['23']; /* Maine only for now. Add more states via comma */
var st_sub = ee.FeatureCollection("TIGER/2016/States")
    .filter(ee.Filter.inList('STATEFP',state));

var image = ee.Image("USGS/SRTMGL1_003");
            
var elev = image.clip(st_sub);
var hillshd =  ee.Terrain.hillshade(elev); // Create hillshade
Map.addLayer(hillshd);
print(st_sub.geometry().bounds());

// Export to google drive (optional)
Export.image.toDrive({
  image: hillshd,
  description: 'ME_hillshade',
  region: st_sub.geometry().bounds(),
  crs: 'EPSG:26919'
});
