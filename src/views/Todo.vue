<script setup lang="ts">
import { defineComponent, ref, toRefs, computed } from 'vue'
import { TodoItem } from '@/services/types'



const newTask = ref({
        label: '',
        type: 'personal',
        isComplete : false
        })

const taskItems = ref([])
const listFilter = ref('all')


const filteredTasks = computed(() => {
    if (listFilter.value === 'complete') {
    return taskItems.value.filter(
        (item: TodoItem) => item.isComplete === true
    )
    } else if (listFilter.value === 'incomplete') {
    return taskItems.value.filter(
        (item: TodoItem) => item.isComplete === false
    )
    } else {
    return taskItems
    }
})

const addTask = (newTask) => {
    taskItems.value.push(newTask)
    newTask.label = ''
    newTask.type = 'personal'
    newTask.isComplete = false
}

</script>

<template>
    <div class="todo-page">
      <h1>Todo</h1>
      <form @submit.prevent>
        <div class="mb1">
          <label for="task-label">Task Label: </label>
          <input type="text" id="task-label" v-model="newTask.label" />
        </div>
        <div class="mb1">
          <label for="task-type">Take Type: </label>
          <select name="task-type" id="task-type" v-model="newTask.type">
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
        </div>
        <button @click="addTask(newTask)">Add Task</button>
      </form>
      <h2>Task List</h2>
      <div>
        <button @click="listFilter = 'all'">All</button> |
        <button @click="listFilter = 'incomplete'">Incomplete</button> |
        <button @click="listFilter = 'complete'">Complete</button>
      </div>
      <ul>
        <li v-for="(task, index) in filteredTasks" :key="`task-${index}`">
          <input type="checkbox" v-model="task.isComplete" /> {{ task.label }} ({{
            task.type
          }})
        </li>
      </ul>
    </div>
  </template>
  
  <style scoped>
  .todo-page {
    max-width: 800px;
    margin: 0 auto;
  }
  
  ul {
    list-style: none;
  }
  
  .mb1 {
    margin-bottom: 1rem;
  }
  </style>