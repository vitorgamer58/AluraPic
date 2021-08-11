<template>
  <nav>
    <ul>
      <li v-for="route in rotas" v-bind:key="route.titulo">
        <router-link :to="route.path ? route.path : '/'" :data-cy="route.titulo">
          {{ route.titulo }}
        </router-link>
      </li>
      <!-- <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/cadastro">Cadastro</router-link></li> -->
    </ul>
  </nav>
</template>

<script>
export default {
    props: {
      rotas: {
        type: Array,
        required: true
      }
    }
};
</script>

<style>
</style>