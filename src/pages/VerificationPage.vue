<template>
  <q-page class="flex column">
    <div class="fixed-center q-pa-md" style="width:300px;">
      <div class="info q-mb-md">
        Masukkan Kode yang terkirim pada Email Anda
      </div>
      <div class="q-gutter-sm">
        <q-input filled v-model="code" dense label="Kode" />
        <div class="q-mt-lg">
          <q-btn no-caps label="Verified" color="primary" class="full-width" @click="verifikasi"/>
        </div>
        <div class="q-mt-sm  text-center">
          Belum Ada Email?
          <q-btn no-caps label="Kirim Email Lagi" color="secondary" class="full-width" @click="sendAgain"/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { firebaseAuth } from 'src/boot/firebase';
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
  components:{},
  filters: {},
  data() {
    return {
      code:'',
    }
  },
  created() {},
  mounted() {
    this.sendEmail()
  },
  beforeDestroy() {},
  computed: {
    ...mapGetters('auth', ['temp_email','otp'])
  },
  methods: {
    ...mapActions('auth', ['sendMail', 'updateStatus']),
    sendEmail() {
      this.$q.loading.show();
      let params = {
        params:{
          email:this.temp_email
        }
      };
      this.sendMail(params)
      .then(()=>{
        this.$q.loading.hide();
      })
      .catch((err)=> {
        this.$q.loading.hide();
      })
    },
    sendAgain(){
      this.sendEmail()
    },
    verifikasi(){
      if (this.code != this.otp) {
        this.$q.notify({
          message: 'Kode Yang Anda masukkan tidak valid'
        });
        return
      }
      this.$q.loading.show()
      let params = {
        params:{
          email:this.temp_email
        }
      };
      this.updateStatus(params)
      .then((resp)=> {
        this.$q.loading.hide()
        this.$router.replace(
          this.$route.query.redirect || { path: "/auth" },
          () => {}
        )
      })
      .catch((err)=> {
        this.$q.loading.hide()
      })
      
    }
  },
  watch: {
    temp_email(val){
      console.log(val)
    }
  },
}
</script>

<style lang="scss" scoped>
.info {
  background-color: rgba(218, 0, 0, 0.08);
  // max-width: 200px;
  padding: 10px;
  font-size:10px;
  color:grey;
}
</style>
