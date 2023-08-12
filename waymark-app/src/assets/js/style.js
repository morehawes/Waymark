console.log(location.href)

export const mapboxStyle = {
  version: 8,
  name: 'Klokantech Terrain',
  metadata: {
    'mapbox:autocomposite': false,
    'mapbox:type': 'template',
    'maputnik:renderer': 'mbgljs',
    'openmaptiles:version': '3.x',
    'openmaptiles:mapbox:owner': 'openmaptiles',
    'openmaptiles:mapbox:source:url': 'mapbox://openmaptiles.4qljc88t'
  },
  center: [49.726033, -125.095139],
  zoom: 14,
  bearing: 0,
  pitch: 0,
  sources: {
    openmaptiles: {
      type: 'vector',
      tiles: [location.href + '/data/osm/{z}/{x}/{y}.pbf'],
      maxzoom: 14
    }
    // hillshading: {
    //   type: 'raster',
    //   tiles: [location.href + '/data/hillshading/{z}/{x}/{y}.png'],
    //   tileSize: 256,
    //   maxzoom: 14
    // },
    // contours: {
    //   type: 'vector',
    //   tiles: [location.href + '/data/contours/{z}/{x}/{y}.pbf'],
    //   maxzoom: 14
    // }
  },
  glyphs: location.href + '/fonts/{fontstack}/{range}.pbf',
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: { 'background-color': 'hsl(47, 26%, 88%)' }
    },
    {
      id: 'landuse-residential',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'landuse',
      filter: ['all', ['==', '$type', 'Polygon'], ['==', 'class', 'residential']],
      layout: { visibility: 'visible' },
      paint: { 'fill-color': 'hsl(47, 13%, 86%)', 'fill-opacity': 0.7 }
    },
    {
      id: 'landcover_grass',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'landcover',
      filter: ['==', 'class', 'grass'],
      paint: { 'fill-color': 'hsl(82, 46%, 72%)', 'fill-opacity': 0.45 }
    },
    {
      id: 'landcover_wood',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'landcover',
      filter: ['==', 'class', 'wood'],
      paint: {
        'fill-color': 'hsl(82, 46%, 72%)',
        'fill-opacity': {
          base: 1,
          stops: [
            [8, 0.6],
            [22, 1]
          ]
        }
      }
    },
    {
      id: 'park',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'park',
      paint: { 'fill-color': 'rgba(192, 216, 151, 0.53)', 'fill-opacity': 1 }
    },
    {
      id: 'landcover-ice-shelf',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'landcover',
      filter: ['==', 'subclass', 'ice_shelf'],
      layout: { visibility: 'visible' },
      paint: { 'fill-color': 'hsl(47, 26%, 88%)', 'fill-opacity': 0.8 }
    },
    {
      id: 'landcover-glacier',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'landcover',
      filter: ['==', 'subclass', 'glacier'],
      layout: { visibility: 'visible' },
      paint: {
        'fill-color': 'hsl(47, 22%, 94%)',
        'fill-opacity': {
          base: 1,
          stops: [
            [0, 1],
            [8, 0.5]
          ]
        }
      }
    },
    {
      id: 'landcover_sand',
      type: 'fill',
      metadata: {},
      source: 'openmaptiles',
      'source-layer': 'landcover',
      filter: ['all', ['in', 'class', 'sand']],
      paint: {
        'fill-antialias': false,
        'fill-color': 'rgba(232, 214, 38, 1)',
        'fill-opacity': 0.3
      }
    },
    // {
    //   id: 'hillshading',
    //   type: 'raster',
    //   source: 'hillshading',
    //   layout: { visibility: 'visible' },
    //   paint: {
    //     'raster-contrast': 0,
    //     'raster-fade-duration': 300,
    //     'raster-opacity': {
    //       base: 0.5,
    //       stops: [
    //         [3, 0],
    //         [5, 0.15],
    //         [12, 0.15]
    //       ]
    //     }
    //   }
    // },
    {
      id: 'landuse',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'landuse',
      filter: ['==', 'class', 'agriculture'],
      layout: { visibility: 'visible' },
      paint: { 'fill-color': '#eae0d0' }
    },
    {
      id: 'landuse_overlay_national_park',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'landcover',
      filter: ['==', 'class', 'national_park'],
      paint: {
        'fill-color': '#E1EBB0',
        'fill-opacity': {
          base: 1,
          stops: [
            [5, 0],
            [9, 0.75]
          ]
        }
      }
    },
    {
      id: 'park_outline',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'park',
      layout: {},
      paint: {
        'line-color': 'rgba(159, 183, 118, 0.69)',
        'line-dasharray': [0.5, 1]
      }
    },
    // {
    //   id: 'contour_label',
    //   type: 'symbol',
    //   metadata: {},
    //   source: 'contours',
    //   'source-layer': 'contour',
    //   filter: ['all', ['==', '$type', 'LineString'], ['in', 'nth_line', 10, 5], ['>', 'height', 0]],
    //   layout: {
    //     'symbol-avoid-edges': true,
    //     'symbol-placement': 'line',
    //     'text-allow-overlap': false,
    //     'text-field': '{height} m',
    //     'text-font': ['Noto Sans Regular'],
    //     'text-ignore-placement': false,
    //     'text-padding': 10,
    //     'text-rotation-alignment': 'map',
    //     'text-size': {
    //       base: 1,
    //       stops: [
    //         [15, 9.5],
    //         [20, 12]
    //       ]
    //     }
    //   },
    //   paint: {
    //     'text-color': 'hsl(0, 0%, 37%)',
    //     'text-halo-color': 'hsla(0, 0%, 100%, 0.5)',
    //     'text-halo-width': 1.5
    //   }
    // },
    // {
    //   id: 'contour_index',
    //   type: 'line',
    //   source: 'contours',
    //   'source-layer': 'contour',
    //   filter: ['all', ['>', 'height', 0], ['in', 'nth_line', 10, 5]],
    //   layout: { visibility: 'visible' },
    //   paint: {
    //     'line-color': 'hsl(0, 1%, 58%)',
    //     'line-opacity': 0.4,
    //     'line-width': 1.1
    //   }
    // },
    // {
    //   id: 'contour',
    //   type: 'line',
    //   source: 'contours',
    //   'source-layer': 'contour',
    //   filter: ['all', ['!in', 'nth_line', 10, 5], ['>', 'height', 0]],
    //   layout: { visibility: 'visible' },
    //   paint: {
    //     'line-color': 'hsl(0, 1%, 58%)',
    //     'line-opacity': 0.3,
    //     'line-width': 0.6
    //   }
    // },
    {
      id: 'water',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'water',
      filter: ['all', ['==', '$type', 'Polygon'], ['!=', 'brunnel', 'tunnel']],
      paint: { 'fill-color': 'hsl(205, 56%, 73%)' }
    },
    {
      id: 'waterway-tunnel',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'waterway',
      filter: ['all', ['==', '$type', 'LineString'], ['==', 'brunnel', 'tunnel']],
      paint: {
        'line-color': 'hsl(205, 56%, 73%)',
        'line-dasharray': [3, 3],
        'line-gap-width': {
          stops: [
            [12, 0],
            [20, 6]
          ]
        },
        'line-opacity': 1,
        'line-width': {
          base: 1.4,
          stops: [
            [8, 1],
            [20, 2]
          ]
        }
      }
    },
    {
      id: 'waterway',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'waterway',
      filter: ['all', ['==', '$type', 'LineString'], ['!in', 'brunnel', 'tunnel', 'bridge']],
      paint: {
        'line-color': 'hsl(205, 56%, 73%)',
        'line-opacity': 1,
        'line-width': {
          base: 1.4,
          stops: [
            [8, 1],
            [20, 8]
          ]
        }
      }
    },
    {
      id: 'tunnel_railway_transit',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      minzoom: 0,
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['==', 'brunnel', 'tunnel'],
        ['==', 'class', 'transit']
      ],
      layout: { 'line-cap': 'butt', 'line-join': 'miter' },
      paint: {
        'line-color': 'hsl(34, 12%, 66%)',
        'line-dasharray': [3, 3],
        'line-opacity': {
          base: 1,
          stops: [
            [11, 0],
            [16, 1]
          ]
        }
      }
    },
    {
      id: 'building',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'building',
      paint: {
        'fill-color': 'hsl(39, 41%, 86%)',
        'fill-opacity': {
          base: 1,
          stops: [
            [13, 0.6],
            [14, 1]
          ]
        },
        'fill-outline-color': 'hsl(36, 45%, 80%)'
      }
    },
    {
      id: 'housenumber',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'housenumber',
      minzoom: 17,
      filter: ['==', '$type', 'Point'],
      layout: {
        'text-field': '{housenumber}',
        'text-font': ['Noto Sans Regular'],
        'text-size': 10
      },
      paint: {
        'text-color': 'hsla(0, 14%, 57%, 0.51)',
        'text-halo-color': 'hsl(39, 41%, 86%)',
        'text-halo-width': 0.5
      }
    },
    {
      id: 'road_area_pier',
      type: 'fill',
      metadata: {},
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: ['all', ['==', '$type', 'Polygon'], ['==', 'class', 'pier']],
      layout: { visibility: 'visible' },
      paint: { 'fill-antialias': true, 'fill-color': 'hsl(47, 26%, 88%)' }
    },
    {
      id: 'road_pier',
      type: 'line',
      metadata: {},
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: ['all', ['==', '$type', 'LineString'], ['in', 'class', 'pier']],
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': 'hsl(47, 26%, 88%)',
        'line-width': {
          base: 1.2,
          stops: [
            [15, 1],
            [17, 4]
          ]
        }
      }
    },
    {
      id: 'road_bridge_area',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: ['all', ['==', '$type', 'Polygon'], ['in', 'brunnel', 'bridge']],
      layout: {},
      paint: { 'fill-color': 'hsl(47, 26%, 88%)', 'fill-opacity': 0.5 }
    },
    //Trails
    {
      id: 'road_path',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: ['all', ['==', '$type', 'LineString'], ['in', 'class', 'path', 'track']],
      layout: { 'line-cap': 'square', 'line-join': 'bevel' },
      paint: {
        //        "line-color": "hsl(360, 85%, 78%)",
        'line-color': '#c71e1e',
        'line-dasharray': [1, 1],
        'line-width': {
          base: 1.55,
          stops: [
            [4, 0.25],
            [20, 10]
          ]
        }
      }
    },
    {
      id: 'road_minor',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: ['all', ['==', '$type', 'LineString'], ['in', 'class', 'minor', 'service']],
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': 'hsl(0, 0%, 97%)',
        'line-width': {
          base: 1.55,
          stops: [
            [4, 0.25],
            [20, 30]
          ]
        }
      }
    },
    {
      id: 'tunnel_minor',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'minor_road']]
      ],
      layout: { 'line-cap': 'butt', 'line-join': 'miter' },
      paint: {
        'line-color': '#efefef',
        'line-dasharray': [0.36, 0.18],
        'line-width': {
          base: 1.55,
          stops: [
            [4, 0.25],
            [20, 30]
          ]
        }
      }
    },
    {
      id: 'tunnel_major',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        [
          'all',
          ['==', 'brunnel', 'tunnel'],
          ['in', 'class', 'primary', 'secondary', 'tertiary', 'trunk']
        ]
      ],
      layout: { 'line-cap': 'butt', 'line-join': 'miter' },
      paint: {
        'line-color': '#fff',
        'line-dasharray': [0.28, 0.14],
        'line-width': {
          base: 1.4,
          stops: [
            [6, 0.5],
            [20, 30]
          ]
        }
      }
    },
    {
      id: 'road_trunk_primary',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: ['all', ['==', '$type', 'LineString'], ['in', 'class', 'trunk', 'primary']],
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#fff',
        'line-width': {
          base: 1.4,
          stops: [
            [6, 0.5],
            [20, 30]
          ]
        }
      }
    },
    {
      id: 'road_secondary_tertiary',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: ['all', ['==', '$type', 'LineString'], ['in', 'class', 'secondary', 'tertiary']],
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#fff',
        'line-width': {
          base: 1.4,
          stops: [
            [6, 0.5],
            [20, 20]
          ]
        }
      }
    },
    {
      id: 'road_major_motorway',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: ['all', ['==', '$type', 'LineString'], ['==', 'class', 'motorway']],
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': 'hsl(0, 0%, 100%)',
        'line-offset': 0,
        'line-width': {
          base: 1.4,
          stops: [
            [8, 1],
            [16, 10]
          ]
        }
      }
    },
    {
      id: 'railway_transit',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: ['all', ['==', 'class', 'transit'], ['!=', 'brunnel', 'tunnel']],
      layout: { visibility: 'visible' },
      paint: {
        'line-color': 'hsl(34, 12%, 66%)',
        'line-opacity': {
          base: 1,
          stops: [
            [11, 0],
            [16, 1]
          ]
        }
      }
    },
    {
      id: 'railway',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: ['==', 'class', 'rail'],
      layout: { visibility: 'visible' },
      paint: {
        'line-color': 'hsl(34, 12%, 66%)',
        'line-opacity': {
          base: 1,
          stops: [
            [11, 0],
            [16, 1]
          ]
        }
      }
    },
    {
      id: 'waterway-bridge-case',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'waterway',
      filter: ['all', ['==', '$type', 'LineString'], ['==', 'brunnel', 'bridge']],
      layout: { 'line-cap': 'butt', 'line-join': 'miter' },
      paint: {
        'line-color': '#bbbbbb',
        'line-gap-width': {
          base: 1.55,
          stops: [
            [4, 0.25],
            [20, 30]
          ]
        },
        'line-width': {
          base: 1.6,
          stops: [
            [12, 0.5],
            [20, 10]
          ]
        }
      }
    },
    {
      id: 'waterway-bridge',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'waterway',
      filter: ['all', ['==', '$type', 'LineString'], ['==', 'brunnel', 'bridge']],
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': 'hsl(205, 56%, 73%)',
        'line-width': {
          base: 1.55,
          stops: [
            [4, 0.25],
            [20, 30]
          ]
        }
      }
    },
    {
      id: 'bridge_minor case',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'minor_road']]
      ],
      layout: { 'line-cap': 'butt', 'line-join': 'miter' },
      paint: {
        'line-color': '#dedede',
        'line-gap-width': {
          base: 1.55,
          stops: [
            [4, 0.25],
            [20, 30]
          ]
        },
        'line-width': {
          base: 1.6,
          stops: [
            [12, 0.5],
            [20, 10]
          ]
        }
      }
    },
    {
      id: 'bridge_major case',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        [
          'all',
          ['==', 'brunnel', 'bridge'],
          ['in', 'class', 'primary', 'secondary', 'tertiary', 'trunk']
        ]
      ],
      layout: { 'line-cap': 'butt', 'line-join': 'miter' },
      paint: {
        'line-color': '#dedede',
        'line-gap-width': {
          base: 1.55,
          stops: [
            [4, 0.25],
            [20, 30]
          ]
        },
        'line-width': {
          base: 1.6,
          stops: [
            [12, 0.5],
            [20, 10]
          ]
        }
      }
    },
    {
      id: 'bridge_minor',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'minor_road']]
      ],
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#efefef',
        'line-width': {
          base: 1.55,
          stops: [
            [4, 0.25],
            [20, 30]
          ]
        }
      }
    },
    {
      id: 'bridge_major',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        [
          'all',
          ['==', 'brunnel', 'bridge'],
          ['in', 'class', 'primary', 'secondary', 'tertiary', 'trunk']
        ]
      ],
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#fff',
        'line-width': {
          base: 1.4,
          stops: [
            [6, 0.5],
            [20, 30]
          ]
        }
      }
    },
    {
      id: 'admin_sub',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'boundary',
      filter: ['in', 'admin_level', 4, 6, 8],
      layout: { visibility: 'visible' },
      paint: { 'line-color': 'hsl(0, 0%, 76%)', 'line-dasharray': [2, 1] }
    },
    {
      id: 'admin_country_z0-4',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'boundary',
      maxzoom: 5,
      filter: [
        'all',
        ['<=', 'admin_level', 2],
        ['==', '$type', 'LineString'],
        ['!has', 'claimed_by']
      ],
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': 'hsla(0, 8%, 22%, 0.51)',
        'line-width': {
          base: 1.3,
          stops: [
            [3, 0.5],
            [22, 15]
          ]
        }
      }
    },
    {
      id: 'admin_country_z5-',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'boundary',
      minzoom: 5,
      filter: ['all', ['<=', 'admin_level', 2], ['==', '$type', 'LineString']],
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': 'hsla(0, 8%, 22%, 0.51)',
        'line-width': {
          base: 1.3,
          stops: [
            [3, 0.5],
            [22, 15]
          ]
        }
      }
    },
    {
      id: 'poi_label',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'poi',
      minzoom: 14,
      filter: ['all', ['==', '$type', 'Point'], ['==', 'rank', 1]],
      layout: {
        'icon-size': 1,
        'text-anchor': 'top',
        'text-field': '{name}',
        'text-font': ['Noto Sans Regular'],
        'text-max-width': 8,
        'text-offset': [0, 0.5],
        'text-size': 11,
        visibility: 'visible'
      },
      paint: {
        'text-color': '#666',
        'text-halo-blur': 1,
        'text-halo-color': 'rgba(255,255,255,0.75)',
        'text-halo-width': 1
      }
    },
    {
      id: 'airport-label',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'aerodrome_label',
      minzoom: 10,
      filter: ['all', ['has', 'iata']],
      layout: {
        'icon-size': 1,
        'text-anchor': 'top',
        'text-field': '{name}',
        'text-font': ['Noto Sans Regular'],
        'text-max-width': 8,
        'text-offset': [0, 0.5],
        'text-size': 11,
        visibility: 'visible'
      },
      paint: {
        'text-color': '#666',
        'text-halo-blur': 1,
        'text-halo-color': 'rgba(255,255,255,0.75)',
        'text-halo-width': 1
      }
    },
    {
      id: 'road_major_label',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'transportation_name',
      filter: ['==', '$type', 'LineString'],
      layout: {
        'symbol-placement': 'line',
        'text-field': '{name}',
        'text-font': ['Noto Sans Regular'],
        'text-letter-spacing': 0.1,
        'text-rotation-alignment': 'map',
        'text-size': {
          base: 1.4,
          stops: [
            [10, 8],
            [20, 14]
          ]
        },
        'text-transform': 'uppercase'
      },
      paint: {
        'text-color': '#000',
        'text-halo-color': 'hsl(0, 0%, 100%)',
        'text-halo-width': 2
      }
    },
    {
      id: 'mountain_peak',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'mountain_peak',
      minzoom: 7,
      filter: ['all', ['==', '$type', 'Point'], ['==', 'rank', 1]],
      layout: {
        'icon-size': 1,
        'text-anchor': 'bottom',
        'text-field': '{name}\n{ele} m\n▲',
        'text-font': ['Noto Sans Regular'],
        'text-max-width': 8,
        'text-offset': [0, 0.5],
        'text-size': 11,
        visibility: 'visible'
      },
      paint: {
        'text-color': 'rgba(51, 51, 51, 1)',
        'text-halo-blur': 1,
        'text-halo-color': 'rgba(255,255,255,1)',
        'text-halo-width': 1
      }
    },
    {
      id: 'park-label',
      type: 'symbol',
      metadata: { 'mapbox:group': '1444849242106.713' },
      source: 'openmaptiles',
      'source-layer': 'park',
      minzoom: 0,
      filter: ['all', ['==', 'rank', 1], ['==', '$type', 'Point']],
      layout: {
        'text-allow-overlap': false,
        'text-field': '{name}',
        'text-font': ['Noto Sans Regular'],
        'text-ignore-placement': false,
        'text-letter-spacing': 0.1,
        'text-max-width': 9,
        'text-size': {
          base: 1.2,
          stops: [
            [12, 10],
            [15, 14]
          ]
        },
        'text-transform': 'none',
        visibility: 'visible'
      },
      paint: {
        'text-color': 'rgba(38, 92, 46, 1)',
        'text-halo-color': 'rgba(255,255,255,0.8)',
        'text-halo-width': 1.2
      }
    },
    {
      id: 'place_label_other',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'place',
      minzoom: 8,
      filter: [
        'all',
        ['==', '$type', 'Point'],
        ['all', ['!in', 'class', 'city', 'state', 'country', 'continent']]
      ],
      layout: {
        'text-anchor': 'center',
        'text-field': '{name}',
        'text-font': ['Noto Sans Regular'],
        'text-max-width': 6,
        'text-size': {
          stops: [
            [6, 10],
            [12, 14]
          ]
        },
        visibility: 'visible'
      },
      paint: {
        'text-color': 'hsl(0, 10%, 25%)',
        'text-halo-blur': 0,
        'text-halo-color': 'hsl(0, 0%, 100%)',
        'text-halo-width': 2
      }
    },
    {
      id: 'place_label_city',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'place',
      maxzoom: 16,
      filter: ['all', ['==', '$type', 'Point'], ['==', 'class', 'city']],
      layout: {
        'text-field': '{name}',
        'text-font': ['Noto Sans Regular'],
        'text-max-width': 10,
        'text-size': {
          stops: [
            [3, 12],
            [8, 16]
          ]
        }
      },
      paint: {
        'text-color': 'hsl(0, 0%, 0%)',
        'text-halo-blur': 0,
        'text-halo-color': 'hsla(0, 0%, 100%, 0.75)',
        'text-halo-width': 2
      }
    },
    {
      id: 'country_label-other',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'place',
      maxzoom: 12,
      filter: ['all', ['==', '$type', 'Point'], ['==', 'class', 'country'], ['!has', 'iso_a2']],
      layout: {
        'text-field': '{name}',
        'text-font': ['Noto Sans Regular'],
        'text-max-width': 10,
        'text-size': {
          stops: [
            [3, 12],
            [8, 22]
          ]
        },
        visibility: 'visible'
      },
      paint: {
        'text-color': 'hsl(0, 0%, 13%)',
        'text-halo-blur': 0,
        'text-halo-color': 'rgba(255,255,255,0.75)',
        'text-halo-width': 2
      }
    },
    {
      id: 'country_label',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'place',
      maxzoom: 12,
      filter: ['all', ['==', '$type', 'Point'], ['==', 'class', 'country'], ['has', 'iso_a2']],
      layout: {
        'text-field': '{name}',
        'text-font': ['Noto Sans Regular'],
        'text-max-width': 10,
        'text-size': {
          stops: [
            [3, 12],
            [8, 22]
          ]
        }
      },
      paint: {
        'text-color': 'hsl(0, 0%, 13%)',
        'text-halo-blur': 0,
        'text-halo-color': 'rgba(255,255,255,0.75)',
        'text-halo-width': 2
      }
    }
  ],
  id: 'klokantech-terrain'
}
