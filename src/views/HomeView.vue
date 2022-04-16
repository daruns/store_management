<template>
  <v-col>
      <v-row>
      <v-col
        v-for="product in products"
        :key="product.id"
        sm="12"
        md="4"
        lg="3"
        xl="2"
      >
      <product
      :product="product"
      @show_product="show_product"
      @show_delete_alert="open_delete_alert(product.id)"
      @show_edit_dialog="open_edit_dialog(product);"
      />
      </v-col>
    </v-row>
      <v-dialog
      v-model="show"
      width="600px"
  >
    <show-product :product="productToShow" @close_dialog="show = false;" />
      </v-dialog>
  </v-col>
</template>

<script>
import product from '../components/product.vue';
import ShowProduct from '../components/ShowProduct.vue';
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return{
      show: false,
    productToShow: {
      name: '',
      description: '',
      logo: ''
    }
    }
  },
  components: {
    product,
    ShowProduct
  },
  computed: {
  ...mapState('productStore', ['products'])
  },
  methods: {
  ...mapActions('productStore', ['getProducts']),
          show_product(product) {
            this.productToShow.name = product.name;
            this.productToShow.description = product.description;
            this.productToShow.logo = product.logo
            this.show = true;
        },
  },
   async mounted() {
      this.loading = true;
      await this.getProducts();
      this.loading = false;
    }
}
</script>

<style>

</style>