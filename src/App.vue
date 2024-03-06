<script setup>
import { RouterLink, RouterView } from 'vue-router'
import {inject} from 'vue'

const GStore = inject('GStore')   // retrieve the global store

</script>

<template>
  <div id="layout">
    <div id="flashMessage" v-if="GStore.flashMessage">
      {{ GStore.flashMessage }}
    </div>
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink :to="{name: 'EventList'}">Events</RouterLink> |
          <RouterLink :to="{name: 'About'}">About</RouterLink> |
          <RouterLink :to="{name: 'Todo'}">Todo</RouterLink>
        </nav>
      </div>
    </header>
  <RouterView />
</div>
</template>

<!-- Scoped means they only apply to the components here -->
<style>
#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #4479ad;
}
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #5591cd;
}
nav a.router-link-exact-active {
  color: #42b983;
}
h2 {
  font-size: 20px;
}
@keyframes yellowfade {
  from {
    background: yellow;
  }
  to {
    background: transparent;
  }
}

#flashMessage {
  animation-name: yellowfade;
  animation-duration: 3s;
}
</style>
