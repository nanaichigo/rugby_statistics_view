import axios from "axios";
//const API_ADDRESS = "https://datairoro.com/api/sports/rugby/";
const API_ADDRESS = "http://127.0.0.1:5000/";

async function getPlayerRankingData(sort, min, max){
    var url = `${API_ADDRESS}official`;

    var sort_query = "";
    switch(sort){
        case "tryNum":
            sort_query = "try";
            break;
        case "goal":
            sort_query = "goal";
            break;
        case "pg":
            sort_query = "pg";
            break;

        case "dg":
            sort_query = "dg";
            break;

        case "score":
            sort_query = "score";
            break;

        default:
            sort_query = "played";
            break;
    }

    try{
        const res = await axios.get(url, {
            params:{
                r_type: sort_query,
                min_target: min,
                max_target: max,
            }
        })
        const data = res.data;
        if(data.status === 200){
            return data.body.data;
        }
        return []
      }catch(error){
        console.log(error)
        return []
      }
}

async function getPlayerRankingCustomData(sort, min, max,
    tournamentParams,
    leagueParams, leagueDiv, topParams, topDiv, cupParams, preParams){
    var url = `${API_ADDRESS}custom`;

    var sort_query = "";
    switch(sort){
        case "tryNum":
            sort_query = "try";
            break;
        case "goal":
            sort_query = "goal";
            break;
        case "pg":
            sort_query = "pg";
            break;

        case "dg":
            sort_query = "dg";
            break;

        case "score":
            sort_query = "score";
            break;

        default:
            sort_query = "played";
            break;
    }

    try{
        const res = await axios.get(url, {
            params:{
                r_type: sort_query,
                min_target: min,
                max_target: max,
                tournamentParams: tournamentParams,
                leagueParams: leagueParams,
                leagueDiv: leagueDiv,
                topParams: topParams,
                topDiv: topDiv,
                cupParams:cupParams,
                preParams: preParams
            }
        })
        const data = res.data;
        if(data.status === 200){
            return data.body.data;
        }
        return []
      }catch(error){
        console.log(error)
        return []
      }
}

async function getPlayerStatisticsData(player_id){
    var url = `${API_ADDRESS}player`;

    try{
        const res = await axios.get(url, {
            params:{
                player_id: player_id
            }
        })
        const data = res.data;
        if(data.status === 200){
            return [data.body.profile, data.body.caps_types, data.body.data];
        }
        return []
      }catch(error){
        console.log(error)
        return []
      }
}

export default{
    getPlayerRankingData,
    getPlayerRankingCustomData,
    getPlayerStatisticsData
}