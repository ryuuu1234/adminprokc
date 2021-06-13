<template>
  <div class="">
    <div class="row">
      <div class="col-2">
        <q-tabs
          v-model="tab"
          vertical
          align="left"
          class="text-dark bg-grey-2 "
          active-bg-color="blue-10"
          active-color="white"
        >
          <q-tab no-caps v-for="(item, i) in tabs" :key="i" :name="item.name" style="justify-content:initial">
            <div class="align-left"> <q-icon name="fas fa-cog" class="q-mr-md"/> <span>{{item.name}}</span> </div>
          </q-tab>
        </q-tabs>
      </div>
      <div class="col-10 full-height">
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="app">
            <AppComponent />
          </q-tab-panel>

          <q-tab-panel name="kategori">
            <KategoriComponent />
          </q-tab-panel>

          
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
  components:{
    MenuPengaturan: ()=>import('src/components/MenuPengaturan.vue'),
    AppComponent: ()=>import('src/components/pengaturan/AppComponent.vue'),
    KategoriComponent: ()=>import('src/components/pengaturan/KategoriComponent.vue'),
  },
  filters: {},
  data() {
    return {
      tab:'app',
      tabs:[
        {name:'app', label:'Data App', icon:'fas fa-cog'},
        {name:'kategori', label:'Data Kategori', icon:'fas fa-cog'},
      ]
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  computed: {},
  methods: {},
  watch: {
    tab(val){
      console.log(val)
    }
  },
}
</script>
