<template>
  <div id="app" class="h-100 w-100 text-primary">
    <router-view/>
  </div>
</template>

<style lang="scss">
$body-bg: #ccffff; //#fff8ed;
$light: #cbcbcb;
$dark: #b480e4;//#1f1c1d;
$primary: #b480e4;//#e7b8c1;
$secondary: #fab5e2;
$info: #67c1ec;

$theme-colors: (
  "primary": $primary,
  "secondary": $secondary,
  // "success": $success,
  "dark": $dark,
  "light": $light,
  "info": $info,
  //...other variables, you can find them in node_modules/bootstrap/scss/_variables.scss
);

@font-face {
  font-family: "mini-wakuwaku";
  src: local("mini-wakuwaku"),
   url(@/assets/mini-wakuwaku.otf) format("OpenType");
}

@import "~bootstrap/scss/bootstrap.scss";
@import "~bootstrap-vue/src/index.scss";
@import "~bootstrap-vue/src/icons.scss";

html, body {
  height: 100%;
  width: 100%;
}
#app {
  //font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: 'mini-wakuwaku', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    color: black;
    -webkit-text-fill-color: white; /* Will override color (regardless of order) */
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
