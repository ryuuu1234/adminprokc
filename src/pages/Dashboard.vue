<template>
  <div class="q-pa-md">
      <WidgetDashboard />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  components:{
    WidgetDashboard: () => import('src/components/WidgetDashboard.vue')
  },
  filters: {},
  data() {
    return {

    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  computed: {},
  methods: {
    ...mapActions('auth', ['logout']),
    logoutUser() {
      this.$q.loading.show()
      this.logout()
      .then(() => {
        this.$q.loading.hide()
        this.$router.replace(
            this.$route.query.redirect || { name: "login" },
            () => {}
        )
      })
      .catch(() => {this.$q.loading.hide()})
    }
  },
  watch: {},
}
</script>
<style lang="scss" scoped>
.pagenya {
  min-width: 100%;
  background: white;
}

</style>
