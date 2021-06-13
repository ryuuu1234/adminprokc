<template>
  <div class="q-pa-md">
    <div class="table--x bg-grey-2">
      <q-table
        title="Transaksi"
        :data="transactions"
        :columns="columns"
        row-key="id"
        class="q-pa-sm bg-grey-2"
        :pagination.sync="pagin"
        :loading="loading"
        :filter="filter"
        @request="onRequest"
        binary-state-sort
      >
      <template v-slot:top-right>
        
        <q-input filled borderless dense debounce="500" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span>
            Well , ... {{ message }}
          </span>
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
        </div>
      </template>

      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <div>
            <q-badge :color="colorClass(props.value)" :label="props.value" />
          </div>
        </q-td>
      </template>


    </q-table>
    </div>

    <div class="widget-transaksi q-mt-md">
      <div class="row">
        <div v-for="(item, i) in widgets" :key="'item'+i" class="q-pa-xs col-xs-6 col-sm-6 col-md-3 col-lg-3 grid-style-transition">
          <q-card :class="['my-card', 'border-'+i, 'bg-grey-2']" @click="filter=item.name">
            <q-card-section>
              <div class="row">
                <div :class="['col', 'text-h6', 'txt-'+i ]">
                  {{item.name}} 
                  <div class="text-bold text-h4 q-mt-sm">{{getCount(item.name)}}</div>
                </div>
                <div class="col text-right text-h6 self-center">
                  <q-icon :name="item.icon" size="md" :color="colorClass(item.name)" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import { formatDistanceToNowStrict, format } from "date-fns";
export default {
  components:{},
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
      pagin: {
        page:1,
        rowsPerPage:5,
        sortBy:'updated_at',
        descending:true,
        rowsNumber:0
      },

      columns: [
        { name: 'invoice', label: 'INVOICE', align: 'left', field: 'invoice', sortable: false, classes: 'bg-white ellipsis', headerClasses: 'bg-primary text-white' },
        { name: 'jenis', label: 'JENIS TRANSAKSI', field: 'jenis', sortable: false },
        { name: 'created_at', label: 'TANGGAL', field: 'updated_at', sortable: false, format: val => format(new Date(val), "dd LLLL yyyy, KK:mm") },
        { name: 'status', label: 'STATUS', align: 'right', field: 'status', sortable: false },
        { name: 'nominal', label: 'NOMINAL', align: 'right', field: 'nominal', sortable: false, format: val => Number(val).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.")  },
      ],

      loading:false,
      widgets: [
        {name:"pending", classB:"border-1", icon:"fas fa-clock"},
        {name:"settlement", classB:"border-2", icon:"fas fa-check-circle"},
        {name:"expire", classB:"border-3", icon:"fas fa-exclamation-triangle"},
        {name:"failed", classB:"border-4", icon:"fas fa-times-circle"},
      ],
    }
  },
  created() {},
  mounted() {
    // get initial data from server (1st page)
    this.onRequest({
      pagination: this.pagin,
      filter: undefined
    })
  },
  beforeDestroy() {},
  computed: {
    ...mapGetters('transaksi', ['transactions', 'meta','pending', 'settlement', 'expire', 'failed'])
  },
  methods: {
    ...mapActions('transaksi', ['getAllTrans']),
    getTrans() {
      this.loading = true;
      let sorting = this.pagin.descending ? 'desc' : 'asc';
      let params = {
          params: {
              page: this.pagin.page,
              per_page: this.pagin.rowsPerPage,
              q: this.filter,
              sortby: this.pagin.sortBy,
              sorting: sorting,
          }
      };

      this.getAllTrans(params)
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

      this.getTrans()
    },
    getRowsNumberCount (filter) {
      if (!filter) {
        return this.meta.total
      }
    },

    colorClass(value){
      if (value === 'pending') {
        return 'warning'
      }else if (value === 'settlement') {
        return 'accent'
      } else if (value === 'expire'){
        return 'negative'
      } else {
        return 'dark'
      }
    },

    getCount(value){
      if (value === 'pending') {
        return this.pending
      }else if (value === 'settlement') {
        return this.settlement
      } else if (value === 'expire'){
        return this.expire
      } else {
        return this.failed
      }
    }
  },
  watch: {},
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

// .my-card {
//   padding:20px;
// }
.border-0 {
  border-left: 4px solid $warning;
}
.border-1 {
  border-left: 4px solid $accent;
}
.border-2 {
  border-left: 4px solid $negative;
}
.border-3 {
  border-left: 4px solid $dark;
}

.txt-0{ color:$warning;}
.txt-1{ color:$accent;}
.txt-2{ color:$negative;}
.txt-3{ color:$dark;}
</style>
