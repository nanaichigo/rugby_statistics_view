<template>
  <div>
    <share-buttons :networks="networks" :sharing="sharing"> </share-buttons>
    <section id="profile">
      <h2>{{name}}</h2>
      初出場：{{ firstPlayed }}({{firstTeam}}) 、最終出場 {{ lastPlayed }}({{lastTeam}})<br/>
      所属チーム:{{ teams.join() }}
    </section>

    
    <player-statistics-table :rows="rows"></player-statistics-table>
  </div>
</template>

<script>
import PlayerStatisticsTable from '@/components/template/PlayerStatisticsTable';
import ShareButtons from '@/components/organisms/ShareButtons.vue'
import DatabaseAccess from "@/js/DatabaseAccess.js";

export default {
  components:{
    "share-buttons":ShareButtons,
    "player-statistics-table":PlayerStatisticsTable
  },
  data(){
    return{
      rows:[],
      profile:[],
      cup: {},
      name:"",
      firstPlayed:"",
      firstTeam: "",
      lastPlayed:"",
      lastTeam: "",
      teams:[],

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
      this.profile, this.cup, this.rows = await DatabaseAccess.getPlayerStatisticsData(playerId);

      this.firstPlayed = this.profile["first_played"]["date"];
      this.firstTeam = this.profile["first_played"]["team"];
      this.lastPlayed = this.profile["last_played"]["date"];
      this.lastTeam = this.profile["last_played"]["team"];
      
      this.getTeams();
    },
    /**
     * 取得したデータから所属チームを抽出する
     */
    getTeams(){
      this.teams = [];
      let tmpTeamName = this.firstTeam;
      let tmpTeamSeason = this.rows[0].season_name;

      for(let i=1;i<this.rows.length;i++){
        if(this.rows[i].regular || this.rows[i].playoff || this.rows[i].cup || this.rows[i].is_change || this.rows[i].is_underdivision){
          if(tmpTeamName !== this.rows[i].team){
            if(tmpTeamSeason === this.rows[i-1].season_name){
              this.teams.push(`${tmpTeamName}(${tmpTeamSeason})`)
            }else{
              this.teams.push(`${tmpTeamName}(${tmpTeamSeason}～${this.rows[i-1].season_name})`)
            }
            tmpTeamName = this.rows[i].team;
            tmpTeamSeason = this.rows[i].season_name;
          }
        }
      }

      if(tmpTeamSeason === this.rows[this.rows.length - 1].season_name){
        this.teams.push(`${tmpTeamName}(${tmpTeamSeason})`)
      }else{
        this.teams.push(`${tmpTeamName}(${tmpTeamSeason}～${this.rows[this.rows.length - 1].season_name})`)
      }
    }
  }
}
</script>

<style>
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css);
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
ul {
  padding: 0;
  list-style: none;
}
ul i.fa {
  margin-right: 5px;
}
</style>