# Test Plan - AluraPic
## Introdução
AluraPic é um sistema de gestão de fotos, o sistema foi criado com o propósito de dar suporte para a formação em VueJs, sua finalidade principal é fazer consumo de API REST, entre as funções disponíveis está a de incluir, remover e editar fotos, fazendo isso atráves de consumo de api.
## Arquitetura
O framework utilizado é o VueJs.
Para armazenamento, consulta e alteração de dados, será usada uma API REST.
O sistema foi originalmente criado para trabalhar com NodeJs 6, porém alterações foram feitas no projeto original da Alura para que o sistema trabalhe com NodeJs 14 e use Axios em vez de Vue-Resource.
## Funcionalidades
| Funcionalidade | Comportamento Esperado | Verificações | Critérios de Aceite
|--|--|--|--|
| Cadastro | Ao digitar título, URL e descrição e clicar em gravar, o sistema deve fazer uma requisição POST para a API, gravando a foto no banco de dados. | Título e URL são campos obrigatórios, descrição é um campo opcional, título deve ter no mínimo 3 e no máximo 30 caracteres. | Caso a validação esteja ok deve fazer o POST e limpar os campos, se a validação não funcionar então não deve fazer nada.
| Remoção | Ao clicar para deletar, deve abrir um alert de confirmação, que se confirmado, deve fazer uma requisição DELETE para deletar a foto. | Nenhuma | Deve fazer a requisição DELETE.
| Edição | Ao clicar para editar, deve acessar a pagina de cadastro passando o id da foto como parâmetro, deve ser exibido o título, URL, foto e descrição. | As mesmas da funcionalidade de cadastro | Ao clicar em gravar, deve fazer uma requisição PUT.
| Busca | Ao sigitar na barra de busca deve filtrar as fotos pelo título | Nenhuma | Deve filtrar as fotos pelo título corretamente, excluindo as fotos cujo título não esteja incluso no texto digitado |
## Estratégia de testes
O plano de testes abrange todas as funcionalidades descritas na tabela acima.
Testes unitários: O código deve conter testes unitários.
Testes manuais: Todas as funcionalidades devem ser testadas manualmente
Testes automatizados: Serão realizados testes end-to-end em todo o código
## Ambiente e ferramentas
| Ferramenta | Descrição |
|--|--|
| Jest | Testes unitários
| Cypress | Testes end-to-end