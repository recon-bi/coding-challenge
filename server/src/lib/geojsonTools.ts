import { Schema } from 'mongoose';
/**
 * @description Mongoose helper schemas for GeoJSON searches
 */
export const GeoJSONSchema = (GeoJSONType = 'Point') => {
  const enumValue = GeoJSONType.includes(',')
    ? GeoJSONType.split(',')
    : [`${GeoJSONType}`];
  return new Schema({
    type: {
      type: String,
      enum: enumValue,
      required: true,
    },
    coordinates: [],
  });
};

/**
 * @desciption Returns a formatted MongoDB geospatial query object
 */
export const GetGeospatialQuery = (ne: number[], sw: number[]) => {
  const coordinates = [
    [
      [ne[0], ne[1]],
      [sw[0], ne[1]],
      [sw[0], sw[1]],
      [ne[0], sw[1]],
      [ne[0], ne[1]],
    ],
  ];

  return {
    $match: {
      geoLocation: {
        $geoWithin: {
          $geometry: {
            type: 'Polygon',
            coordinates,
          },
        },
      },
    },
  };
};

// /**
//  * @description Takes results from a model query and converts to GeoJSON array
//  *
//  * @param results (array) - Results from a mongoose query
//  * @param options (object) - Takes feature type parameters to override defaults
//  *   -   featureType: "Feature",
//  *   -   geometryType: "Point",
//  *   -   collectionType: "FeatureCollection",
//  */
// export function toGeoJSONArray(results, options?): FeatureCollection | [] {
//   const defaults = {
//     featureType: 'Feature',
//     geometryType: 'Point',
//     collectionType: 'FeatureCollection',
//   };
//   const settings = { ...defaults, ...options };
//   try {
//     const featureArray = results.map((result: any) => {
//       const geometry =
//         result.geoLocation && Object.keys(result.geoLocation).length > 0
//           ? result.geoLocation
//           : result.geoJson && Object.keys(result.geoJson).length > 0
//           ? result.geoJson
//           : null;

//       const feature = {
//         type: settings.featureType,
//         geometry,
//         properties: { ...result },
//       };
//       delete feature.properties.geoLocation;
//       delete feature.properties.geoJson;
//       return feature;
//     });

//     const featureCollection: FeatureCollection = {
//       type: settings.collectionType,
//       features: featureArray,
//     };

//     return featureCollection;
//   } catch (err) {
//     console.error(err);
//     errorHandler(err);
//     return [];
//   }
// }
