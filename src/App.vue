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
        { name: 'Sydney Airport', code: 'SYD' },
        { name: 'Melbourne Airport', code: 'MEL' },
        //... other Australian airports
      ],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await apiService.apiCall('ping', {param1: 'value1'});
        console.log(response);
      } catch (error) {
        console.error('There was an error!', error);
      }
    },
  },
};
</script>
