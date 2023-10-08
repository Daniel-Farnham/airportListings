<template>
  <div class='flightList' v-if="flightInfo && flightInfo.response">
    <h2>{{ title }}</h2>

    <!-- Search Input -->
    <input v-model="searchQuery" placeholder="Search for flights..." />

    <table>
      <thead>
        <tr>
          <th>Flight Number</th>
          <th>{{ listType === 'departures' ? 'Destination' : 'Origin' }}</th>
          <th>Scheduled</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="flight in paginatedFlights" :key="flight.flight_iata || flight.flight_icao">
          <td>{{ flight.flight_iata }}</td>
          <td>{{ listType === 'departures' ? flight.arr_iata : flight.dep_iata }}</td>
          <td>{{ listType === 'departures' ? flight.arr_time : flight.dep_time }}</td> <!-- Assuming the flight data has an estimated departure time -->
        </tr>
      </tbody>
    </table>

    <div>
      <button @click="previousPage" :disabled="currentPage <= 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage >= totalPages">Next</button>
    </div>
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
  },
  data() {
    return {
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 10
    };
  },
  computed: {
    filteredFlights() {
      if (!this.searchQuery) {
        return this.flightInfo.response;
      }
      return this.flightInfo.response.filter(flight => 
        flight.airline_iata.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        flight.flight_iata.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (this.listType === 'departures' ? flight.arr_iata : flight.dep_iata).toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    paginatedFlights() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredFlights.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredFlights.length / this.itemsPerPage);
    }
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
};
</script>

<style scoped>
  .flightList {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
    background-color: #FFF;
    max-width: 800px;
    margin: 20px auto;
  }

  h2 {
    color: #333;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }

  input {
    padding: 10px 15px;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
  }

  table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #e0e0e0;
  padding: 10px;
}

th {
  background-color: #f4f4f4;
}

  button {
    background-color: #007BFF;
    color: #FFF;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 5px;

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    &:hover:not(:disabled) {
        background-color: #0056b3;
    }
  }
</style>
