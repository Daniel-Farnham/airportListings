<template>
  <div v-if="flightInfo && flightInfo.response">
    <h2>{{ title }}</h2>
    <ul>
      <li v-for="flight in flightInfo.response" :key="flight.flight_iata || flight.flight_icao">
        <p><strong>Airline IATA:</strong> {{ flight.airline_iata }}</p>
        <p><strong>Flight Number:</strong> {{ flight.flight_iata }}</p>
        <p><strong>{{ listType === 'departures' ? 'Destination' : 'Origin' }}:</strong> {{ listType === 'departures' ? flight.arr_iata : flight.dep_iata }}</p>
      </li>
    </ul>
  </div>
</template>

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
  }
};
</script>
