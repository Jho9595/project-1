<template>
  <div>
    <nav class="navbar navbar-light" style="background-color: lightblue">
      <div class="container-fluid">
        <a class="navbar-brand" @click.prevent=home >Unsircle Test</a>
        <a class="btn btn-dark" aria-current="page" style="" @click="logout" >Logout</a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: [],
  methods: {
    data() {
      return {

      }
    },
    logout () {
      localStorage.removeItem('access_token')
      this.$router.push('/login')
    },
    home () {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>