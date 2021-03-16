<template>
  <div id="app">
    <h1 id="title"> Victor's Food </h1>
    <links-header></links-header>
    <router-view></router-view>
    
  </div>
</template>

<script>
import Header from './components/Header.vue';
  export default {
    components: {
      'links-header': Header,
    }
}
</script>

<style>
    #title {
      font-size: 60px;
      text-align: center;
      background-color: yellow;
      border: 1px solid;

    }
  
</style>
