<template>
  <q-page class="flex column">
    <div class="fixed-center">
      <q-input
      ref="name"
      dense
        filled
        v-model="formData.name"
        label="Your name *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || '']"
      />

      <q-input
        dense
        filled
        ref="email"
        v-model="formData.email"
        label="Your Email *"
        lazy-rules
        :rules="[val => !!val || '', isValidEmail]"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
      />

       <q-input
       ref="password"
        dense
        filled
        v-model="formData.password"
        type="password"
        label="Your Password *"
        lazy-rules
        :rules="[val => !!val || '']"
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
      />
      <q-input
      ref="passwordC"
        dense
        filled
        v-model="passwordC"
        type="password"
        label="Confirm Password *"
        lazy-rules
        :rules="[val => !!val || '', isSame]"
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
      />

      <div>
      <q-btn label="Register"  color="primary" @click="onSubmit"/>
      </div>
    </div>
  </q-page>
</template>

<script>
import { firebaseAuth , GoogleProvider} from 'boot/firebase'
import { mapActions } from 'vuex'
export default {
  components:{},
  filters: {},
  data() {
    return {
      formData: {
        email:'',
        password:'',
        name:'',
        roles: 'admin'
      },
      
      passwordC:'',
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  computed: {},
  methods: {
    ...mapActions('auth', ['registerFirebase', 'registerToServer']),

    onSubmit(){
      this.validateForm()
      this.$q.loading.show()
      this.registerToServer(this.formData)
      .then(()=> {
        this.$q.loading.hide()
        this.$router.replace(
          this.$route.query.redirect || { path: "/verification_email" },
          () => {}
        )

      }).catch((err)=> {
        console.log(err)
        this.$q.loading.hide()
      })

      
    },

    validateForm(){
      if (this.formData.name === '' || this.formData.name === null || this.formData.name === undefined) {
        return this.$refs.name.validate()
      }
      if (this.formData.email === '' || !this.isValidEmail) {
        return this.$refs.email.validate()
      }
      if (this.formData.password === '' || this.formData.password === null) {
        return this.$refs.password.validate()
      }

      if (this.passwordC !== this.formData.password ||!this.isSame) {
        return this.$refs.passwordC.validate()
      }
    },

    onReset () {
      this.formData.name = ''
      this.formData.email = ''
      this.formData.name = ''
    },

    isValidEmail (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || '';
    },
    isSame (val) {
     return val === this.formData.password? true : false
    },
  },
  watch: {},
}
</script>
<style lang="scss" scoped>
.q-field__bottom.row.items-start.q-field__bottom--animated {
  padding-top: 0px !important;
}

</style>