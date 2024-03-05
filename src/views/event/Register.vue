<script setup>
// import router from '@/router/index'      //option 1
import {useRouter} from 'vue-router'        // option 2
import {defineProps, inject} from 'vue'

const router= useRouter()

const props = defineProps(["event"])
const GStore = inject('GStore')     // retrieve the global storage

const register = () => {
    // API Call to register the user would go here
    // Display a registration message and clear it after 3 seconds
    GStore.flashMessage = 'You are succesfully registered for ' + props.event.title
    setTimeout(()=> {
        GStore.flashMessage = ''
    }, 3000)
    router.push({                   // this is the same as calling router-link inside the HTML
        name: 'EventDetails',
       /// id: props.event.id       // no need to specify it, its on the URL
    })
}

</script>

<template>
    <p>Register for the event here</p>
    <button @click="register">Register me !</button>
</template>