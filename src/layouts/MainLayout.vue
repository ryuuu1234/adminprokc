<template>
    <q-layout view="hHh Lpr lff" >
      <q-header reveal bordered class="bg-blue-grey-9">
        <q-toolbar >
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title class="text-capitalize text-subtitle1" >{{title}}</q-toolbar-title>
          <q-space />
          
          <q-btn flat round dense icon="fas fa-bell" />
          <q-btn flat round dense icon="fas fa-comments"  />
          <q-avatar class="q-ml-sm"
              size="35px"
              v-if="user.avatar != null && user.avatar != undefined" 
            >
              <q-img
                :src="getAvatar(user.avatar)"
                style="height: 35px; max-width: 35px"
              />
          </q-avatar>
          <q-avatar v-else size="35px" color="positive" class="q-ml-sm">{{ initial }}</q-avatar>
        </q-toolbar>
          <q-space />
        
      </q-header>

      <!-- sidemenu Left -->
      <q-drawer
        v-model="drawer"
        show-if-above

        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        :width="250"
        :breakpoint="500"
        bordered
        content-class="bg-blue-grey-8 text-white"
      >
        <q-scroll-area class="fit">
          <SidebarMenu @click="signOut" />
        </q-scroll-area>
      </q-drawer>

      <!-- Banner -->
      
      <q-page-container class="">
        <q-page >
          <transition
            appear
            enter-active-class="animated fadeInLeft"
            leave-active-class="animated fadeOutRight"
          >
            <router-view />
          </transition>

          <!-- <q-page-sticky position="top" expand class="bg-grey-6 q-py-xs">
            <q-toolbar class="col">
              <q-btn flat round dense icon="far fa-file" size="sm" />
              <q-toolbar-title><span class="text-capitalize text-subtitle1"> {{title}} </span></q-toolbar-title>
            </q-toolbar>
            <q-toolbar class="col">
              <q-space />
                <span class="q-mr-sm">{{user.name}}</span>
                 <q-avatar
                  size="40px"
                  v-if="user.avatar != null && user.avatar != undefined" 
                >
                  <q-img
                    :src="getAvatar(user.avatar)"
                    style="height: 40px; max-width: 40px"
                  />
                </q-avatar>
              <q-avatar v-else size="40px">{{ initial }}</q-avatar>
            </q-toolbar>
          </q-page-sticky> -->
        </q-page>
        <!-- place QPageScroller at end of page -->
        <q-page-scroller position="bottom-right" :scroll-offset="50" :offset="[18, 18]">
          <q-btn padding="sm" fab icon="keyboard_arrow_up" color="black" />
        </q-page-scroller>
      </q-page-container>

      
    </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {

  components: {
    SidebarMenu: () => import('src/components/SideberMenu.vue')
  },
  data () {
    return {
      drawer: false,
      miniState: true
    }
  },

  mounted() {
    this.ifNotAuth()
  },

  computed: {
    ...mapGetters('auth', ['isAuth', 'user']),
    title() {
      console.log('route', this.$route)
      return this.$route.name
    },
    initial() {
      if (this.user.name) return this.user.name.substring(0, 1);
      else return "G";
    },
  },

  methods: {
    ...mapActions('auth', ['getUser', 'logout']),
    ifNotAuth() {
      if (!this.isAuth) {
          this.$router.replace(
            this.$route.query.redirect || { name: "login" },
            () => {}
          )
      } else {
        this.getUser()
      }
     
    },

    getAvatar(avatar) {
      var fields = avatar.split('/');
      var look = fields[0];

      if (look === 'images') {
        return this.urlPath + avatar
      } else {
        return avatar
      }
      // console.log('avatar', look)
    },

    signOut() {
      this.$q.loading.show()
      this.logout()
      .then(()=> {
          this.$router.replace(
              this.$route.query.redirect || { name: 'login' },
              () => {}
          )
          this.$q.loading.hide()
      })
    }
  },

  watch: {
    user(val) {
      console.log('user', val)
    }
  }
}
</script>