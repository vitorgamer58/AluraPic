<!-- alurapic/src/components/cadastro/Cadastro.vue -->

<template>
  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado">{{ foto.titulo }}</h2>
    <h2 class="centralizado" v-if="foto._id">Alterando</h2>
    <h2 class="centralizado" v-else>Incluindo</h2>

    <form @submit.prevent="grava()">
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input
          data-vv-as="título"
          name="titulo"
          v-validate
          data-vv-rules="required|min:3|max:30"
          id="titulo"
          autocomplete="off"
          v-model="foto.titulo"
        />
        <!-- <input id="titulo" autocomplete="off" @input="foto.titulo = $event.target.value" :value="foto.titulo"> -->
        <span class="erro" v-show="errors.has('titulo')">{{
          errors.first("titulo")
        }}</span>
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input
          name="url"
          v-validate
          data-vv-rules="required"
          id="url"
          autocomplete="off"
          v-model="foto.url"
        />
        <!-- o Modifier .lazy (v-model.lazy="foto.url") posterga a atualização do valor que eu digitei no input com o objeto só para o momento que eu sair do input-->
        <!-- <input id="url" autocomplete="off" @input="foto.url = $event.target.value" :value="foto.url"> -->
        <span class="erro" v-show="errors.has('url')">URL Obrigatória</span>
        <div class="preview-img">
          <imagem-responsiva
            v-show="foto.url"
            :url="foto.url"
            :titulo="foto.titulo"
          />
          <p v-show="foto.url">{{ foto.titulo }}</p>
        </div>
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea
          id="descricao"
          autocomplete="off"
          v-model="foto.descricao"
        ></textarea>
        <!-- <textarea id="descricao" autocomplete="off" @input="foto.descricao = $event.target.value" :value="foto.descricao"></textarea> -->
      </div>

      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit" />
        <router-link :to="{ name: 'home' }"
          ><meu-botao rotulo="VOLTAR" tipo="button"
        /></router-link>
        <!-- <router-link to="/"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link> -->
      </div>
    </form>
  </div>
</template>

<script>
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Botao from "../shared/botao/Botao.vue";
import Foto from "../../domain/foto/Foto";
//import FotoService from "../../domain/foto/FotoService";
import { cadastra, busca } from "../../http";

export default {
  components: {
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao,
  },

  data() {
    return {
      foto: new Foto(),
      id: this.$route.params.id,
    };
  },
  methods: {
    grava() {
      // método $validator vem do pacote vee-validator
      this.$validator.validateAll().then((sucess) => {
        if (sucess) {
          cadastra(this.foto).then(() => {
            if (this.id) this.$router.push({ name: "home" }); // Redireciona
            this.foto = new Foto();
          })

          /* this.foto = new Foto(); */
          // Envia os dados para o servidor via requisição POST, e então limpa o formulário, se houver erro então imprime o erro no console.
          /* this.$http
            .post('http://localhost:3000/v1/fotos', this.foto)
            .then(() => this.foto = new Foto(), err => console.log(err)) */

          /* this.resource
            .save(this.foto)
            .then(() => this.foto = new Foto(), err => console.log(err)) */
        };
      });
    },
  },
  created() {
    /* this.resource = this.$resource('v1/fotos'); */
    if (this.id) {
      busca(this.id).then((foto) => (this.foto = foto));
    }
  },
};
</script>
<style scoped>
form {
  max-width: 753px;
  margin: auto auto;
}

.preview-img {
  padding: 5px;
  max-width: 400px;
  margin: auto auto;
  text-align: center;
}

.centralizado {
  text-align: center;
}
.controle {
  font-size: 1.2em;
  margin-bottom: 20px;
}
.controle label {
  display: block;
  font-weight: bold;
}

.controle label + input,
.controle textarea {
  width: 100%;
  font-size: inherit;
  border-radius: 5px;
}

.centralizado {
  text-align: center;
}

.erro {
  color: red;
}

</style>
