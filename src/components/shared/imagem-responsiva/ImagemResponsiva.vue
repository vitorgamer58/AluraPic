<template>
  <img class="imagem-responsiva" :src="url" v-bind:alt="titulo" />
  <!-- em vez de v-bind pode-se usar os dois pontos! -->
</template>

<script>
export default {
    props: ['url', 'titulo']
}
</script>

<style scoped>
  .imagem-responsiva {
    width: 100%;
  }
</style>
