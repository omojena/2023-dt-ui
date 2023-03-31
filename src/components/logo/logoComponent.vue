<template>
    <div :class="logoClass">
        <img :src="logo" alt="">
    </div>
</template>

<script>
    import logo from '../../assets/img/Grupo 12@2x.png';

    export default {
        name: "logoComponent",
        data() {
            return {
                logo,
            }
        },
        props: {
            logoClass: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped lang="scss">
    .login {
        width: 165.96px;
        height: 32.66px;
    }

    .nav-logo {
        margin-left: 40px;
        width: 129.42px;
        height: 25.47px;
    }
</style>
