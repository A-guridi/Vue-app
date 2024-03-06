<script setup lang="ts">
import {PropType} from 'vue'
import {EventItem} from '@/services/types'


const props = defineProps({
    event: {
        // this is the standard way of type defining in props
        type: {} as PropType<EventItem>,         
        required: true,
    }
})

</script>

<template>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
</template>@/services/types