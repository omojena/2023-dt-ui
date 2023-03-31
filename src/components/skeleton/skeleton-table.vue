<template>
  <section>

    <b-skeleton width="15%" size="is-large" animated></b-skeleton>
    <b-skeleton class="mt-5" size="is-large" width="35%" animated></b-skeleton>
    <b-skeleton class="mt-5" size="is-large" v-for="_ in 'qwertyuiop'" :key="_" animated></b-skeleton>
    <div class="is-flex">
      <div>
        <b-skeleton width="15%" size="is-medium" animated></b-skeleton>
      </div>
      <div class="is-flex">
        <b-skeleton width="5%" size="is-medium" animated></b-skeleton>
        <b-skeleton width="5%" size="is-medium" animated></b-skeleton>
      </div>
    </div>


  </section>
</template>

<script>
export default {
  name: "skeleton-table"
}
</script>

<style scoped>

</style>