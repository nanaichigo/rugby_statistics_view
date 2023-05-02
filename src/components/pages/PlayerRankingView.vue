<template>
    <v-container>
        <v-row align-content="center">
            <v-col align="center">
                <div class="title">
                    <share-buttons :networks="networks" :sharing="sharing">
                    </share-buttons>
                    <h3>{{ title }}</h3>
                    <h4><div v-if="official">条件：《リーグワン(D1/D2/D3)》リーグ:〇,プレーオフ:〇,入替戦:〇《トップリーグ(TL)》リーグ:〇,プレーオフ:×,入替戦:×</div>
                    <div v-else>条件：{{lotext}}{{ tltext }}{{ cuptext }}{{ pretext }}</div></h4>
                </div>
                <div v-if="loading">
                    <v-progress-circular
                    indeterminate
                    color="primary"
                    ></v-progress-circular>
                </div>
                <div v-else>
                    <player-ranking-table :rows="rows"></player-ranking-table> 
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import PlayerRankingTable from '@/components/template/PlayerRankingTable.vue'
import ShareButtons from '@/components/organisms/ShareButtons.vue'
import DatabaseAccess from "@/js/DatabaseAccess.js";
export default {
    components:{
        "share-buttons":ShareButtons,
        "player-ranking-table":PlayerRankingTable,
    },
        // props:{
    //     ranking_type:{
    //         type:String,
    //         default:'official'
    //     },
    //     sort:{
    //         type:String,
    //         default:"played"
    //     },
    //     title:{
    //         type:String
    //     }

    // },
    data(){
        return{
            minRange:0,
            maxRange:10000,
            official:"official",
            title:"",
            rows: [],
            loading:true,

            lotext:"",
            tltext:"",
            cuptext:"",
            pretext:"",
            tournaments:0,

            leagueParams:0,
            leagueDiv:0,
            topParams:0,
            topDiv:0,
            cupParams:0,
            preParams:0,

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
    mounted() {
        this.official = this.$route.query.official;
        this.sort = this.$route.query.sort;
        let rankingType = ""
        switch(this.sort){
            case "tryNum":
            rankingType = "トライ数";
                break;
            case "goal":
            rankingType = "ゴール数";
                break;
            case "pg":
            rankingType = "ペナルティゴール数";
                break;

            case "dg":
            rankingType = "ドロップゴール数";
                break;

            case "score":
            rankingType = "得点数";
                break;

            default:
            rankingType = "出場試合数";
                break;
        }
        this.title = `${rankingType}ランキング (${this.minRange}～${this.maxRange})`

        this.sharing.title = `日本ラグビー通算ランキング（${this.title}） - datairoro`
        this.sharing.url = location.href

        this.maxRange = parseInt(this.$route.query.maxRange,10);
        this.minRange = parseInt(this.$route.query.minRange,10);

        if(this.official !== "official"){
            let preseason = "";
            let cup = "";
            let topleague = "";
            let leagueone = "";
            this.tournaments = parseInt(this.$route.query.tournaments,10);
            if(this.extractBit(this.tournaments, 4) === 1){
                preseason = "《プレシーズン》"
                this.preParams = parseInt(this.$route.query.pret, 10);
                if(this.extractBit(this.preParams, 1) === 1){
                    preseason += "リーグ:〇,"
                }else{
                    preseason += "リーグ:×,"
                }
                if(this.extractBit(this.preParams, 2) === 1){
                    preseason += "プレーオフ:〇"
                }else{
                    preseason += "プレーオフ:×"
                }
            }
            if(this.extractBit(this.tournaments, 3) === 1){
                cup = "《カップ》"
                this.cupParams = parseInt(this.$route.query.cupt,10);
                if(this.extractBit(this.cupParams, 1) === 1){
                    cup += "リーグ:〇,"
                }else{
                    cup += "リーグ:×,"
                }
                if(this.extractBit(this.cupParams, 2) === 1){
                    cup += "プレーオフ:〇"
                }else{
                    cup += "プレーオフ:×"
                }
            }
            if(this.extractBit(this.tournaments, 2) === 1){
                this.topDiv = parseInt(this.$route.query.tld,10);
                if(this.extractBit(this.topDiv, 1) === 1){
                    if(this.extractBit(this.topDiv, 2) === 1){
                        topleague = "《トップリーグ(TL/TCL)》"
                    }else{
                        topleague = "《トップリーグ(TL)》"
                    }
                }else if(this.extractBit(this.topDiv, 2) === 1){
                    topleague = "《トップリーグ(TCL)》"
                }
                
                this.topParams = parseInt(this.$route.query.tlt, 10);
                if(this.extractBit(this.topParams, 1) === 1){
                    topleague += "リーグ:〇,"
                }else{
                    topleague += "リーグ:×,"
                }
                if(this.extractBit(this.topParams, 2) === 1){
                    topleague += "プレーオフ:〇"
                }else{
                    topleague += "プレーオフ:×,"
                }
                if(this.extractBit(this.topParams, 3) === 1){
                    topleague += "入替戦:〇"
                }else{
                    topleague += "入替戦:×"
                }
            }

            if(this.extractBit(this.tournaments, 1) === 1){
                this.leagueDiv = parseInt(this.$route.query.lod, 10);
                if(this.extractBit(this.leagueDiv, 1) === 1){
                    if(this.extractBit(this.leagueDiv, 2) === 1){
                        if(this.extractBit(this.leagueDiv, 2) === 1){
                            leagueone = "《リーグワン(D1/D2/D3)》"
                        }else{
                            leagueone = "《リーグワン(D1/D2)》"
                        }
                    }else{
                        if(this.extractBit(this.leagueDiv, 2) === 1){
                            leagueone = "《リーグワン(D1/D3)》"
                        }else{
                            leagueone = "《リーグワン(D1)》"
                        }
                    }
                }else if(this.extractBit(this.leagueDiv, 2) === 1){
                    if(this.extractBit(this.leagueDiv, 2) === 1){
                        leagueone = "《リーグワン(D2/D3)》"
                    }else{
                        leagueone = "《リーグワン(D3)》"
                    }
                }

                this.leagueParams = parseInt(this.$route.query.lot, 10);
                if(this.extractBit(this.leagueParams, 1) === 1){
                    leagueone += "リーグ:〇,"
                }else{
                    leagueone += "リーグ:×,"
                }
                if(this.extractBit(this.leagueParams, 2) === 1){
                    leagueone += "プレーオフ:〇"
                }else{
                    leagueone += "プレーオフ:×,"
                }
                if(this.extractBit(this.leagueParams, 3) === 1){
                    leagueone += "入替戦:〇"
                }else{
                    leagueone += "入替戦:×,"
                }
            }

            this.lotext = leagueone;
            this.tltext = topleague;
            this.cuptext = cup;
            this.pretext = preseason;
            this.getCustomData();
        }else{
            this.getOfficialData();
        }
    },
    methods:{
        async getOfficialData(){
            this.rows = await DatabaseAccess.getPlayerRankingData(this.sort, this.minRange, this.maxRange);
            this.loading = false;
        },
        async getCustomData(){
            this.rows = await DatabaseAccess.getPlayerRankingCustomData(
                this.sort, this.minRange, this.maxRange,
                this.tournaments,
                this.leagueParams, this.leagueDiv, this.topParams,
                this.topDiv, this.cupParams, this.preParams
                );
            this.loading = false;
        },
        extractBit(b, n){
            return (b & (1 << (n-1))) >> (n-1);
        }
    }
}
</script>

<style>

</style>