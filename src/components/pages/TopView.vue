<template>
  <div>
    <v-btn @click="rugby()">rugby</v-btn>
  </div>
</template>

<script>
export default {
    methods:{
        rugby(){
            this.$router.push({path:"rugby"})
        }
    }
}
</script>

<style>

</style>