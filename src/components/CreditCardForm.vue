<template>
  <div id="credit-card-form-wrapper">
    <CreditCard
      v-bind:number="cardNumber"
      v-bind:name="cardName"
      v-bind:month="cardMonth"
      v-bind:year="cardYear"
      v-bind:cvv="cardCvv"
      v-bind:flipped="isCardFlipped"
    >
    </CreditCard>
    <div id="form">
      <div class="input-wrap number">
        <label for="cardNumber">Card Number</label>
        <input
          v-model="cardNumber"
          type="text"
          v-mask="generateCardNumberMask"
          autocomplete="off"
          id="cardNumber"
          data-ref="cardNumber"
        />
      </div>

      <div class="input-wrap name">
        <label for="cardName">Card Holder Name</label>
        <input
          type="text"
          autocomplete="off"
          v-model="cardName"
          id="cardName"
        />
      </div>

      <div class="input-group">
        <div class="input-wrap expiry-month">
          <label for="cardMonth">Expiration Month</label>
          <select v-model="cardMonth" id="cardMonth">
            <option value="" disabled selected>Month</option>
            <option
              v-bind:value="n < 10 ? '0' + n : n"
              v-for="n in 12"
              v-bind:disabled="n < minCardMonth"
              v-bind:key="n"
            >
              {{ 10 > n ? "0" + n : n }}
            </option>
          </select>
        </div>

        <div class="input-wrap expiry-year">
          <label class="hidden" for="cardYear">Expiration Year</label>
          <select v-model="cardYear" id="cardYear">
            <option value="" disabled selected>Year</option>
            <option
              v-bind:value="$index + minCardYear"
              v-for="(n, $index) in 12"
              v-bind:key="n"
            >
              {{ $index + minCardYear }}
            </option>
          </select>
        </div>

        <div class="input-wrap cvv">
          <label for="cvv">CVV</label>
          <input
            id="cvv"
            v-model="cardCvv"
            @focus="isCardFlipped = true"
            @focusout="isCardFlipped = false"
            type="text"
            maxlength="4"
            autocomplete="off"
          />
        </div>
      </div>

      <div class="input-wrap submit">
        <input type="submit" class="button" value="Submit" />
      </div>
    </div>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";
import CreditCard from "./CreditCard";

export default {
  name: "CreditCardForm",
  directives: { mask },
  components: { CreditCard },
  data() {
    return {
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      amexCardMask: "#### ###### #####",
      otherCardMask: "#### #### #### ####",
      minCardYear: new Date().getFullYear(),
      isCardFlipped: false
    };
  },
  computed: {
    minCardMonth() {
      if (this.cardYear === this.minCardYear) {
        return new Date().getMonth() + 1;
      }

      return 1;
    },
    generateCardNumberMask() {
      return this.getCardType === "amex"
        ? this.amexCardMask
        : this.otherCardMask;
    }
  },
  watch: {
    cardYear() {
      if (this.cardMonth < this.minCardMonth) {
        this.cardMonth = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/form";
</style>
