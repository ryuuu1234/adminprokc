<template>
    <div class="row q-gutter-sm">

        <!-- data user -->
        <!-- <div v-for="(item, i) in widgets" :key="'item'+i"> -->
          <div v-for="(item, i) in widgets" :key="'item'+i" class="col">
            <q-card
              class="my-card text-white" :class="item.class"
            >
              <q-card-section>
                <div class="column text-center">
                  <div class="">
                    <q-icon :name="item.icon" size="lg" />
                  </div>
                  <div class="">
                    <span class="text-subtitle2">{{item.title}}</span>
                  </div>
                </div>
                
              </q-card-section>
              <q-separator dark />
              <q-card-section class="q-pa-sm text-center">
                <div class="text-h4 text-bold">{{item.count}}</div>
              </q-card-section>
            </q-card>
          </div>
        <!-- </div> -->
      

        <!-- data bidder -->
      <!-- <div class="col">
        <q-card
          class="my-card text-white gradient3"
        >
          <q-card-section>
            <div class="row">
              <div class="col-auto q-mr-xs">
                <q-icon name="fas fa-users-cog" size="lg" />
              </div>
              <div class="col">
                <span class="text-subtitle2 q-ml-sm">Keanggotaan</span>
              </div>
            </div>
            
          </q-card-section>
          <q-separator dark />
          <q-card-section class="q-pt-none">
            <div class="text-h4 text-bold">{{widget.jml_bidder}}</div>
          </q-card-section>
        </q-card>
      </div> -->

      <!-- data lelang -->
      <!-- <div class="col">
         <q-card
          class="my-card text-white gradient2"
        >
          <q-card-section>
            <div class="row">
              <div class="col-auto q-mr-xs">
                <q-icon name="fas fa-box-open" size="lg" />
              </div>
              <div class="col">
                <span class="text-subtitle2 q-ml-sm">Lelang</span>
              </div>
            </div>
            
          </q-card-section>
          <q-separator dark />
          <q-card-section class="q-pt-none">
            <div class="text-h4 text-bold">{{widget.jml_lelang}}</div>
          </q-card-section>
        </q-card>
      </div> -->

      <!-- data transaction -->
      <!-- <div class="col">
         <q-card
          class="my-card text-white gradient4"
        >
          <q-card-section>
            <div class="row">
              <div class="col-auto q-mr-xs">
                <q-icon name="fas fa-hands-helping" size="lg" />
              </div>
              <div class="col">
                <span class="text-subtitle2 q-ml-sm">Transaksi</span>
              </div>
            </div>
            
          </q-card-section>
          <q-separator dark />
          <q-card-section class="q-pt-none">
            <div class="text-h4 text-bold">{{widget.jml_transaksi}}</div>
          </q-card-section>
        </q-card>

        {{widgets}}
      </div> -->

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
    export default {
        data() {
          return {
            
          }
        },
        mounted() {
            this.getWidget()
        },
        computed: {
            ...mapGetters('dashboard', ['widget']),
            widgets() {
              let data = [];
              data.push(
                {title:'User Terdaftar', icon:'fas fa-user-friends', class:'gradient1', count: this.widget.jml_user },
                {title:'User Bidder', icon:'fas fa-users-cog', class:'gradient2', count: this.widget.jml_bidder },
                {title:'Lelang', icon:'fas fa-cash-register', class:'gradient3', count: this.widget.jml_lelang },
                {title:'Transaksi', icon:'fas fa-exchange-alt', class:'gradient4', count: this.widget.jml_transaksi },
              );

              return data;
            }
        },
        methods: {
            ...mapActions('dashboard', ['getWidget'])
        }
    }
</script>

<style lang="scss" scoped>

.gradient1 {
  background: #c31432;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #240b36, #c31432);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #240b36, #c31432); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

.gradient2 {
  background: #FDC830;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #F37335, #FDC830);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #F37335, #FDC830); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
.gradient3 {
  background: #00B4DB;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #0083B0, #00B4DB);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #0083B0, #00B4DB); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.gradient4 {
  background: #0f0c29;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #24243e, #302b63, #0f0c29); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
</style>