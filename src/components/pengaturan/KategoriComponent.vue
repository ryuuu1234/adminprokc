<template>
    <div>
        <div class="text-h5 text-bold">Pengaturan Kategori</div>
        <div class="table--x bg-rey-2 q-mt-lg">
            <q-table
                title="Kategori"
                :data="kategories"
                :columns="columns"
                :pagination.sync="pagin"
                row-key="id"
                class="q-pa-sm bg-grey-2"
                :loading="loading"
                :filter="filter"
                @request="onRequest"
                binary-state-sort
                selection="multiple"
                :selected.sync="selected"
            >
            <template v-slot:top>
                <q-btn round class="q-mr-sm" color="negative" size="sm" icon="fas fa-trash" padding="sm" :disable="selected.length === 0" @click="removeRow" />
                <q-btn round size="sm" color="primary" :disable="loading" icon="fas fa-plus" padding="sm" @click="addRow" />
                <q-space />
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

            

            <!-- <template v-slot:body-selection="scope">
                <q-tr :scope="scope">
                    <q-td key="name" :scope="scope">
                        <q-checkbox dense v-model="scope.selected" />
                    </q-td>
                </q-tr>
            </template> -->

            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td key="id" :props="props">
                        <q-checkbox dense v-model="props.selected" />
                    </q-td>
                    <q-td key="name" :props="props">
                        {{ props.row.name }}
                        <q-popup-edit v-model="props.row.name">
                            <q-input v-model="name" dense autofocus @keyup.enter="edit(props.row.id)"  />
                        </q-popup-edit>
                    </q-td>
                </q-tr>
            </template>


            </q-table>
        </div>
        <q-dialog v-model="prompt" persistent>
            <q-card style="min-width: 350px">
                <q-card-section>
                <div class="text-h6">Your address</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-input  dense v-model="name" autofocus @keyup.enter="prompt = false" />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" v-close-popup />
                <q-btn flat label="Add address" v-close-popup @click="addName" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import { formatDistanceToNowStrict, format } from "date-fns";
    export default {
        data() {
            return {
                filter: '',
                selected:[],
                loading:false,
                pagin: {
                    page:1,
                    rowsPerPage:5,
                    sortBy:'updated_at',
                    descending:true,
                    rowsNumber:0
                },
                columns: [
                    { name: 'name', label: 'NAMA', align: 'left', field: 'name', sortable: false, classes: 'bg-white ellipsis', headerClasses: 'bg-primary text-white' },
                    { name: 'updated_at', label: 'DIEDIT TGL', field: 'updated_at', sortable: false, format: val => format(new Date(val), "dd LLLL yyyy, KK:mm") },
                    
                    { name: 'id', label: 'Options', field: 'id',  align: 'center', sortable: false,  },
                    
                ],
                prompt:false,
                name:'',
                ids:[]
            }
        },
        mounted() {
            this.onRequest({
                pagination: this.pagin,
                filter: undefined
            })
        },
        computed: {
            ...mapGetters('kategori', ['kategories', 'meta']),
        },
        methods: {
            ...mapActions('kategori', ['getKategories', 'addKategories', 'removeKategories', 'updKategories', 'edit']),
            getData() {
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

                this.getKategories(params)
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

                this.getData()
            },

            getRowsNumberCount (filter) {
                if (!filter) {
                    return this.meta.total
                }
            },

            addRow(){
                this.prompt = !this.prompt
            },
            addName() {
                if (this.name === '' || this.name === null) {
                    this.$q.notify({
                        color:'negative',
                        message: "Tidak Ada Kategori yang ditambahkan",
                        position: "bottom-right",
                    });
                    return 
                }

                const formData = new FormData();
                formData.append('name', this.name);

                this.$q.loading.show();
                this.addKategories(formData)
                .then((resp)=> {
                    this.$q.loading.hide()
                    this.getData()
                    this.name=''
                })
                .catch((err)=> {
                    this.$q.loading.hide()
                })

            },

            removeRow(){
                let arr = this.selected
                let temp = [];
                for (let i = 0; i < arr.length; i++) {
                    let id = arr[i].id
                    temp.push(id)
                }
                this.ids = temp;
                console.log(this.ids)

                const params = {'id': this.ids}
                this.$q.loading.show()

                this.removeKategories(params)
                .then((resp)=> {
                    this.$q.loading.hide()
                    this.getData()
                    this.name=''
                })
                .catch((err)=> {
                    this.$q.loading.hide()
                })

            },

            edit(id){
                if (this.name === '' || this.name === null) {
                    this.$q.notify({
                        color:'negative',
                        message: "Tidak Ada Kategori yang diubah",
                        position: "bottom-right",
                    });
                    return 
                }
                const params = {'id': id, 'name': this.name}
                this.$q.loading.show()
                this.updKategories(params)
                .then((resp)=> {
                    this.$q.loading.hide()
                    this.getData()
                })
                .catch((resp)=> {
                    this.$q.loading.hide()
                })
            }
        },

        watch: {
            props(val){
                console.log(val)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>