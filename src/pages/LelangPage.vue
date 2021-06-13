<template>
  <div class="q-pa-sm">
    <div class="table--x bg-grey-2">
      <q-table
        title="Table Data"
        :data="lelangs"
        :columns="columns"
        row-key="name"
        grid
        hide-header
        :pagination.sync="pagin"
        class="q-pa-sm"
        @request="onRequest"
        :loading="loading"
        :filter="filter"
      >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>

      <template v-slot:top-right>
        
        <q-input filled dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-6 col-sm-6 col-md-2 col-lg-2 grid-style-transition">
          <q-card flat bordered class="my-card">
            <ThumbnailImage :item="props.row" />
            <q-btn
                round 
                color="dark"
                icon="fas fa-hammer"
                class="absolute"
                style="top: 5px; right: 5px; "
                size="xs"
              />
            <q-card-section class="q-mb-none q-pb-none q-pt-xs">
              

              <div class="row no-wrap items-center">
                <div class="col text-h7 text-bold ellipsis" :class="props.row.kategori? 'text-black': 'text-red'">
                  {{props.row.judul?props.row.judul: 'Belum Ada Judul' }}
                </div>
              </div>
            </q-card-section >

            <q-card-section style="margin-top:-15px;">
              <!-- <div class="text-h7 text-orange" >
                id lelang・{{props.row.id_lelang? props.row.id_lelang:'Kosong'}}
              </div> -->
              <div class="text-h7 " :class="props.row.kategori? 'text-black': 'text-red'" >
                Kategori・{{props.row.kategori? props.row.kategori:'Kosong'}}
              </div>
              <div class="f-10 text-grey" style="margin-top:-3px;">
                dibuat・{{props.row.updated_at | formatTanggal}}
              </div>
              <div class="text-h7 text-teal text-right text-bold" >
                Harga Rp・{{ harga(props.row) | formatRp}}
              </div>
              <!-- <div class="text-caption text-grey">
                Small plates, salads & sandwiches in an intimate setting.
              </div> -->
            </q-card-section>

            <q-separator />

            <!-- <q-card-actions>
              <q-btn flat round icon="event" />
              <q-btn flat color="primary">
                Reserve
              </q-btn>
            </q-card-actions> -->
          </q-card>
        </div>
      </template>

      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-accent q-gutter-sm" style="min-height:400px;">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span>
            Well, ... {{ message }}
          </span>
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
        </div>
      </template>
      </q-table>
    </div>
    
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import { formatDistanceToNowStrict, format } from "date-fns";
// import { enGB, id } from "date-fns/locale";
export default {
  components:{
    ThumbnailImage: ()=>import('src/components/ThumbnailImage')
  },
  filters: {
    formatTanggal(value) {
      return format(new Date(value), "dd LLLL yyyy, KK:mm");
    },
    formatRp(value) {
      return ("" + Number(value).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.")
      );
    },
  },
  data() {
    return {
      filter:'',
      status:'All',
      pagin: {
        page:1,
        rowsPerPage:12,
        sortBy:'updated_at',
        descending:true,
        rowsNumber:0
      },

      columns: [
        { name: 'judul', label: 'Judul', field: 'judul', sortable: true },
        { name: 'kategori', label: 'Kategori', field: 'kategori', sortable: true },
        { name: 'berakhir', label: 'Berakhir', field: 'berakhir', sortable: true },
        { name: 'harga_pembuka', label: 'Harga Pembuka', field: 'harga_pembuka', sortable: true },
        { name: 'kelipatan', label: 'Kelipatan', field: 'kelipatan', sortable: true },
      ],

      loading:false
    }
  },
  created() {},
  mounted() {
    // this.onRequest({
    //   pagination: this.pagin,
    //   filter: undefined,
    // })
    this.getLelang()
  },
  beforeDestroy() {},
  computed: {
    ...mapGetters('lelang', ['lelangs', 'meta', 'urlPath'])
  },
  methods: {
    ...mapActions('lelang', ['getAllLelang']),
    getLelang() {
      this.loading = true;
      let sorting = this.pagin.descending ? 'desc' : 'asc';

      let status;
      if (this.status == 'All') {
        status = ''
      } else if (this.status == 'Published' ) {
        status = 1
      } else {
        status = 0
      }
      let params = {
          params: {
              page: this.pagin.page,
              per_page: this.pagin.rowsPerPage,
              q: this.filter,
              sortby: this.pagin.sortBy,
              sorting: sorting,
              status:status
          }
      };

      this.getAllLelang(params)
      .then((resp)=> {
        this.loading = false;
        this.pagin.rowsNumber = resp.total
      })
      .catch((err) => {
        this.loading = false;
      })
    },

    onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter



      this.pagin.rowsNumber = this.getRowsNumberCount(filter)
      this.pagin.rowsPerPage = rowsPerPage
      this.pagin.page = page
      this.pagin.rowsPerPage = rowsPerPage
      this.pagin.sortBy = sortBy
      this.pagin.descending = descending

      // console.log(props.pagination)

      this.getLelang()
    },
    getRowsNumberCount (filter) {
      if (!filter) {
        return this.meta.total
      }
      // let count = 0
      // this.lelangs.forEach((treat) => {
      //   if (treat.kategori.includes(filter)) {
      //     ++count
      //   }
      // })
      // return count
    },

    harga(item){
      let harga=0;
      let harga_pembuka = item.harga_pembuka;
      let bid = item.bid
      let sum = 0;
      for(var i = 0; i < bid.length; i ++) {
        sum += isNaN(bid[i].nominal) ? 0 : parseInt(bid[i].nominal);
      }
      harga = parseInt(harga_pembuka) + parseInt(sum);
      return harga;
    }

    
  },
  watch: {
    pagin(val){
      console.log('watch pagination', val)
    },
    // filter(){
    //   this.getLelang()
    // }
  },
}
</script>
<style lang="scss">
.table--x {
  border: 1px solid rgba(179, 179, 179, .5);
}

.btn--vert {
  // position: absolute;
  top:18px;
  right:0px;
  transform: translateY(-50%);
  
}
</style>
