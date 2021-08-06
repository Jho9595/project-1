<template>

<div class="wrapper fadeInDown">
  <div id="formContent"> <br>

    <div class="fadeIn first">
      <h5>Register</h5>
    </div> <br>

    <p v-for="(error,idx) in registerErrors" :key="idx" style="color: crimson;" align="center">{{ error }}</p>

    <form>
      <input v-model="email" type="text" id="login" class="fadeIn second" name="login" placeholder="Email">
      <input v-model="password" type="text" id="password" class="fadeIn third" name="login" placeholder="Password">
      <input @click.prevent="register" type="submit" class="fadeIn fourth" value="Register">
    </form>

    <div id="formFooter">
      <p class="underlineHover" @click.prevent="changeToLogin" >Already have an account</p>

    </div>

  </div>
</div>

</template>

<script>
import axios from '../../api'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
  data() {
    return {
      email: "",
      password: "",
      registerErrors: '',
    };
  },
  methods: {
    register() {
      const payload = {
        email: this.email,
        password: this.password
      };

      axios({
        url: "/user/register",
        method: "post",
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
      .then(( { data } ) => {
        localStorage.setItem("access_token", data.access_token);
        
        Swal.fire({
          title: 'Success!',
          text: 'Berhasil register',
          icon: 'success',
          confirmButtonText: 'Ok'
        })

        this.$router.push('/login')
      })
      .catch(({ response }) => {
        this.registerErrors = response.data
      });
    },
    changeToLogin() {
      this.$router.push('/login')
    }
  },
  
};
</script>

<style scoped>
@import '../../css/loginRegister.css'; 
</style>