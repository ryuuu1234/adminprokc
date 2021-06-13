<template>
    <div>
        <q-chip color="dark" text-color="white"  size="sm" class="absolute id-lelang">
            {{item.id_lelang}}
        </q-chip>
        <q-img v-if="thumbnail != 'kosong'" :src="urlPath + thumbnail" :ratio="1" />
        <q-img v-else :src="'images/no_image.png'" :ratio="1" />
        
    </div>
</template>

<script>
import * as axios from 'boot/axios'
    export default {
        props:['item'],
        computed: {
            urlPath() {
                return axios.pathImage()
            },

            thumbnail() {
                let data = this.item? this.item.media_lelang: []
                let thumb = [];
                data.map((value, key) => {
                    thumb.push({
                    media: data[key].image,
                    status: data[key].status,
                    video: false,
                    });
                });
                
                
                var where = thumb.filter((obj) =>  {
                    return obj.status === 1
                });
                if (where.length) { 
                    return  where[0]? where[0].media:'kosong'
                } else {
                    return thumb[0]? thumb[0].media:'kosong'
                }
            }
        }

    }
</script>

<style lang="scss" scoped>
.id-lelang {
    z-index:1000;
}
</style>