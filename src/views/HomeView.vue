<template>
  <div class="h-100 w-100">
      <b-row>
        <b-col cols="6" class="overflow-hidden mx-auto">
          <div class="container">
            <b-button variant="link" class="text-white position-absolute" style="bottom: 0px; left: 0px" @click="debug = !debug">Debug</b-button>
            <div class="machine-glass">
              <machine style="padding: 0px 30px" :debug="debug" :n="5" :radius="50"></machine>
            </div>
          </div>
        </b-col>
        <b-col class="bg-primary text-white">
          <div v-if="$store.getters['ethereum/ready']">
            <div class="container mt-2">
            <connect></connect>
            <h2 class="display-5">1 GACHA = <b-badge variant="info" class="text-white" style="border: solid 5px white">{{amount}} {{currency}}</b-badge></h2>
            <br>
              <b-row>
                <b-col>
                  <h2>Common</h2>
                  <!-- <small>Worth 0.85 </small><br> -->
                  <small>75/100</small>
                  <br>
                  <capsule style="z-index: 2" rarity="common" display="true"></capsule>
                </b-col>
                <b-col>
                  <h2>Rare</h2>
                  <!-- <small>Worth 5 </small><br> -->
                  <small>20/100</small>
                  <br>
                  <capsule style="z-index: 2" rarity="rare" display="true"></capsule>
                </b-col>
                <b-col>
                  <h2>Epic</h2>
                  <!-- <small>Worth >20 </small><br> -->
                  <small>5/100</small>
                  <br>
                  <capsule style="z-index: 2" rarity="epic" display="true"></capsule>
                </b-col>
              </b-row>
              <b-row class="mx-auto">
                <b-button class="display-5 mx-auto mt-4 text-white" @click="buy">Insert Coin</b-button>
              </b-row>
                <b-modal id="modal-1" :title="`You've won a ${prize['rarity']} prize 🎉`" v-if="prize">
                  <div class="text-center">
                  <capsule style="z-index: 2" :rarity="prize.rarity" display="true"></capsule>
                  <br>
                  <b-button :href="prize.tx">Check it out!</b-button>
                  </div>
                </b-modal>
            </div>
          </div>
          <div v-else>
            <br>
            <connect></connect>
          </div>
        </b-col>
      </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Capsule from '@/components/Capsule.vue'
import Machine from '@/components/Machine.vue'
import { BIcon, BIconGithub} from 'bootstrap-vue'
import Connect from '@/components/Connect.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    Capsule,
    Machine,
    BIcon, 
    BIconGithub,
    Connect
  },
  data(){
    return {
      debug: false,
      prize: null
    }
  },
  methods: {
    buy(){
      let vue = this;
      this.$store.dispatch('buy').then((prize) => {
        debugger
        console.log("Prize", JSON.stringify(prize))
        vue.prize = prize
        vue.$bvModal.show("modal-1")
      }).catch(err => {
        this.$bvToast.toast(err['message'], {
            variant: "danger",
            title: "Error"
        })
      })
    }
  },
  computed: {
    currency(){
      return this.$store.state.networks.find(x => x.name.toLowerCase() == this.$store.state.ethereum.network.toLowerCase()).currency
    },
    amount(){
      return this.$store.state.networks.find(x => x.name.toLowerCase() == this.$store.state.ethereum.network.toLowerCase()).price
    }

  }
}
</script>
<style lang="scss" scoped>
  .knob {
    border-radius: 100%;
    min-height: 300px;
  }
  .machine-controls {
      border: solid 10px;
      border-radius: 10% / 50%;
  }
  .machine-glass {
      border: solid 10px;
      border-radius: 10% / 50%;
      background-color: rgba(255, 255, 255, 0.25);
  }
  .machine-top {
    height: 10%;
    width: 50%;
    border: solid 10px;
    min-height: 50px;
    border-radius: 30px 30px 0px 0px;
    border-bottom: 0;
    background-color:--secondary;
    margin: 0px auto;
  }
</style>