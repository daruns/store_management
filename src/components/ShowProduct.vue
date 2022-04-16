<template>
  <v-card>
        <v-card-title>
          <span class="text-h5">{{product.name}}</span>
        </v-card-title>
        <v-img contain height="300px" :src="product.logo ? product.logo : 'https://waterfountain.no/wp-content/uploads/2019/11/placeholder.png'"></v-img>
        <v-card-text class="mt-3">
            <p>
              {{product.description}}
            </p>
        </v-card-text>
        <v-card-actions class="sticky-position primary bottom">
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            @click="$emit('close_dialog')"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card> 
</template>
<script>
export default {
  props: ['product'],
  mounted() {
    console.log(this.product)
  }
}
</script>
<style scoped>
.sticky-position {
    position: sticky !important;
}

.bottom {
    bottom: 0 !important
}
</style>