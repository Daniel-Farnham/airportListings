<template>
  <div id="app">
    <div>
      <label for="airport">Select Airport: </label>
      <select v-model="selectedAirport" id="airport">
        <option disabled value="">Please select one</option>
        <option v-for="airport in airports" :key="airport.code" :value="airport">
          {{ airport.name }}
        </option>
      </select>
    </div>
    
    <div>
      <div v-if="airportDepInfo && airportDepInfo.response">
        <h2>Departures</h2>
        <ul>
            <li v-for="flight in airportDepInfo.response" :key="flight.flight_iata || flight.flight_icao">
                <p><strong>Airline IATA:</strong> {{ flight.airline_iata }}</p>
                <p><strong>Flight Number:</strong> {{ flight.flight_iata }}</p>
                <p><strong>Destination:</strong> {{ flight.arr_iata }}</p>
                <!-- Add more fields as needed -->
            </li>
        </ul>
      </div>
      <div v-if="airportArrInfo && airportArrInfo.response">
        <h2>Arrivals</h2>
        <ul>
            <li v-for="flight in airportArrInfo.response" :key="flight.flight_iata || flight.flight_icao">
                <p><strong>Airline IATA:</strong> {{ flight.airline_iata }}</p>
                <p><strong>Flight Number:</strong> {{ flight.flight_iata }}</p>
                <p><strong>Origin:</strong> {{ flight.dep_iata }}</p>
            </li>
        </ul>
      </div>
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
        console.log(airportList);
        this.airports = airportList.response.filter(airport => airport.is_major === 1);
        console.log(this.airports);
        this.fetchAirportInfo(this.airports);
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
        console.log(airportDepInfo.response[0]); 
        console.log(airportArrInfo.response[0]); 
      } catch (error) {
        console.error('There was an error fetching airport information!', error);
      }
    },
  },
};


</script>
