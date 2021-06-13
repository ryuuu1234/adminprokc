<template>
    <q-tabs
          v-model="tab"
          vertical
          class="text-teal bg-grey-2"
        >
          <q-tab v-for="(item, i) in tabs" :key="i" :name="item[i]" label="Mails" />
    </q-tabs>
</template>

<script>
    export default {
        props:['tab', 'tabs']
    }
</script>

<style lang="scss" scoped>

</style>