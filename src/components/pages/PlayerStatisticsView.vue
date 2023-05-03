<template>
  <v-container>
    <v-row align-content="center">
      <v-col align="center">
        <share-buttons :networks="networks" :sharing="sharing"> </share-buttons>
        
        <section id="profile">
          <div class="text-h2">{{name}}</div>
          初出場：{{ firstPlayed }}({{firstTeam}}) 、最終出場 {{ lastPlayed }}({{lastTeam}})<br/>
          所属チーム:{{ teams.join() }}<br />
          登録名:{{ names.join() }}<br />
        </section>
          
        <section id="totalling">
          <div class="text-h5">大会種別</div>
          <v-table density>
            <thead>
              <th> 種類</th>
              <th> 大会</th>
              <th> 出場</th>
              <th> 得点</th>
              <th> T</th>
              <th> G</th>
              <th> PG</th>
              <th> DG</th>
            </thead>
            <tbody>
              <tr v-for="tournament in tournaments" :key="tournament.key">
                <td>{{tournament.typename}}</td>
                <td>{{tournament.div}}</td>
                <td>{{tournament[RUGBY_PLAYER_COLUMN.PLAYED]}}</td>
                <td>{{tournament[RUGBY_PLAYER_COLUMN.SCORE]}}</td>
                <td>{{tournament[RUGBY_PLAYER_COLUMN.TRY]}}</td>
                <td>{{tournament[RUGBY_PLAYER_COLUMN.GOAL]}}</td>
                <td>{{tournament[RUGBY_PLAYER_COLUMN.PG]}}</td>
                <td>{{tournament[RUGBY_PLAYER_COLUMN.DG]}}</td>
              </tr>
            </tbody>
          </v-table>
          <div class="text-h5">リーグ別</div>
          <v-table density>
            <thead>
              <th> 種類</th>
              <th> 大会</th>
              <th> 出場</th>
              <th> 得点</th>
              <th> T</th>
              <th> G</th>
              <th> PG</th>
              <th> DG</th>
            </thead>
            <tbody>
              <tr v-for="tournament in leagues" :key="tournament.key">
                <td>{{tournament.typename}}</td>
                <td>{{tournament.div}}</td>
                <td>{{tournament[RUGBY_PLAYER_COLUMN.PLAYED]}}</td>
                <td>{{tournament[RUGBY_PLAYER_COLUMN.SCORE]}}</td>
                <td>{{tournament[RUGBY_PLAYER_COLUMN.TRY]}}</td>
                <td>{{tournament[RUGBY_PLAYER_COLUMN.GOAL]}}</td>
                <td>{{tournament[RUGBY_PLAYER_COLUMN.PG]}}</td>
                <td>{{tournament[RUGBY_PLAYER_COLUMN.DG]}}</td>
              </tr>
            </tbody>
          </v-table>
          <div class="text-h5">シーズン別</div>
          <v-table density>
            <thead>
              <th> シーズン</th>
              <th> 大会</th>
              <th> チーム</th>
              <th> 出場</th>
              <th> 得点</th>
              <th> T</th>
              <th> G</th>
              <th> PG</th>
              <th> DG</th>
            </thead>
            <tbody>
              <tr v-for="tournament in seasons" :key="tournament.key">
                <td>{{tournament.season}}</td>
                <td>{{tournament.section}}</td>
                <td>{{tournament.team}}</td>
                <td>{{tournament[RUGBY_PLAYER_COLUMN.PLAYED]}}</td>
                <td>{{tournament[RUGBY_PLAYER_COLUMN.SCORE]}}</td>
                <td>{{tournament[RUGBY_PLAYER_COLUMN.TRY]}}</td>
                <td>{{tournament[RUGBY_PLAYER_COLUMN.GOAL]}}</td>
                <td>{{tournament[RUGBY_PLAYER_COLUMN.PG]}}</td>
                <td>{{tournament[RUGBY_PLAYER_COLUMN.DG]}}</td>
              </tr>
            </tbody>
          </v-table>
        </section>
        <player-statistics-table :rows="rows"></player-statistics-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PlayerStatisticsTable from '@/components/template/PlayerStatisticsTable';
