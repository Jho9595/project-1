<template>

<div class="wrapper fadeInDown">
  <div id="formContent"> <br>

    <div class="fadeIn first">
      <h5>login</h5>
    </div> <br>

    <p v-for="(error,idx) in loginErrors" :key="idx" style="color: crimson;" align="center">{{ error }}</p>

    <form>
      <input v-model="email" type="text" id="login" class="fadeIn second" name="login" placeholder="Email">
      <input v-model="password" type="text" id="password" class="fadeIn third" name="login" placeholder="Password">
      <input @click.prevent="login" type="submit" class="fadeIn fourth" value="Log In">
    </form>

    <div id="formFooter">
      <p class="underlineHover" @click.prevent="changeToRegister" >Make a new account</p>

    </div>

  </div>
</div>

</template>

<script>
import axios from '../../api'

export default {
  data() {
    return {
      email: "",
      password: "",
      loginErrors: '',
    };
  },
  methods: {
    login() {
      const payload = {
        email: this.email,
        password: this.password
      };

      axios({
        url: "/user/login",
        method: "post",
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
      .then(( { data } ) => {
        localStorage.setItem("access_token", data.access_token);
        this.$router.push('/')
      })
      .catch(({ response }) => {
        this.loginErrors = response.data
      });
    },
    changeToRegister() {
      this.$router.push('/register')
    }
  },
  
};
</script>

<style scoped>
@import '../../css/loginRegister.css'; 
</style>