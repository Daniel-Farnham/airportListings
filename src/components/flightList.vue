<template>
  <div class='flightList' v-if="flightInfo && flightInfo.response">
    <h2>{{ title }}</h2>

    <input type="text" v-model="searchTerm" placeholder="Search by Airline IATA or Flight Number">

    <ul>
      <li v-for="flight in filteredFlights" :key="flight.flight_iata || flight.flight_icao">
        <p><strong>Airline IATA:</strong> {{ flight.airline_iata }}</p>
        <p><strong>Flight Number:</strong> {{ flight.flight_iata }}</p>
        <p><strong>{{ listType === 'departures' ? 'Destination' : 'Origin' }}:</strong> {{ listType === 'departures' ? flight.arr_iata : flight.dep_iata }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>

<script>
export default {
  props: {
    flightInfo: {
      type: Object,
      required: true
    },
    listType: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      searchTerm: '',
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    // Computed property to filter the flight list based on the search term
    filteredFlights() {
      if (!this.searchTerm) return this.flightInfo.response;
      const term = this.searchTerm.toLowerCase();
      return this.flightInfo.response.filter(flight => {
        return flight.airline_iata.toLowerCase().includes(term) || flight.flight_iata.toLowerCase().includes(term);
      });
    }
  }
};
</script>
