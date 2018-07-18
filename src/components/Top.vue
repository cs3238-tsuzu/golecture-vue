<template>
<v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="blue-grey lighten-2">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                  <v-text-field  prepend-icon="person" name="login" label="Your Nickname" type="text" v-model="name"></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script scoped>
export default {
  data () {
    this.$store.commit('setName', '')
    return {
      name: ''
    }
  },
  methods: {
    login: function () {
      this.$store.commit('setName', this.name)
      console.log(this.$store.state.name)
      this.$router.push('/chat')
    }
  }
}
</script>
