<template>
  <div class="q-pa-sm ">
    <div class="table--x bg-grey-2">
      <q-table
        title="Table Data"
        :data="users"
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

      <template v-slot:top>
        <q-select dense options-dense filled v-model="status" :options="options" style="width:100px" behavior="menu" label="Active?" class="q-mr-xs"/>
        <q-select dense options-dense filled v-model="bidder" :options="options2"  style="width:150px" behavior="menu" label="Bidder?" />
        <q-space />
        <q-input filled dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-6 col-sm-6 col-md-2 col-lg-2 grid-style-transition">
          <q-card>
            <q-card-section class="text-center">
              <q-btn
                flat
                rounded
                color="grey-7"
                icon="fas fa-ellipsis-v"
                class="absolute btn--vert"
                padding="sm"
                size="xs"
              >
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item dense clickable v-close-popup @click="kickBackUser(props.row)">
                    <q-item-section>{{props.row.status == 1? 'Kicked User': 'Activate User'}}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
              </q-btn>
              <q-icon name="fa fa-check-square" :color="props.row.bidder == 1? 'primary': 'negative'" class="absolute active--user" size="xs" />
              <q-avatar
                  size="80px"
                  v-if="props.row.avatar != null && props.row.avatar != undefined" 
                >
                  <q-img
                    :src="getAvatar(props.row.avatar)"
                    style="height: 80px; max-width: 80px"
                  />
                </q-avatar>
              <!-- Ini nanti dikasih Initial Orangnya -->
              <q-avatar v-else size="80px" color="primary" text-color="white">{{ props.row.name | initial }}</q-avatar>
              
              <div class="q-mt-sm text-bold">{{ props.row.name }}</div>
              <div style="font-size:0.7em">{{ props.row.email }}</div>
            </q-card-section>
            <q-separator />
            <q-card-section class="flex flex-center column q-pa-xs" >
              <div style="font-size:1em" class="text-capitalize text-primary">{{ props.row.provinsi? props.row.provinsi: 'provinsi blm ada' }}</div>
              <div style="font-size:0.7em" class="text-capitalize text-dark">{{ props.row.kota? props.row.kota: 'kota belum ada' }}</div>
               <!-- <div class="absolute active-bidder"> -->
                
                  <q-chip  :color="props.row.status == 1? 'primary': 'red'" text-color="white"  size="sm">
                      {{props.row.status | activeTxt}}
                  </q-chip>
                
                
              <!-- </div> -->
            </q-card-section>
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
export default {
  components:{},
  data() {
    return {
      filter:'',
      status:'All',
      bidder:'All',
      options: ['All', 'Active', 'Kicked'],
      options2: ['All', 'Bidder', 'Non Bidder'],
      columns: [
        // {
        //   name: 'desc',
        //   required: true,
        //   label: 'Dessert (100g serving)',
        //   align: 'left',
        //   field: row => row.updated_at,
        //   format: val => `${val}`,
        //   sortable: true
        // },
        { name: 'avatar', align: 'center', label: 'Avatar', field: 'avatar', sortable: true },
        { name: 'name', label: 'Nama', field: 'name', sortable: true },
        { name: 'email', label: 'Email', field: 'email', sortable: true },
        { name: 'provinsi', label: 'Provinsi', field: 'provinsi', sortable: true },
        { name: 'kota', label: 'Kota', field: 'kota', sortable: true },
      ],

      pagin: {
        page:1,
        rowsPerPage:12,
        sortBy:'id',
        descending:true,
        rowsNumber:0
      },

      loading:false

    }
  },
  created() {},
  mounted() {
    this.getUsers()
  },
  beforeDestroy() {},

  filters: {
    initial(value) {
      if (value) return value.substring(0, 1);
      else return "G";
    },
    bidderTxt(value) {
      return value ==1? 'bidder': 'Non Bidder'
    },
    activeTxt(value) {
      return value == 1? 'Active': 'Kicked'
    }
  },

  computed: {
    ...mapGetters('user', ['users', 'meta', 'urlPath'])
  },
  methods: {
    ...mapActions('user', ['getAllUser', 'changeStatusUser']),
    getUsers() {
      this.loading = true;
      let sorting = this.pagin.descending ? 'desc' : 'asc';

      let status;
      if (this.status == 'All') {
        status = ''
      } else if (this.status == 'Active' ) {
        status = 1
      } else {
        status = 0
      }

      let bidder ;
      if (this.bidder == 'All') {
        bidder = ''
      } else if (this.bidder == 'Bidder' ) {
        bidder = 1
      } else {
        bidder = 0
      }


      let params = {
          params: {
              page: this.pagin.page,
              per_page: this.pagin.rowsPerPage,
              q: this.filter,
              sortby: this.pagin.sortBy,
              sorting: sorting,
              status: status,
              bidder: bidder,
          }
      };

      this.getAllUser(params)
      .then((resp)=> {
        this.loading = false;
        this.pagin.rowsNumber = resp.total
      })
      .catch((err) => {
        this.loading = false;
      })
      
    },

    kickBackUser(user){
      // console.log(user)
      this.changeStatusUser(user.id)
      .then(() => {
        this.onRequest({
          pagination: this.pagin,
          filter: undefined,
        })
      })
    },

    onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter
      const status = props.status
      const bidder = props.bidder



      this.pagin.rowsNumber = this.getRowsNumberCount(filter)
      this.pagin.rowsPerPage = rowsPerPage
      this.pagin.page = page
      this.pagin.rowsPerPage = rowsPerPage
      this.pagin.sortBy = sortBy
      this.pagin.descending = descending

      // console.log(props.pagination)

      this.getUsers()
    },

    getRowsNumberCount (filter) {
      if (!filter) {
        return this.meta.total
      }
      let count = 0
      this.users.forEach((treat) => {
        if (treat.name.includes(filter)) {
          ++count
        }
      })
      return count
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
  },
  watch: {
    meta(val) {
      console.log('watch',val)
    },
    pagin(val){
      console.log('watch pagination', val)
    },
    status(val){
      this.onRequest({
        pagination: this.pagin,
        filter: undefined,
        status: val,
      })
    },
    bidder(val){
      this.onRequest({
        pagination: this.pagin,
        filter: undefined,
        bidder: val
      })
    }
  }
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

.active-bidder {
  top: -13px;
  left: 0px;
  // transform: translateY(-50%);
  // transform: translateX(100%);
}

.active--user {
  top: 5px;
  left: 5px;
  // transform: translateY(-50%);
  // transform: translateX(100%);
}
</style>
