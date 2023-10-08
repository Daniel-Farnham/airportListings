<template>
  <div id="app">
    <AirportDropdown :airports="airports" @airport-selected="fetchAirportInfo" />
    <FlightList v-if="airportDepInfo" :flightInfo="airportDepInfo" listType="departures" title="Departures" />
    <FlightList v-if="airportArrInfo" :flightInfo="airportArrInfo" listType="arrivals" title="Arrivals" />
  </div>
</template>

<style> 
  body {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    background-color: #FBF8F8;
    display: flex;
    justify-content: center;
  }
  #app {
    margin-top: 2vh;
  }
</style>

<script>

import apiService from '@/apiService';
import AirportDropdown from './components/airportDropdown.vue';
import FlightList from './components/flightList.vue';

export default {
  components: {
    AirportDropdown,
    FlightList,
  },
  data() {
    return {
      selectedAirport: '',
      airports: [
      ],
      airportDepInfo: null,
      airportArrInfo: null,
    };
  },
  watch: {
    selectedAirport(newValue) {
      if (newValue) {
        this.fetchAirportInfo(newValue); 
      }
    }
  },

  mounted() {
    this.fetchMajorAirports();
  },
  methods: {
    async fetchMajorAirports() {
      try {
        const airportList = await apiService.apiCall('airports', { country_code: 'AU' });
        this.airports = airportList.response.filter(airport => airport.is_major === 1);
      } catch (error) {
        console.error('There was an error!', error);
      } 
    },
    async fetchAirportInfo(airport) {
      try {
        if (!airport) return;  
        console.log("Fetching info for:", airport.name);
        const airportDepInfo = await apiService.apiCall('schedules', { dep_iata: airport.iata_code });
        const airportArrInfo = await apiService.apiCall('schedules', { arr_iata: airport.iata_code });
        this.airportDepInfo = airportDepInfo;
        this.airportArrInfo = airportArrInfo; 
        console.log(airportDepInfo);
      } catch (error) {
        console.error('There was an error fetching airport information!', error);
      }
    },
  },
};

</script>
