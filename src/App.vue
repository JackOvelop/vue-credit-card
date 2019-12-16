<template>
  <div id="app">
    <CreditCardForm/>
  </div>
</template>

<script>
import CreditCardForm from './components/CreditCardForm.vue'

export default {
  name: 'app',
  components: {
    CreditCardForm
  }
}
</script>

<style lang="scss">

  @import './scss/layout';

</style>
