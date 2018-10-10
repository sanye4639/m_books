<template>
    <div>
        我的
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {

            }
        },
        watch: {
            '$route' (to, from) {
                if(to.name === 'my'){
                    this.$store.commit('headTitle', '我的');
                }
            }
        },
        mounted:function () {
            this.$store.commit('headTitle', '我的');
        },
        methods : {

        },
    }
</script>

<style scoped>

</style>