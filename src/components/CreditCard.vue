<template>
    
    <div id="credit-card" :class="flipped ? 'flipped' : ''">
        <div class="inner-card">
        
          <!-- Front of card -->
          <div class="front">
            <div class="card-header">
              <div class="chip">
                <img src="../assets/chip.png" alt="chip">
              </div>
              <div class="logo">
                <transition name="item-slide" enter-active-class="animated fadeInDown faster">
                  <img :src="require( '../assets/' + getCardType + '.png' )" :key="getCardType" :class="getCardType" alt="brand">
                </transition>
              </div>
            </div>
            <div class="card-body">
              <label for="cardNumber" class="card-number">
                <template v-if="getCardType === 'amex'">
                 <span v-for="(n, $index) in amexCardMask" :key="$index">
                  <transition name="item-slide" enter-active-class="animated rollIn faster" leave-active-class="animated rollOut faster">
                    <div class="card-item-number-item" v-if="$index > 4 && $index < Credit14 && number.length > $index && n.trim() !== ''">*</div>
                    <div class="card-item-number-item" :class="{ '-active' : n.trim() === '' }" :key="$index" v-else-if="number.length > $index">
                      {{number[$index]}}
                    </div>
                    <div class="card-item-number-item" :class="{ '-active' : n.trim() === '' }" v-else :key="$index + 1">{{n}}</div>
                  </transition>
                </span>
                </template>
                <template v-else>
                <span v-for="(n, $index) in otherCardMask" :key="$index">
                  <transition name="item-slide" enter-active-class="animated rollIn faster" leave-active-class="animated rollOut faster" mode="out-in">
                    <div class="card-item-number-item" v-if="$index > 4 && $index < 15 && number.length > $index && n.trim() !== ''">*</div>
                    <div class="card-item-number-item" :class="{ '-active' : n.trim() === '' }" :key="$index" v-else-if="number.length > $index">
                      {{number[$index]}}
                    </div>
                    <div class="card-item number-item" :class="{ '-active' : n.trim() === '' }" v-else :key="$index + 1">{{n}}</div>
                  </transition>
                </span>
                </template>
              </label>
            </div>
            <div class="card-footer">
              <div class="name">
                <label for="cardName" class="card-item-name">
                  <span class="card-holder-name-label">Card Holder</span>
                  <transition name="item-slide" enter-active-class="animated fadeInDown faster" leave-active-class="animated fadeOutUp faster">
                    <div class="card-item-name card-holder-full-name" v-if="name.length" key="1">
                      <transition-group name="item-slide" enter-active-class="animated fadeInDown faster" leave-active-class="animated fadeOutUp faster">
                        <span class="card-holder-full-name entered" v-for="(n, $index) in name.replace(/\s\s+/g, ' ')" v-bind:key="$index + 1">{{n}}</span>
                      </transition-group>
                    </div>
                    <div class="card-holder-full-name empty" v-else key="2">Full Name</div>
                  </transition>
                </label>
              </div>
              <div class="date">
                <div class="card-date-label">Card Expiry</div>
                <div class="dates-wrapper">
                  <label for="cardMonth" class="card-item-info">
                  <span class="month">
                     <transition name="item-slide" enter-active-class="animated fadeIn faster">
                       <span v-if="month" :key="month">{{ month }}</span>
                       <span v-else :key="month">MM</span>
                     </transition>
                  </span>
                  </label>
                  <span class="separator">/</span>
                  <label for="cardYear" class="card-item-info">
                    <span class="year">
                       <transition name="item-slide" enter-active-class="animated fadeIn faster">
                        <span v-if="year" :key="year">{{ year.slice(-2) }}</span>
                        <span v-else :key="year">YY</span>
                      </transition>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Back of card -->
          <div class="back">
            <div class="strip"></div>
            <label for="cvv" class="cvv-wrapper">
             <span class="cvv-text">
               <span class="cvv-label-text">CVV</span>
                <span class="cvv-num">
                   <transition name="item-slide" enter-active-class="animated fadeInDown faster" leave-active-class="animated fadeOutUp faster">
                     <transition-group name="item-slide" enter-active-class="animated fadeInDown faster" leave-active-class="animated fadeOutUp faster">
                       <span v-for="(n, index) in cvv" :key="index + 1">
                         <span v-if="index > 0" class="astrix" :key="index">*</span>
                         <span v-else class="cvv-number" :key="index">{{ cvv[index] }}</span>
                       </span>
                     </transition-group>
                   </transition>
                </span>
             </span>
            </label>
          </div>
        </div>
      </div>
      
</template>

<script>
  import { mask } from 'vue-the-mask'

  export default {
    name: 'CreditCard',
    directives: {mask},
    props: {
        number : {
            type: [String, Boolean],
            default: false
        },
        name : {
            type: [String, Boolean],
            default: false
        },
        month : {
            type: [String, Boolean],
            default: false
        },
        year : {
           type: [String, Boolean],
           default: false
        },
        cvv : {
            type: [String, Boolean],
            default: false
        },
        flipped : {
            type: Boolean,
            default: false
        }
    },
    data() {
      return {
        minCardYear: new Date().getFullYear(),
        amexCardMask: "#### ###### #####",
        otherCardMask: "#### #### #### ####",
        numberTemp: "",
      };
    },
    computed: {
      getCardType () {
        let number = this.number;
        let re = new RegExp("^4");
        if (number.match(re) != null) {
          return "visa"
        }

        re = new RegExp("^(34|37)");
        if (number.match(re) != null) {
          return "amex"
        }

        re = new RegExp("^5[1-5]");
        if (number.match(re) != null) {
          return "mastercard"
        }

        re = new RegExp("^6011");
        if (number.match(re) != null) {
          return "discover"
        }

        return "visa"; // default type
      },
      minCardMonth () {
        if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
        return 1;
      },
    },
    watch: {
      cardYear () {
        if (this.cardMonth < this.minCardMonth) {
          this.cardMonth = "";
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

  @import "~animate.css";

  @import "../scss/credit-card"

  

</style>
