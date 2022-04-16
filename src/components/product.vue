<template>
    <v-card
        outlined
        tile
    >
    <v-card-title class="d-flex title justify-space-between align-center">
        <p class="mb-0 title-text" style="width: 80%">{{product.name}}</p>
        <global-menu v-if="this.$route.path.includes('admin')" @delete="$emit('show_delete_alert', product.id)" @edit="$emit('show_edit_dialog', product)"/>
    </v-card-title>
    <v-img 
    contain
    height="150px" 
    :src="product.logo ? product.logo : 'https://waterfountain.no/wp-content/uploads/2019/11/placeholder.png'">
    </v-img>
    <v-card-text class="content pt-5"><p class="content-text mb-0">{{product.description}}</p></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            fab
            outlined
            x-small
            @click="$emit('show_product', product)"
          >
            <v-icon dark>
                mdi-eye
            </v-icon>
          </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
import GlobalMenu from './GlobalMenu.vue'
export default {
    props: ['product'],
    components: {
      GlobalMenu
    },
}
</script>
<style scoped>
.content {
    height: 165px !important;
    max-height: 165px !important;
    min-height: 165px !important;
}

.content-text {
    display: -webkit-box;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
    overflow: hidden
}

.title-text {
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
}
</style>