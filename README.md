# AgendaTempo

O **AgendaTempo** é uma aplicação web que combina uma agenda mensal com a previsão do tempo, facilitando a organização de compromissos e o planejamento de atividades.

## Funcionalidades

- Calendário mensal com navegação entre meses.
- Cadastro e exclusão de compromissos.
- Organização por data e horário.
- Visualização dos compromissos no calendário.
- Painel com os compromissos do mês.
- Consulta da previsão do tempo.
- Previsão meteorológica dos próximos sete dias.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Vue.js 3
- Open-Meteo API

## Vue.js 3

O projeto utiliza o Vue.js 3, um framework JavaScript que permite criar interfaces dinâmicas e reativas.

Nesta versão, foi integrado por meio de uma CDN diretamente no HTML, sem utilizar ferramentas como Vite.

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="function.js"></script>
```html
## Como utilizar o site

### 1. Navegação pelo calendário

Ao abrir o site, será exibido o calendário do mês atual.

- Utilize as setas para avançar ou retroceder entre os meses.
- Clique em um dia para abrir sua visualização detalhada.
- Os compromissos cadastrados aparecem diretamente nos respectivos dias.

### 2. Cadastro de compromissos

Na visualização de um dia:

1. Informe o horário do compromisso.
2. Digite uma descrição para identificar a atividade.
3. Clique no botão para adicionar o compromisso.

O compromisso será exibido na lista do dia e no calendário mensal.

### 3. Exclusão de compromissos

Os compromissos cadastrados possuem uma opção de exclusão, permitindo remover atividades que não são mais necessárias.

### 4. Consulta da previsão do tempo

Ao selecionar um dia, o site apresenta as informações meteorológicas disponíveis para aquela data, incluindo:

- Temperatura máxima.
- Temperatura mínima.
- Probabilidade de chuva.

Também é possível consultar a previsão dos próximos sete dias no painel localizado abaixo do calendário.

### 5. Resumo mensal

Na parte inferior da página, existe um painel que reúne os compromissos cadastrados no mês selecionado.

Ao clicar em um compromisso dessa lista, é possível abrir diretamente a data correspondente.

## Colaboradores

Este projeto foi desenvolvido por:

- Kleber
- Leonardo
- Lucas J.
- Luigi
- Luiz
- Silvio
- Sofia
- Victor
- Vitor S.
- Wesley

