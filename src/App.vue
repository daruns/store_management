<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-btn :to="!$route.path.includes('admin') ? '/admin' : '/'">{{ !$route.path.includes('admin') ? 'Go to Admin panel' : 'Go to Home page'}}</v-btn>
      </div>
    </v-app-bar>

    <v-main class="mt-6 pr-10 pl-10">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
