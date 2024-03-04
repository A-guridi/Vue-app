<script setup>
import EventCard from '@/components/EventCard.vue';
import {ref} from 'vue'

const events = ref([

])
</script>

<template>
  <h1>Events for good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>