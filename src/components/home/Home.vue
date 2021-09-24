<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
    <p v-show="mensage" class="centralizado">{{ mensage }}</p>
    <!-- ou <h1 v-text="titulo"></h1> -->
    <input
      type="search"
      class="filtro"
      v-on:input="filtro = $event.target.value"
      placeholder="Filtre por parte do titulo"
    />
    <ul class="lista-fotos">
      <li
        v-for="foto of fotosComFiltro"
        v-bind:key="foto.titulo"
        class="lista-fotos-item"
      >
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva
            :url="foto.url"
            :titulo="foto.titulo"
            v-meu-transform:scale.animate="1.2"
          />
          <router-link :to="{ name: 'altera', params: { id: foto._id } }">
            <meu-botao tipo="button" rotulo="ALTERAR"/>
          </router-link>
          
          <meu-botao
            tipo="button"
            rotulo="REMOVER"
            @botaoAtivado="remove(foto)"
            :confirmacao="true"
            estilo="perigo"
            data-cy="apagar"
          />
        </meu-painel>
      </li>
      <!-- posso usar v-bind ou simplesmente dois pontos (:) -->
    </ul>
  </div>
</template>

<script>
import Painel from "../shared/painel/Painel2.vue";
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Botao from "../shared/botao/Botao.vue";
//import FotoService from "../../domain/foto/FotoService"
import { lista, apaga } from "../../http"

export default {
  components: {
    "meu-painel": Painel,
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao,
  },
  data() {
    return {
      titulo: "AluraPic",
      fotos: [],
      filtro: "",
      mensage: "",
    };
  },
  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        /* FILTRAR */
        let exp = new RegExp(this.filtro.trim(), "i");
        return this.fotos.filter((foto) => exp.test(foto.titulo));
      } else {
        return this.fotos;
      }
    },
  },
  created() {
    lista()
      .then(fotos => this.fotos = fotos, (err) => this.mensage = err.message );
    
    // Este código foi tornado obsoleto em função de FotoService.js
    /* this.resource = this.$resource("v1/fotos{/id}");
    // O query sabe que vai fazer o GET até chegar no primeiro parâmetro, ou seja, no v1/fotos
    this.resource
      .query() // Realize uma requisição usando o get (query = consulta)
      .then((res) => res.json())
      .then(
        (resJson) => (this.fotos = resJson),
        (err) => console.log(err)
      ); */
    // Aula 6 da seção 3 da parte 2 de VueJs, professor começa a trocar $http por $resource, tudo para centralizar a BASE_URL no arquivo main.js, algo que não tem nenhuma necessidade...
    // Se já ensinou até aqui com $http porque mudar?
    //

    /* let promise = this.$http.get('v1/fotos')
    promise
      .then(res => res.json())
      .then(resJson => this.fotos = resJson, err => console.log(err)) */

    /* promise.then(res => {
      res.json().then(fotos => this.fotos = fotos)
    }) */
  },

  methods: {
    remove(foto) {
      apaga(foto._id).then(() => {
          let indice = this.fotos.indexOf(foto);
          this.fotos.splice(indice, 1);
          this.mensage = "Foto removida com sucesso";
        },
        (err) => {
          this.mensage = err.message;
        })    
        
      /* this.resource.delete({ id: foto._id }).then(
        () => {
          let indice = this.fotos.indexOf(foto);
          this.fotos.splice(indice, 1);
          this.mensage = "Foto removida com sucesso";
        },
        (err) => {
          console.log(err);
          this.mensage = "Não foi possível remover a foto";
        }
      ); */
      // o resource sabe que o id se refere ao {/id} da foto

      /* this.$http.delete(`v1/fotos/${foto._id}`).then(
        () => {
          let indice = this.fotos.indexOf(foto);
          this.fotos.splice(indice, 1);
          this.mensage = "Foto removida com sucesso";
        },
        (err) => {
          console.log(err);
          this.mensage = "Não foi possível remover a foto";
        }
      ); */
      },
    },
  };
</script>

<style>
.centralizado {
  text-align: center;
}

.lista-fotos {
  list-style: none;
}

.lista-fotos-item {
  display: inline-block;
}

.filtro {
  display: block;
  width: 100%;
}
</style>
