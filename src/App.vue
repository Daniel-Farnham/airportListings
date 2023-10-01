<template>
  <div id="app">
    <div>
      <label for="airport">Select Airport: </label>
      <select v-model="selectedAirport" id="airport">
        <option disabled value="">Please select one</option>
        <option v-for="airport in airports" :key="airport.code" :value="airport.code">
          {{ airport.name }}
        </option>
      </select>
    </div>
    <div v-if="firstAirport">
      <h2>Information for the First Airport</h2>
      <p><strong>Name:</strong> {{ firstAirport.name }}</p>
      <p><strong>ICAO Code:</strong> {{ firstAirport.icao_code }}</p>
      <p><strong>IATA Code:</strong> {{ firstAirport.iata_code || 'N/A' }}</p>
      <p><strong>Country Code:</strong> {{ firstAirport.country_code }}</p>
    </div>
    <div>
      <h2>Arrivals</h2>
      <!-- Container for arrivals will go here -->
    </div>
    
    <div>
      <h2>Departures</h2>
      <!-- Container for departures will go here -->
    </div>
  </div>
</template>

<script>

import apiService from '@/apiService';

export default {
  data() {
    return {
      selectedAirport: '',
      airports: [
        // { name: 'Sydney Airport', code: 'SYD' },
        // { name: 'Melbourne Airport', code: 'MEL' },
        //... other Australian airports
      ],
    };
  },
  computed: {
    firstAirport() {
      // Returns the first airport from the airports array, or null if the array is empty
      return this.airports.length > 0 ? this.airports[0] : null;
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const returnedData = await apiService.apiCall('airports', { country_code: 'AU' });
        console.log(returnedData);
        this.airports = returnedData.response; 
      } catch (error) {
        //console.error('There was an error!', error);
      }
    },
  },
};


</script>
