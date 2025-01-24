var dataset = ee.ImageCollection('HYCOM/GLBu0_08/sea_temp_salinity')
                  .filter(ee.Filter.date('2018-09-04', '2018-09-5'));

// sst_0=surface, sst_2= 2m depth, sst_4=4m depth etc...
var sst = dataset.select('sst_0').first();
// Convert to degrees celsius
var temp = sst.expression('20 + sst * 0.001',{'sst':sst.select('sst_0') })

var visParams = {
  min: -5,
  max: 35,
  palette: ['000000', '005aff', '43c8c8', 'fff700', 'ff0000'],
};
//Map.setCenter(-88.6, 26.4, 1);
Map.addLayer(temp, visParams, 'Sea Water Temperature');