import ShareButtons from '@/components/organisms/ShareButtons.vue'
import DatabaseAccess from "@/js/DatabaseAccess.js";

import { RUGBY_PLAYER_COLUMN } from '@/js/const.js'

export default {
  components:{
    "share-buttons":ShareButtons,
    "player-statistics-table":PlayerStatisticsTable
  },
  computed:{
    RUGBY_PLAYER_COLUMN(){
      return RUGBY_PLAYER_COLUMN;
    }
  },
  data(){
    return{
      rows:[],
      profile:[],
      cap: {},
      name:"",
      firstPlayed:"",
      firstTeam: "",
      lastPlayed:"",
      lastTeam: "",
      teams:[],
      names:[],

      tournaments:[],
      leagues:[],
      seasons:[],

      sharing: {
        url: 'https://news.vuejs.org/issues/180',
        title: 'JAPAN RUGBY Player Stats - datairoro',
        description: '',
        quote: '',
        hashtags: 'rugbyjp,ラグビー',
        twitterUser: 'iroro_sports'
      },
      networks: [
        { network: 'twitter', name: 'Twitter', icon: 'fab fah fa-lg fa-twitter', color: '#1da1f2' },
        { network: 'facebook', name: 'Facebook', icon: 'fab fah fa-lg fa-facebook-f', color: '#1877f2' },
        { network: 'line', name: 'Line', icon: 'fab fah fa-lg fa-line', color: '#00c300' },
        { network: 'wordpress', name: 'Wordpress', icon: 'fab fah fa-lg fa-wordpress', color: '#21759b' },
        { network: 'evernote', name: 'Evernote', icon: 'fab fah fa-lg fa-evernote', color: '#2dbe60' },
        { network: 'email', name: 'Email', icon: 'far fah fa-lg fa-envelope', color: '#333333' },
      ]

    }
  },
  mounted(){
    this.name = this.$route.query.playerName;
    this.getData(this.$route.query.playerID);
    this.sharing.title = `JAPAN RUGBY Player Stats(${this.name}) - datairoro`;
    this.sharing.description = `日本ラグビー通算選手成績（${this.name}） - datairoro`
    this.sharing.quote = `日本ラグビー通算選手成績（${this.name}） - datairoro`
    this.sharing.url = location.href
  },
  methods:{
    async getData(playerId){
      [this.profile, this.cap, this.rows] = await DatabaseAccess.getPlayerStatisticsData(playerId);

      this.firstPlayed = this.profile["first_played"]["date"];
      this.firstTeam = this.profile["first_played"]["team"];
      this.lastPlayed = this.profile["last_played"]["date"];
      this.lastTeam = this.profile["last_played"]["team"];
      this.teams = this.profile.team;
      this.names = this.profile.name;

      if(this.name === undefined){
        this.name = this.rows[this.rows.length - 1 ]["name"];
      }
      this.calcCups();
      this.calcLeagues();
      this.calcSeason();
    },
    createTournamentObject(name, obj){
      const sort = ["TL", "TLC", "TL/TLC", "TCL", "TL/TCL", "Div1", "Div2", "Div3", "Div1/2", "Div2/3","日本選手権W"];
      
      let playedCnt = 0;
      let scoreCnt = 0;
      let tryCnt = 0
      let goalCnt = 0;
      let pgCnt = 0;
      let dgCnt = 0;
      
      for(const key of sort){
        if(key in obj){
          this.tournaments.push({
            typename: name,
            div: key,
            played: obj[key][RUGBY_PLAYER_COLUMN[RUGBY_PLAYER_COLUMN.PLAYED]],
            score: obj[key][RUGBY_PLAYER_COLUMN.SCORE],
            try: obj[key][RUGBY_PLAYER_COLUMN.TRY],
            goal: obj[key][RUGBY_PLAYER_COLUMN.GOAL],
            pg: obj[key][RUGBY_PLAYER_COLUMN.PG],
            dg: obj[key][RUGBY_PLAYER_COLUMN.DG],
          })
          playedCnt += obj[key][RUGBY_PLAYER_COLUMN.PLAYED];
          scoreCnt += obj[key][RUGBY_PLAYER_COLUMN.SCORE];
          tryCnt += obj[key][RUGBY_PLAYER_COLUMN.TRY];
          goalCnt += obj[key][RUGBY_PLAYER_COLUMN.GOAL];
          pgCnt += obj[key][RUGBY_PLAYER_COLUMN.PG];
          dgCnt += obj[key][RUGBY_PLAYER_COLUMN.DG];
          
        }
      }

      this.tournaments.push({
        typename: name,
        div: "計",
        played: playedCnt,
        score: scoreCnt,
        try: tryCnt,
        goal: goalCnt,
        pg: pgCnt,
        dg: dgCnt,
      })
    },
    calcCups(){
      this.tournaments = []

      // リーグ this.cap.caps_league
      let typeName = "リーグ";
      this.createTournamentObject(typeName, this.cap.league);
      // プレーオフ
      typeName = "PO";
      this.createTournamentObject(typeName, this.cap.po);
      // 入替戦
      typeName = "入替";
      this.createTournamentObject(typeName, this.cap.change);
      // カップ
      typeName = "カップ";
      this.createTournamentObject(typeName, this.cap.cup);
      // プレシーズン
      typeName = "プレシーズン";
      this.createTournamentObject(typeName, this.cap.preseason);
      // 下部リーグ
      typeName = "下部";
      this.createTournamentObject(typeName, this.cap.under);
      // その他
      typeName = "他";
      this.createTournamentObject(typeName, this.cap.other);
    },
    createLeagueObject(name, div){
      let playedCnt = 0;
      let scoreCnt = 0;
      let tryCnt = 0
      let goalCnt = 0;
      let pgCnt = 0;
      let dgCnt = 0;
      const sort = {"league":"リーグ", "under":"リーグ", "po":"PO",
      "change":"入替", "cup":"カップ", "preseason":"プレ"};
      
      console.log("test", name)
      for(const key of Object.keys(sort)){
        for(const d of div){
          if(d in this.cap[key]){
            
            this.leagues.push({
              typename: d,
              div: sort[key],
              played: this.cap[key][d][RUGBY_PLAYER_COLUMN.PLAYED],
              score: this.cap[key][d][RUGBY_PLAYER_COLUMN.SCORE],
              try: this.cap[key][d][RUGBY_PLAYER_COLUMN.TRY],
              goal: this.cap[key][d][RUGBY_PLAYER_COLUMN.GOAL],
              pg: this.cap[key][d][RUGBY_PLAYER_COLUMN.PG],
              dg: this.cap[key][d][RUGBY_PLAYER_COLUMN.DG],
            })
            console.log(d)
            playedCnt += this.cap[key][d][RUGBY_PLAYER_COLUMN.PLAYED];
            scoreCnt += this.cap[key][d][RUGBY_PLAYER_COLUMN.SCORE];
            tryCnt += this.cap[key][d][RUGBY_PLAYER_COLUMN.TRY];
            goalCnt += this.cap[key][d][RUGBY_PLAYER_COLUMN.GOAL];
            pgCnt += this.cap[key][d][RUGBY_PLAYER_COLUMN.PG];
            dgCnt += this.cap[key][d][RUGBY_PLAYER_COLUMN.DG];
            
          }
        }
      }

      this.leagues.push({
        typename: name,
        div: "計",
        played: playedCnt,
        score: scoreCnt,
        try: tryCnt,
        goal: goalCnt,
        pg: pgCnt,
        dg: dgCnt,
      })
    },
    calcLeagues(){
      this.leagues = []
      // リーグワン
      let div = ["Div1", "Div2", "Div3", "Div1/2", "Div2/3"];
      let typeName = "LO"
      this.createLeagueObject(typeName, div);

      // トップリーグ
      typeName = "TL"
      div = ["TL"];
      this.createLeagueObject(typeName, div);

      typeName = "TLC"
      div = ["TLC", "TL/TLC"];
      this.createLeagueObject(typeName, div);

      typeName = "TCL"
      div = ["TCL", "TL/TCL"];
      this.createLeagueObject(typeName, div);
    },
    createSeasonObject(){

    },
    calcSeason(){

      let tmpSeason = this.rows[0][RUGBY_PLAYER_COLUMN.SEASON];
      let tmpDivision = this.rows[0][RUGBY_PLAYER_COLUMN.DIVISION];
      let tmpSection = this.rows[0][RUGBY_PLAYER_COLUMN.SECTION];
      let tmpTeam = this.rows[0][RUGBY_PLAYER_COLUMN.TEAM];
      let playedCnt = this.rows[0][RUGBY_PLAYER_COLUMN.PLAYED];
      let scoreCnt = this.rows[0][RUGBY_PLAYER_COLUMN.SCORE];
      let tryCnt = this.rows[0][RUGBY_PLAYER_COLUMN.TRY];
      let goalCnt = this.rows[0][RUGBY_PLAYER_COLUMN.GOAL];
      let pgCnt = this.rows[0][RUGBY_PLAYER_COLUMN.PG];
      let dgCnt = this.rows[0][RUGBY_PLAYER_COLUMN.DG];

      let playedSeasonCnt = this.rows[0][RUGBY_PLAYER_COLUMN.PLAYED];
      let scoreSeasonCnt = this.rows[0][RUGBY_PLAYER_COLUMN.SCORE];
      let trySeasonCnt = this.rows[0][RUGBY_PLAYER_COLUMN.TRY];
      let goalSeasonCnt = this.rows[0][RUGBY_PLAYER_COLUMN.GOAL];
      let pgSeasonCnt = this.rows[0][RUGBY_PLAYER_COLUMN.PG];
      let dgSeasonCnt = this.rows[0][RUGBY_PLAYER_COLUMN.DG];

      for(let i = 1; i<this.rows.length; i++){
        if(tmpSeason === this.rows[i][RUGBY_PLAYER_COLUMN.SEASON]){
          if(tmpDivision === this.rows[i][RUGBY_PLAYER_COLUMN.DIVISION]){
            if(tmpSection === this.rows[i][RUGBY_PLAYER_COLUMN.SECTION]){
              if(tmpTeam === this.rows[i][RUGBY_PLAYER_COLUMN.TEAM]){

                playedCnt += this.rows[i][RUGBY_PLAYER_COLUMN.PLAYED];
                scoreCnt += this.rows[i][RUGBY_PLAYER_COLUMN.SCORE];
                tryCnt += this.rows[i][RUGBY_PLAYER_COLUMN.TRY];
                goalCnt += this.rows[i][RUGBY_PLAYER_COLUMN.GOAL];
                pgCnt += this.rows[i][RUGBY_PLAYER_COLUMN.PG];
                dgCnt += this.rows[i][RUGBY_PLAYER_COLUMN.DG];
                playedSeasonCnt += this.rows[i][RUGBY_PLAYER_COLUMN.PLAYED];
                scoreSeasonCnt += this.rows[i][RUGBY_PLAYER_COLUMN.SCORE];
                trySeasonCnt += this.rows[i][RUGBY_PLAYER_COLUMN.TRY];
                goalSeasonCnt += this.rows[i][RUGBY_PLAYER_COLUMN.GOAL];
                pgSeasonCnt += this.rows[i][RUGBY_PLAYER_COLUMN.PG];
                dgSeasonCnt += this.rows[i][RUGBY_PLAYER_COLUMN.DG];
              }else{
                // teamがかわった
                this.seasons.push({
                  season: tmpSeason,
                  section: tmpSection,
                  team: tmpTeam,
                  played: playedCnt,
                  score: scoreCnt,
                  try: tryCnt,
                  goal: goalCnt,
                  pg: pgCnt,
                  dg: dgCnt,
                })
                playedCnt = this.rows[i][RUGBY_PLAYER_COLUMN.PLAYED];
                scoreCnt = this.rows[i][RUGBY_PLAYER_COLUMN.SCORE];
                tryCnt = this.rows[i][RUGBY_PLAYER_COLUMN.TRY];
                goalCnt = this.rows[i][RUGBY_PLAYER_COLUMN.GOAL];
                pgCnt = this.rows[i][RUGBY_PLAYER_COLUMN.PG];
                dgCnt = this.rows[i][RUGBY_PLAYER_COLUMN.DG];
                tmpTeam = this.rows[i][RUGBY_PLAYER_COLUMN.TEAM];
                playedSeasonCnt += this.rows[i][RUGBY_PLAYER_COLUMN.PLAYED];
                scoreSeasonCnt += this.rows[i][RUGBY_PLAYER_COLUMN.SCORE];
                trySeasonCnt += this.rows[i][RUGBY_PLAYER_COLUMN.TRY];
                goalSeasonCnt += this.rows[i][RUGBY_PLAYER_COLUMN.GOAL];
                pgSeasonCnt += this.rows[i][RUGBY_PLAYER_COLUMN.PG];
                dgSeasonCnt += this.rows[i][RUGBY_PLAYER_COLUMN.DG];
              }
            }else{
              // sectionがかわった
              this.seasons.push({
                  season: tmpSeason,
                  section: tmpSection,
                  team: tmpTeam,
                  played: playedCnt,
                  score: scoreCnt,
                  try: tryCnt,
                  goal: goalCnt,
                  pg: pgCnt,
                  dg: dgCnt,
                })
                playedCnt = this.rows[i][RUGBY_PLAYER_COLUMN.PLAYED];
                scoreCnt = this.rows[i][RUGBY_PLAYER_COLUMN.SCORE];
                tryCnt = this.rows[i][RUGBY_PLAYER_COLUMN.TRY];
                goalCnt = this.rows[i][RUGBY_PLAYER_COLUMN.GOAL];
                pgCnt = this.rows[i][RUGBY_PLAYER_COLUMN.PG];
                dgCnt = this.rows[i][RUGBY_PLAYER_COLUMN.DG];
                tmpSection = this.rows[i][RUGBY_PLAYER_COLUMN.SECTION];
                tmpTeam = this.rows[i][RUGBY_PLAYER_COLUMN.TEAM];
                playedSeasonCnt += this.rows[i][RUGBY_PLAYER_COLUMN.PLAYED];
                scoreSeasonCnt += this.rows[i][RUGBY_PLAYER_COLUMN.SCORE];
                trySeasonCnt += this.rows[i][RUGBY_PLAYER_COLUMN.TRY];
                goalSeasonCnt += this.rows[i][RUGBY_PLAYER_COLUMN.GOAL];
                pgSeasonCnt += this.rows[i][RUGBY_PLAYER_COLUMN.PG];
                dgSeasonCnt += this.rows[i][RUGBY_PLAYER_COLUMN.DG];
            }
          }else{
            // divisionが分かった
            this.seasons.push({
                  season: tmpSeason,
                  section: tmpSection,
                  team: tmpTeam,
                  played: playedCnt,
                  score: scoreCnt,
                  try: tryCnt,
                  goal: goalCnt,
                  pg: pgCnt,
                  dg: dgCnt,
                })
            playedCnt = this.rows[i][RUGBY_PLAYER_COLUMN.PLAYED];
            scoreCnt = this.rows[i][RUGBY_PLAYER_COLUMN.SCORE];
            tryCnt = this.rows[i][RUGBY_PLAYER_COLUMN.TRY];
            goalCnt = this.rows[i][RUGBY_PLAYER_COLUMN.GOAL];
            pgCnt = this.rows[i][RUGBY_PLAYER_COLUMN.PG];
            dgCnt = this.rows[i][RUGBY_PLAYER_COLUMN.DG];
            tmpDivision = this.rows[i][RUGBY_PLAYER_COLUMN.DIVISION];
            tmpSection = this.rows[i][RUGBY_PLAYER_COLUMN.SECTION];
            tmpTeam = this.rows[i][RUGBY_PLAYER_COLUMN.TEAM];
            playedSeasonCnt += this.rows[i][RUGBY_PLAYER_COLUMN.PLAYED];
            scoreSeasonCnt += this.rows[i][RUGBY_PLAYER_COLUMN.SCORE];
            trySeasonCnt += this.rows[i][RUGBY_PLAYER_COLUMN.TRY];
            goalSeasonCnt += this.rows[i][RUGBY_PLAYER_COLUMN.GOAL];
            pgSeasonCnt += this.rows[i][RUGBY_PLAYER_COLUMN.PG];
            dgSeasonCnt += this.rows[i][RUGBY_PLAYER_COLUMN.DG];
          }
        }else{
          // divisionが分かった
          this.seasons.push({
            season: tmpSeason,
            section: tmpSection,
            team: tmpTeam,
            played: playedCnt,
            score: scoreCnt,
            try: tryCnt,
            goal: goalCnt,
            pg: pgCnt,
            dg: dgCnt,
          })
          this.seasons.push({
            season: tmpSeason,
            section: "合計",
            team: "",
            played: playedSeasonCnt,
            score: scoreSeasonCnt,
            try: trySeasonCnt,
            goal: goalSeasonCnt,
            pg: pgSeasonCnt,
            dg: dgSeasonCnt,
          })
          playedCnt = this.rows[i][RUGBY_PLAYER_COLUMN.PLAYED];
          scoreCnt = this.rows[i][RUGBY_PLAYER_COLUMN.SCORE];
          tryCnt = this.rows[i][RUGBY_PLAYER_COLUMN.TRY];
          goalCnt = this.rows[i][RUGBY_PLAYER_COLUMN.GOAL];
          pgCnt = this.rows[i][RUGBY_PLAYER_COLUMN.PG];
          dgCnt = this.rows[i][RUGBY_PLAYER_COLUMN.DG];
          playedSeasonCnt = this.rows[i][RUGBY_PLAYER_COLUMN.PLAYED];
          scoreSeasonCnt = this.rows[i][RUGBY_PLAYER_COLUMN.SCORE];
          trySeasonCnt = this.rows[i][RUGBY_PLAYER_COLUMN.TRY];
          goalSeasonCnt = this.rows[i][RUGBY_PLAYER_COLUMN.GOAL];
          pgSeasonCnt = this.rows[i][RUGBY_PLAYER_COLUMN.PG];
          dgSeasonCnt = this.rows[i][RUGBY_PLAYER_COLUMN.DG];
          tmpSeason = this.rows[i][RUGBY_PLAYER_COLUMN.SEASON];
          tmpDivision = this.rows[i][RUGBY_PLAYER_COLUMN.DIVISION];
          tmpSection = this.rows[i][RUGBY_PLAYER_COLUMN.SECTION];
          tmpTeam = this.rows[i][RUGBY_PLAYER_COLUMN.TEAM];
        }
      }

      this.seasons.push({
        season: tmpSeason,
        section: tmpSection,
        team: tmpTeam,
        played: playedCnt,
        score: scoreCnt,
        try: tryCnt,
        goal: goalCnt,
        pg: pgCnt,
        dg: dgCnt,
      })
      this.seasons.push({
        season: tmpSeason,
        section: "合計",
        team: "",
        played: playedSeasonCnt,
        score: scoreSeasonCnt,
        try: trySeasonCnt,
        goal: goalSeasonCnt,
        pg: pgSeasonCnt,
        dg: dgSeasonCnt,
      })
    }
  }
}
</script>

<style>
</style>