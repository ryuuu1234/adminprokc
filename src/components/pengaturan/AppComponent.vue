<template>
    <div>
        <div class="text-bold text-h5">Pengaturan Aplikasi</div>
        <div class="row q-gutter-lg q-pt-md">
            <div class="col">
                <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
                    <q-input
                        ref="name"
                        filled
                        dense
                        v-model="name"
                        label="Nama App"
                        hide-bottom-space
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                    />
                    <q-input
                        ref="alamat"
                        filled
                        dense
                        v-model="alamat"
                        type="textarea"
                        label="Alamat App"
                        hide-bottom-space
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                    />
                    <q-input
                        ref="no_cs"
                        filled
                        dense
                        v-model="no_cs"
                        label="No Telp Customer Service"
                    />
                    <q-input
                        ref="wa_cs"
                        filled
                        dense
                        v-model="wa_cs"
                        label="No WA Customer Service"
                    />

                    <q-separator />

                    <div class="q-mt-md ">
                        <q-btn type="submit" color="primary" no-caps class="q-mr-md">Simpan Data</q-btn>
                        <q-btn type="reset" color="dark" no-caps>Reset</q-btn>
                    </div>
                </form>
            </div>
            <div class="col">
                <q-btn round icon="fas fa-images" class="absolute depan"  @click="getFile" color="primary" />
                <q-input
                    ref="myFileInput"
                    style="display: none"
                    v-model="icon"
                    type="file"
                    label="Standard"
                    accept="image/*"
                    @input="captureImageFallback"
                />
                <q-img v-if="app.icon ===null || app.icon === ''"
                    :src="'images/no_image.png'"
                    spinner-color="red"
                    style="height: 300px; max-width: 300px"
                />
                <q-img v-else
                    :src="urlPath+app.icon"
                    spinner-color="red"
                    style="height: 300px; max-width: 300px"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
    export default {
        data(){
            return {
               url: 'https://placeimg.com/500/300/nature'
            }
        },

        mounted(){
            this.getApp()
        },

        computed: {
            ...mapGetters('app', ['form', 'urlPath', 'app']),
            name: {
                get(){return this.$store.state.app.form.name},
                set(newVal){return this.$store.commit('app/name', newVal)}
            },
            alamat: {
                get(){return this.$store.state.app.form.alamat},
                set(newVal){return this.$store.commit('app/alamat', newVal)}
            },
            no_cs: {
                get(){return this.$store.state.app.form.no_cs},
                set(newVal){return this.$store.commit('app/no_cs', newVal)}
            },
            wa_cs: {
                get(){return this.$store.state.app.form.wa_cs},
                set(newVal){return this.$store.commit('app/wa_cs', newVal)}
            },
            icon: {
                get(){return this.$store.state.app.icon},
                set(newVal){return this.$store.commit('app/icon', newVal)}
            }
        },

        methods: {
            ...mapActions('app', ['getApp', 'updateData', 'uploadImage']),
            isRequired(val){
                return (!!val || '*Required , Harap diisi')
            },
            onSubmit(){
                this.$refs.name.validate()
                this.$refs.alamat.validate()
                if (this.$refs.name.hasError || this.$refs.alamat.hasError) {
                    this.formHasError = true
                    return
                }
                this.$q.loading.show();

                this.updateData(this.form)
                .then(()=> {
                    this.$q.loading.hide()
                    this.getApp()
                })
                .catch((err)=> {
                    this.$q.loading.hide()
                })
            },

            getFile() {
                this.$refs.myFileInput.$el.click();
            },

            captureImageFallback(file) {
                this.$store.commit('app/icon', file[0])
                this.upLoad(this.icon);
                // console.log(this.file[0])
            },

            upLoad(file) {
                const formData = new FormData();
                formData.append("image", file);
                this.$q.loading.show();
                this.uploadImage(formData)
                .then((resp)=> {
                    this.$q.loading.hide()
                    this.getApp()
                })
                .catch((err)=> {
                    this.$q.loading.hide()
                })

            },

            onReset(){
                this.getApp()
            }

        },

        watch: {
            icon(val){
                console.log('watch', val)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>