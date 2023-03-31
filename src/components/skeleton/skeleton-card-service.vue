<template>
  <section>
    <div class="is-flex is-align-items-center is-justify-content-space-between mt-4">
    <b-skeleton height="150px" width="90%" size="is-large" v-for="_ in 'qwer'" :key="_" animated></b-skeleton>
  </div>
  <div class="is-flex is-align-items-center is-justify-content-space-between mt-4">
    <b-skeleton width="25%"  size="is-large" animated></b-skeleton>
    <b-skeleton width="25%"  size="is-large" animated></b-skeleton>
    <b-skeleton width="25%"  size="is-large" animated></b-skeleton>
    <b-skeleton width="10%"  size="is-large" animated></b-skeleton>
    <b-skeleton width="10%"  size="is-large" animated></b-skeleton>
  </div>
  </section>

</template>

<script>
export default {
  name: "skeleton-card-service"
}
</script>

<style scoped>

</style>