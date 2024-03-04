<script setup>
import EventCard from '@/components/EventCard.vue';
import EventService from '@/services/EventService.js'
import { ref, onMounted, computed, watchEffect } from 'vue'

const props = defineProps(['page'])

const events = ref(null)
const totalEvents = ref(0)

const page = computed(() => props.page)

// this computed propierty is calculated when the total amount of events is set
// to know if we can display a next buttom
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 2)
  return page.value < totalPages
})

onMounted(() => {
  watchEffect(() => {   // this watcher calls the API call again when reactive objects inside change
    events.value = null  // waits to load
    EventService.getEvents(2, page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = response.headers['x-total-count']
      })
      .catch((error) => {
        console.log(error)
      })
  })
})

</script>

<template>
  <h1>Events for good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <RouterLink id="page-prev" :to="{ name: 'EventList', query: { page: page - 1 } }" rel="prev" v-if="page > 1">&#60;
        Previous
      </RouterLink>
      <!-- Also -case is supported -->
      <router-link id="page-next" :to="{ name: 'EventList', query: { page: page + 1 } }" rel="next"
        v-if="hasNextPage">Next &#62;
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>