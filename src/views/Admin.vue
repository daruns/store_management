<template>
<div>
  <global-header module="Products" @click_event="action='create'; open = true; dialog = true;" title="Products" :items="breadcrumps" />
        <div class="d-flex flex-column align-center">
          <v-progress-linear
            color="primary"
            indeterminate
            rounded
            height="3"
            v-if="loading && products.length === 0"
          ></v-progress-linear>
      <div v-if="!loading && products.length === 0" class="d-flex flex-column align-center">
       <p class="mb-0">No products are available!</p>
       <v-btn text rounded @click="action='create'; open = true; dialog = true;" class="text-capitalize mt-2" color="primary">
         Create product
       </v-btn>
        </div>
   </div>
  <div class="mt-6">
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
      @show_delete_alert="open_delete_alert"
      @show_edit_dialog="open_edit_dialog"
      />
      </v-col>
    </v-row>
  </div>
      <v-dialog
      v-model="show"
      width="600px"
  >
    <show-product :product="productToShow" @close_dialog="show = false;" />
      </v-dialog>
    <v-dialog
      v-model="dialog"
      width="600px"
  >
  <global-dialog-content :action="action" title="product" @submit="submit" @close_dialog="clear(); dialog = false;">
    <template v-slot:dialog-content>
        <v-form
        ref="form"
        class="form"
        v-model="valid"
        lazy-validation
       >
      <v-text-field
        v-model="product.name"
        ref="name"
        label="Name *"
        outlined
        dense
        :rules="nameRules"
         required
      ></v-text-field>
      <v-text-field
        v-model="product.logo"
        label="Image URL"
        outlined
        dense
      ></v-text-field>
      <v-textarea
          v-model="product.description"
          ref="description"
          outlined
          class="mt-6"
          label="Description *"
          :rules="descriptionRules"
          required
      ></v-textarea>
        </v-form>
    </template>
  </global-dialog-content>
  </v-dialog>
    <v-dialog
      v-model="show"
      width="600px"
  >
  </v-dialog>
    <v-dialog
      v-model="delete_alert"
      width="350px"
  >
   <global-delete-alert @close="delete_alert = false;" @submit="deleteProduct(id); delete_alert = false;" />
    </v-dialog>
</div>
</template>
<script>
import product from '../components/product.vue';
import GlobalHeader from '../components/GlobalHeader.vue';
import GlobalDialogContent from '../components/GlobalDialogContent.vue';
import ShowProduct from '../components/ShowProduct.vue';
import GlobalDeleteAlert from '../components/GlobalDeleteAlert.vue';
import { mapState, mapActions } from 'vuex';
export default{
    data() {
        return {
        breadcrumps: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'products',
          disabled: true,
          href: 'products',
        },
      ],
      dialog: false,
      show: false,
      delete_alert: false,
      loading: false,
      id: null,
      valid: true,
      action: 'add',
      dataURI: null,
      open: true,
      product: {
        name: '',
        logo: '',
        description: ''
      },
      productToShow: {
        name: '',
        logo: '',
        description: ''
      },
      nameRules:[
        v => !!v || 'Name is required!',
      ],
      descriptionRules: 
       [
        v => !!v || 'Description is required!',
       ]
      }
    },
    computed: {
      ...mapState('productStore', ['products'])
    },
    components: {
      product,
      GlobalHeader,
      GlobalDialogContent,
      GlobalDeleteAlert,
      ShowProduct
    },
    watch: {
        dialog: {
            deep: true,
            async handler(val) {
                if(!val)
                this.clear()
            }
        }
    },
    methods: {
      ...mapActions('productStore', ['getProducts', 'createProduct', 'updateProduct', 'deleteProduct']),
       async submit() {
          await this.$refs.form.validate();
          if(this.valid) {
            this.dialog = false;

            if(this.action === 'create'){
            await this.createProduct(this.product);
            }else{
            await this.updateProduct({id: this.id, body: this.product});
            }
          }
        },
        show_product(product) {
            this.productToShow.name = product.name;
            this.productToShow.description = product.description;
            this.productToShow.logo = product.logo;
            this.show = true;

        },
        open_edit_dialog(product) {
            this.action = 'edit';
            this.id = product.id;
            this.product.name = product.name;
            this.product.logo = product.logo;
            this.product.description = product.description;
            this.open = true;
            this.dialog = true;
        },
         open_delete_alert(id) {
            this.id = id;
            this.delete_alert = true;
        },
        clear() {
            this.product.name = '';
            this.product.description = '';
            this.product.logo = ''
        }
    },
    async mounted() {
      this.loading = true;
      await this.getProducts();
      this.loading = false;
    }
}
</script>

