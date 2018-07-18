<template>
  <v-app style="height: 100%">
    <v-toolbar id="toolbar">
      <v-toolbar-title>Chat Application</v-toolbar-title>
    </v-toolbar>

    <v-content class="pt-0" id="main-content">
        <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html{ height:100%; margin:0; }
body {
  height: calc(100% - 60px);
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#main-content {
  height: calc(100% - 60px);
}
</style>
