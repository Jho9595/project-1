<template>
  <div>
    <Navbar/>

    <div class="m-4">
      <div class="container center_div col-4" >
        <form class="d-flex" style="justify-content: center">
          <button class="btn btn-outline-success m-1" @click.prevent=addProduct >Add Barang</button>
        </form>
      </div>
    </div>


    <div class="container1 table-responsive">
      <table class="table table-striped table-bordered  table-hover ">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Nama Barang</th>
            <th scope="col">Pemilik</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody v-for="(item, idx) in barang" :key="idx">
          <tr>
            <th>{{ idx + 1 }}</th>
            <td>{{ item.nama }}</td>
            <td>{{ item.user }}</td>
            <td>
            <button class="btn btn-outline-info m-1" @click.prevent=editProduct(item._id) >
              Edit
            </button>
          <button class="btn btn-outline-danger m-1" @click.prevent=deleteProduct(item._id,item.name)>
            Delete
          </button>
            </td>
          </tr>
          
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import { ref, onBeforeMount,  } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar'
import axios from '../../api'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
  name: 'Home',
  components: {
    Navbar
  },
  setup () {
    const barang = ref([])
    const router = useRouter()
    // const {
    //   params: { id }
    // } = useRoute()

    onBeforeMount(() => {
      getAllBarang()
    })

    function getAllBarang () {
      axios({
        url: '/barang/getAll',
        method: 'get',
        headers: { access_token: localStorage.access_token }
      })
      .then(( { data } ) => {
        barang.value = data
      })
      .catch((error) => {
        console.log(error);
      })
    }

    function addProduct () {
      router.push('/addBarang')
    }

    function editProduct (id) {
      router.push('/editBarang/' + id)
    }

    function deleteProduct (id, name) {
      Swal.fire({
        title: 'Are you sure?',
        text: `You want to delete product "${name}" ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios({
            url: '/barang/deleteBarang/' + id,
            method: 'delete',
            headers: { access_token: localStorage.access_token }
          })
          .then(() => {
            Swal.fire(
              'Deleted!',
              'Your product has been deleted.',
              'success'
            )

            getAllBarang()
          })
          .catch((error) => {
            Swal.fire({
              title: 'Oops',
              text: 'Anda dilarang hapus barang ini',
              icon: 'error',
              confirmButtonText: 'Ok'
          })
          })

        }
      })
    }

    return {
      barang,
      addProduct,
      editProduct,
      deleteProduct,
    }
  }
}
</script>

<style scoped>
.table {
  margin: auto;
  /* width: 100% !important;  */
}

.container1 {
  width: 80%;
  padding-top: 3%;
  /* justify-content: center;
   */
  margin: auto;
}

table th {
   text-align: center; 
}
</style>
