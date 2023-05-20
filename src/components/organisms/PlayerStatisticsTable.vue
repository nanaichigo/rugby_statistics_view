<template>
    <div id="static_stable">
        <table>
            <thead>
                <th v-for="col in columns" :key="col.label" :width="col.width">
                {{ col.label }}
                </th>
            </thead>
            <tbody>
                <tr v-for="(row, idx) in rows" :key="idx">
                    <td v-for="col in columns" :key="col.label" :width="col.width" :class="col.field">
                        {{ row[col.field] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props:{
        rows:{
            type:Array,
            default: () => []
        }
    },
    data(){
        return{
            columns:[
                {
                    label:"日付",
                    field:"date",
                    sortable: false,
                    width:'100px'
                },{
                    label:"大会",
                    field:"tournament",
                    sortable: false,
                    width:'380px'
                },{
                    label:"チーム",
                    field:"team",
                    sortable: false,
                    width:'100px'
                },{
                    label:"スコア",
                    field:"score",
                    sortable: false,
                    width:'25px'
                },{
                    label:"T",
                    field:"try",
                    sortable: false,
                    width:'25px'
                },{
                    label:"G",
                    field:"goal",
                    sortable: false,
                    width:'25px'
                },{
                    label:"PG",
                    field:"pg",
                    sortable: false,
                    width:'25px'
                },{
                    label:"DG",
                    field:"dg",
                    sortable: false,
                    width:'25px'
                },
            ]
        }
    }
}
</script>

<style scoped>
table th{
  position: sticky;
  top: 0;
  left: 0;
  background-color: darkgreen;
  color: white;
}

table thead{
  display: block;
}

table tbody{
  display: block;
  height: 700px;
  overflow: scroll;
}

td:not(.tournament, .team){
  text-align: right;
}

.name td{
  text-align: left;
}

td,th{
    border-right: 1px solid #999;
    border-bottom: 1px solid #999;
}
#static_stable tr:first-child th{
    border-top: 1px solid #999;
}
#static_stable th:first-child{
    border-left: 1px solid #999;
}
</style>