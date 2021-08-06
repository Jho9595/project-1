<template>
  <div class="home">
    <Navbar/>

    <div id="body">
    <br> <br>

    <div class="container">
      <form action="/action_page.php">
        <div class="row">
          <div class="col-25">
            <label for="fname">Barang</label>
          </div>
          <div class="col-75">
            <input v-model="nama" type="text">
          </div>
        </div>

        <div class="mb-3">
          <label for="formFile" class="form-label"></label>
        </div>
        
        <br>
        <div class="center_button">
          <input type="submit" @click.prevent=editProduct value="Edit">
        </div>
      </form>
    </div>
      <br><br>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from '../components/Navbar'
import axios from '../../api'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
  name: 'edit barang',
  components: {
    Navbar
  },
  setup () {
    const nama = ref('')
    const { params } = useRoute()
    const router = useRouter()

    onBeforeMount(() => {
      axios({
        url: '/barang/getOneBarang/' + params.id,
        method: 'get',
        headers: { access_token: localStorage.access_token }
      })
      .then(( { data } ) => {
        nama.value = data.nama
      })
      .catch((error) => {
        console.log(error);
      })
    })

    function editProduct() {
      axios({
        url: "/barang/editBarang/" + params.id,
        method: "put",
        data: {
          nama: nama.value,
        },
        headers: { access_token: localStorage.access_token }
      })
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              title: 'Berhasil!',
              text: 'Barang telah di rubah',
              icon: 'success',
              confirmButtonText: 'Ok'
            })
          }

          nama.value = ''
          router.push('/')
        })
        .catch(({ response }) => {
          // console.log(response.data,`ini response`);
          if (response.data.message ===  "You are not authorized") {
            Swal.fire({
                title: 'Oops',
                text: 'Anda dilarang edit',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            
          } else {
            Swal.fire({
                title: 'Oops',
                text: 'Nama Barang harus di isi',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
          }

        })
    }

    return {
      nama,
      editProduct
    }
  }
}
</script>

<style scoped>
.text_small {
  padding-bottom: 1%;
  font-size: 22px;
}

.text_footer {
  padding-top: 1%;
  padding-bottom: 3%;
  font-size: 22px
}

#body {
  /* height: 200px; */
  background-color: lightblue; 
  background-image: linear-gradient(to right, rgb(183,238,242) , rgb(239,255,255));
}

.center_button {
  justify-content: center !important
}

input[type=text], select, textarea {
  width: 75%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  font-size: 20px;
}

input[type=number], select, textarea {
  width: 75%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  font-size: 20px;
}

label {
  padding: 12px 12px 12px 0;
  display: flex;
  margin-left: 5%;
  font-size: 25px;
  color: #12505b;
}

input[type=submit] {
  background-color: #1f94a9;
  font-size: 20px;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  /* float: right; */
}

input[type=submit]:hover {
  background-color: #25b0c9;
}

.container {
  width: 50%;
  border-radius: 5px;
  background-color: rgb(184 232 236);
  padding: 20px;
  margin: auto;
}

.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}

.col-75 {
  float: left;
  width: 75%;
  margin-top: 6px;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

@media screen and (max-width: 600px) {
  .col-25, .col-75, input[type=submit] {
    width: 100%;
    margin-top: 0;
  }
}

</style>
