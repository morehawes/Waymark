import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { mapData, waymarkConfig } from '@/data/waymark.js'
import L from 'leaflet'
import { getTypeData, getFeatureType } from '@/helpers/Overlay.js'

export const useMapStore = defineStore('map', () => {
  //State
  const geoJSON = ref(mapData)
  const mapConfig = ref(waymarkConfig)
  const leafletMap = ref()
  const leafletData = ref()
  const overlays = ref([])
  const leafletReady = ref(false)
  const visibleOverlays = ref([])
  const activeOverlay = ref(null)
  const mapHeight = ref(50)
  let modal = ref()

  function setMapHeight(heightPercent) {
    mapHeight.value = heightPercent
  }

  function setModal(m) {
    modal = m
  }

  //Actions
  function setLeafletMap(map) {
    leafletMap.value = map

    map.on('zoomend moveend', () => {
      visibleOverlays.value = overlays.value.filter((overlay) => {
        //Markers Only
        if (overlay.featureType != 'marker') return true

        // console.log(leafletMap.value.getBounds().contains(overlay.layer.getLatLng()))

        //In view
        return map.getBounds().contains(overlay.layer.getLatLng())
      })
    })
  }

  function setLeafletData(dataLayer) {
    leafletData.value = dataLayer
  }

  function setLeafletReady(ready) {
    leafletReady.value = ready
  }

  function setActiveOverlay(overlay) {
    modal.value.$el.setCurrentBreakpoint(0.75)

    if (activeOverlay.value !== overlay) {
      activeOverlay.value = overlay

      leafletMap.value.setView(overlay.layer.getLatLng())
    } else {
      leafletMap.value.setView(overlay.layer.getLatLng(), 14)
    }
  }

  function addLayer(layer) {
    let featureType = getFeatureType(layer.feature)
    let typeKey = layer.feature.properties.type

    let overlay = {
      id: L.stamp(layer),
      typeKey: typeKey,
      typeData: getTypeData(featureType, typeKey),
      feature: layer.feature,
      layer: layer,
      featureType: featureType
    }

    overlays.value.push(overlay)

    layer.on('click', () => {
      setActiveOverlay(overlay)
    })
  }

  //Getters
  const getActiveOverlay = computed(() => {
    return activeOverlay.value
  })
  // const visibleOverlays = computed(() => {
  //   if (!leafletReady.value) {
  //     return []
  //   }
  //   if (typeof leafletMap.value !== 'object') return []

  //   return overlays.value.filter((overlay) => {
  //     //Markers Only
  //     if (overlay.featureType != 'marker') return false

  //     // console.log(leafletMap.value.getBounds().contains(overlay.layer.getLatLng()))

  //     //In view
  //     return leafletMap.value.getBounds().contains(overlay.layer.getLatLng())
  //   })
  // })

  return {
    overlays,
    geoJSON,
    leafletMap,
    setLeafletMap,
    mapConfig,
    setLeafletData,
    addLayer,
    visibleOverlays,
    leafletReady,
    setLeafletReady,
    activeOverlay,
    setActiveOverlay,
    mapHeight,
    setMapHeight,
    setModal
  }
})
