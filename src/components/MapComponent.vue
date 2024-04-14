<template>
  <div ref="mapContainer">
    <p>Vue-Leaflet Demo: Dynamic Location Update</p>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mapActions, mapState } from 'pinia';
import mapStore from '../stores/mapStore';

export default {
  computed: {
    ...mapState(mapStore, [
      'latitude',
      'longitude',
      'country',
      'city',
      'bookPhoto',
      'bookTitle',
      'products',
      'useExternalLocation',
    ]),
  },
  data() {
    return {
      map: null,
      marker: null,
      intervalId: null,
    };
  },
  async mounted() {
    await this.getProducts();
    // this.intervalId = setInterval(this.getRandom, 10000); // 每10秒更新一次位置
    this.intervalId = setInterval(async () => {
      await this.getRandom();
      this.updateMap();
    }, 10000);
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove();
    }

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
  watch: {
    latitude: {
      handler(newVal, oldVal) {
        if (!this.map && newVal !== null && this.longitude !== null) {
          if (!this.useExternalLocation) {
            this.getRandom();
          }
          this.getMap();
        } else if (this.map && newVal !== oldVal) {
          this.updateMap();
        }
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(mapStore, [
      'getRandom',
      'getProducts',
      'resetuseExternalLocation',
    ]),

    getMap() {
      this.$nextTick(() => {
        if (this.$refs.mapContainer) {
          this.map = L.map(this.$refs.mapContainer).setView(
            [this.latitude, this.longitude],
            8,
          );
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(this.map);
          this.marker = L.marker([this.latitude, this.longitude]).addTo(
            this.map,
          );
          const popupContent = `
                            <div style="display: flex; align-items: center;">
                            <div style="flex: 1;">
                            <img src="${this.bookPhoto}" alt="BookImage on Map" style="width: 100px; height: auto;">
                            </div>
                            <div style="flex: 2; margin-left: 10px;">
                            <p>SomeOne from ${this.city}, ${this.country} <br> bought <strong>${this.bookTitle}</strong> with free delivery</p>
                            </div>
                            </div>`;

          this.marker.bindPopup(popupContent).openPopup();
        }
      });
    },
    updateMap() {
      this.map.setView([this.latitude, this.longitude], 8);
      this.marker.setLatLng([this.latitude, this.longitude]);
      const popupContent = `
                            <div style="display: flex; align-items: center;">
                            <div style="flex: 1;">
                            <img src="${this.bookPhoto}" alt="BookImage on Map" style="width: 100px; height: auto;">
                            </div>
                            <div style="flex: 2; margin-left: 10px;">
                            <p>SomeOne from ${this.city}, ${this.country} <br> bought <strong>${this.bookTitle}</strong> with free delivery</p>
                            </div>
                            </div>`;
      this.marker.getPopup().setContent(popupContent).openPopup();
      if (this.useExternalLocation) {
        setTimeout(() => {
          this.resetuseExternalLocation();
        }, 10000);
      }
    },
  },
};
</script>
