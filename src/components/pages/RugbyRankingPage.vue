<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        <v-icon icon="mdi-rugby" />
        JAPAN Rugby Player Statistics - datairoro
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-card>
        <v-tabs v-model="tab">
          <v-tab value="select">
            Select
          </v-tab>
          <v-tab value="ranking">
            Ranking
          </v-tab>
          <v-tab value="player">
            player
          </v-tab>
        </v-tabs>
        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="select">
              <select-view @get-button="clickbutton"/>
            </v-window-item>
            <v-window-item value="ranking">
              <player-ranking-view :params="params" @cellClick="cellClick"/>
            </v-window-item>
            <v-window-item value="player">
              <player-statistics-view :playerID="playerID" :playerName="playerName"/>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
  import SelectView from '@/components/template/RugbySelectView.vue'
  import PlayerRankingView from '@/components/template/PlayerRankingView.vue'
  import PlayerStatisticsView from '@/components/template/PlayerStatisticsView.vue'

export default{
  components:{
    "select-view":SelectView,
    "player-ranking-view":PlayerRankingView,
    "player-statistics-view":PlayerStatisticsView,
  },
  data(){
    return{
      tab:"select",
      params: {},
      playerID: 0,
      playerName: "",
    }
  },
  mounted(){
    if(this.$route.query.tab === "ranking"){
      this.params = this.$route.query;
      this.tab = "ranking";
    }else if(this.$route.query.tab === "player"){
      this.playerID = this.$route.query.playerID;
      this.playerName = this.$route.query.playerID;
      this.tab = "player";
    }else{
      this.tab = "select";
    }
  },
  methods:{
    /**
     * selectViewで取得ボタン押下時イベント
     */
    clickbutton(value){
      this.params = value,
      this.nextTab();
    },
    cellClick(value){
      this.playerID = value.playerID;
      this.playerName = value.playername;
      
      this.nextTab();
    },
    nextTab(){
      if(this.tab === "select"){
        this.tab = "ranking";
      }else{
        this.tab = "player";
      }
    }
  }
}
</script>
