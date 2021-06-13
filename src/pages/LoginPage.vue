<template>
  <q-page class="flex column">
    <div class="fixed-center q-pa-md">
      <div class="q-gutter-sm">
        <q-input filled v-model="formData.email" dense>
        <template v-slot:prepend>
          <q-icon name="eva-person" />
        </template>
      </q-input>
      <q-input type="password" filled v-model="formData.password" dense>
        <template v-slot:prepend>
          <q-icon name="eva-lock" />
        </template>
      </q-input>
      <div class="q-mt-sm">
        <q-btn no-caps label="Login" color="primary" class="full-width" @click="login"/>
      </div>
      <div class="q-mt-md ">
        <q-btn no-caps label="Login with google" color="secondary" class="full-width" @click="loginGoogle" />
        <q-btn no-caps flat label="Register" color="secondary" class="full-width q-mt-lg" @click="orRegister" />
      </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import {  mapActions, mapGetters } from 'vuex'
import { firebaseAuth , GoogleProvider} from 'boot/firebase'
export default {
  components:{},
  filters: {},
  data() {
    return {
      formData: {
        email:'',
        password:''
      }
    }
  },
  created() {
    // console.log('created',firebaseAuth.currentUser)
  },
  mounted() {},
  beforeDestroy() {},
  computed: {
    ...mapGetters('auth', ['isAuth'])
  },
  methods: {
    ...mapActions('auth', ['loginWithGoogle', 'loginWithEmail']),

    login(){
      this.$q.loading.show()
      this.loginWithEmail(this.formData)
      .then((resp) => {
        this.$q.loading.hide()
        this.$router.replace(
          this.$route.query.redirect || { name: "dashboard" },
          () => {}
        )
      })
      .catch((error) => {
        this.$q.loading.hide()
      });
    },

    loginGoogle() {
      GoogleProvider.addScope('profile');
      GoogleProvider.addScope('email');
      firebaseAuth.signInWithPopup(GoogleProvider)
      .then((result) => {
          var user = result.user.providerData[0];

          let params = {
              displayName: user.displayName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              photoURL: user.photoURL,
              providerId: user.providerId,
              uid: user.uid,
          }
          this.$q.loading.show()
          this.loginWithGoogle(params)
          .then((resp) => {
            this.redirectTo()
            this.$q.loading.hide()
          })
      })
    },

    redirectTo(){
      if (this.isAuth) {
        this.$router.replace(
            this.$route.query.redirect || { name: "dashboard" },
            () => {}
        )
      }
    },
    orRegister(){
      this.$router.replace(
            this.$route.query.redirect || { path: "/register" },
            () => {}
        )
    }
  },
  watch: {
    // token(val) {
    //   console.log(val)
    //   redirectTo()
    // }
  },
}
</script>
