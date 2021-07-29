import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';
import './directives/Transform';
import VeeValidate from 'vee-validate';
import msg from './pt_BR'

/* import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/teste.css' */
import './assets/js/example';
import 'bootstrap/dist/js/bootstrap';
import 'jquery/dist/jquery';

Vue.use(VueResource);
Vue.http.options.root = process.env.API_URL ? process.env.API_URL : 'http://localhost:3000';
Vue.use(VueRouter);

/* Vue.http.interceptors.push((req, next) => {

  // é possível colocar informações no header antes do envio da requisição
  req.headers.set('Authorization', 'informação de segurança aqui');
  console.log('Lidando com o request');

  next(res => {
    console.log('Lidando com a resposta')
    // é possível acessar os dados da reposta e realizar transformações antes
    console.log(res.body);
  });

}); */

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})
//ECMAScript 2016 -> chave e valor com mesmo nome
// const router = new VueRouter({ routes })

Vue.use(VeeValidate, {
  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages: msg
    }
  }
})

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
