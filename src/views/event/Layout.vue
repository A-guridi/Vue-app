<script setup>
import EventService from '@/services/EventService'
import { ref, onMounted } from 'vue'
import {useRouter} from 'vue-router'        // option 2

const router= useRouter()

const event = ref(null)
const props = defineProps({
    id: {
        required: true,
        Type: Number,
    }

})

onMounted(() => {
  // fetch event (by id) and set local event data
  EventService.getEvent(props.id)
  .then((response) => {
    event.value = response.data
  })
  .catch((error) => {
    // this will redirect the user in case they look for an inexisting event
    if(error.response && error.response.status == 404) {
      router.push({
        name: '404Resource',
        params: {resource: 'event'},
      })
    }
    else{
      router.push({name: 'NetworkError'})
    }
  })
})
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
        <!-- We can delete the ID param, since it is implicit in the URL and Vue will fetch it from that -->
      <router-link :to="{ name: 'EventDetails'}"
        >Details</router-link
      >
      |
      <router-link :to="{ name: 'EventRegister'}"
        >Register</router-link
      >
      |
      <router-link :to="{ name: 'EventEdit'}"
        >Edit</router-link
      >
    </div>
    <!-- This is where the children components (Edit, Details, Register) will be displayed  -->
    <router-view :event="event" />
  </div>
</template>