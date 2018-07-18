<template>
  <div class="fill-height">
    <div id="chat-history" @scroll="scrolled">
      <div class="chat-element" v-for="data in getMessages" :key="data.id">
        <v-layout column>
          <div class="chat-text body-1"><pre>{{data.user}}</pre></div>
          <div class="chat-text subheading"><pre>{{data.message}}</pre></div>
        </v-layout>
      </div>
    </div>
    <div id="chat-bar">
      <v-layout row align-center>
        <v-flex xs10>
          <v-form @submit.prevent="send()">
            <v-text-field
            label="Message"
            auto-grow
            autofocos
            rows="2"
            v-model="message"
            ></v-text-field>
          </v-form>
        </v-flex>
        <v-flex xs2>
          <v-btn color="primary" @click="send()">Send</v-btn>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Top',
  created: function () {
    try {
      var protocol = 'ws'
      if (location.protocol === 'https:') {
        protocol = 'wss'
      }

      var host = location.host

      var ws = new WebSocket(protocol + '://' + host + '/ws')

      ws.onopen = () => {
        ws.send(JSON.stringify({
          user: this.$store.state.name,
          message: this.$store.state.name + ' has joined!'
        }))
      }

      ws.onclose = (err) => {
        alert(err)
        this.$router.push('/')
      }

      const append = msg => {
        this.messages.push(msg)
      }

      ws.onmessage = function (event) {
        var msg = JSON.parse(event.data)

        append(msg)
      }

      this.ws = ws
    } catch (e) {
      alert(e)
      this.$router.push('/')
    }
  },
  methods: {
    scrolled: function () {
      var history = this.$el.querySelector('#chat-history')

      if (history.scrollTop + history.offsetHeight >= history.scrollHeight) {
        this.bottomScrolled = true
      } else {
        this.bottomScrolled = false
      }
    },
    send: function () {
      if (this.message.length === 0) {
        return
      }
      var msg = this.message
      this.message = ''

      this.ws.send(JSON.stringify({
        user: this.$store.state.name,
        message: msg
      }))
      this.bottomScrolled = true
    }
  },
  updated: function () {
    var history = this.$el.querySelector('#chat-history')
    if (history != null && this.bottomScrolled) {
      history.scrollTop = history.scrollHeight
    }
  },
  computed: {
    getMessages: function () {
      var idx = 0
      for (var i of this.messages) {
        i.id = idx
        idx++
      }

      return this.messages
    }
  },
  data () {
    return {
      messages: [],
      message: '',
      ws: null,
      bottomScrolled: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat-text {
  text-align: left;
  overflow-wrap: break-word;
}
.chat-element {
  margin-top: 2px;
  margin-bottom: 2px;
  background-color:rgb(233, 233, 233);
}
#chat-history {
  overflow: scroll;
  height: 100%;
  padding-bottom: 70px;
}
#chat-bar {
  width: 100%;
  position: absolute;
  bottom: 0;
  background: white;
  height: 70px;
}

#all {
  height: 100%;
}
</style>
