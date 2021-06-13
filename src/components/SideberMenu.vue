<template>
    <div>
        <q-list >
            <div v-for="(item, i) in menus" :key="'item'+i">
                <q-item clickable v-ripple 
                    :active="isActive === item.url"
                    active-class="bg-blue-grey-1"
                    @click="redirectTo(item.url)"
                >
                    <q-item-section avatar>
                        <q-icon :name="item.icon" size="xs" />
                    </q-item-section>

                    <q-item-section>
                        <span class="text-capitalize">{{item.nama}}</span>
                    </q-item-section>
                </q-item>
                <q-separator />
            </div>
            <q-space />
            <q-item clickable v-ripple 
                @click="signOut"
            >
                <q-item-section avatar>
                    <q-icon name="fas fa-sign-out-alt" size="xs" />
                </q-item-section>

                <q-item-section>
                    <span class="text-capitalize">logout</span>
                </q-item-section>
            </q-item>
        </q-list>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
    export default {
        data() {
            return {
                menus: [
                    {nama:'dashboard', url:'dashboard', icon: 'fas fa-chalkboard'},
                    {nama:'data user', url:'data.user', icon: 'fas fa-user-friends'},
                    {nama:'data lelang', url:'data.lelang', icon: 'fas fa-cash-register'},
                    {nama:'data transaksi', url:'data.transaksi', icon: 'fas fa-exchange-alt'},
                    {nama:'pengaturan', url:'pengaturan', icon: 'fas fa-cog'},
                ]
            }
        },

        computed: {
            ...mapActions('auth', ['logout']),
            isActive() {
                return this.$route.name
            }
        },

        methods: {
            redirectTo(url) {
                this.$router.replace(
                    this.$route.query.redirect || { name: url },
                    () => {}
                )
            },

            signOut(){
                
                this.$emit('click')
            }
        }
    }
</script>

<style lang="scss" scoped>
.my-menu-link {
    color: white;
    background: #F2C037;
}
</style>