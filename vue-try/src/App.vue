<template>
  <div id="app">
    <navbar></navbar>
    <b-container>
        <router-view/>
    </b-container>
  </div>
</template>

<style lang="scss">

</style>
<script>
import Navbar from './views/layout/Navbar.vue';

export default {
  components: { Navbar },
  data() {
    return {};
  },
};
</script>
