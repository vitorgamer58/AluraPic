<template>
  <div class="corpo">
    <!-- Hora tem que exibir um componente, hora outro... -->
    <meu-menu :rotas="routes" />
    <transition name="pagina">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { routes } from './routes';
import Menu from './components/shared/menu/Menu3.vue';
export default {
  components: {
    'meu-menu': Menu
  }, data() {
    return {
      routes: routes.filter(route => route.menu)
    }
  }
}
</script>

<style>
  .corpo {
    font-family: Helvetica, sans-serif;
    width: 96%;
    margin: 0 auto;
  }

  .pagina-enter, .pagina-leave-active {
  opacity: 0;
}

  .pagina-enter-active, .pagina-leave-active {
    transition: opacity 400ms;
  }
</style>
