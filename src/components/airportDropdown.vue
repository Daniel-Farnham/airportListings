<template>
  <div>
    <label for="airport">Select Airport: </label>
    <select v-model="selected" id="airport">
      <option disabled value="">Please select one</option>
      <option v-for="airport in airports" :key="airport.code" :value="airport">
        {{ airport.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    airports: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selected: null
    };
  },
  watch: {
    selected(newValue) {
      this.$emit('airport-selected', newValue);
    }
  }
};
</script>
