<template>
  <div id="rangking_table">
    <table>
      <thead>
        <tr>
          <th><v-btn  size="small">詳細</v-btn></th>
          <th v-for="col in columns" :key="col.label" :width="col.width">
          {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, idx) in rows" :key="idx">
          <td>
            <v-btn  size="small" @click="onRowClick(row)">詳細</v-btn>
          </td>
          <td v-for="col in columns" :key="col.label" :width="col.width" :class="col.field">
            <div v-if="col.type==='percentage'">
              <div v-if="!row[col.field]">
                ---
              </div>
              <div v-else>
              {{ (row[col.field] * 100).toFixed(2) }} %
              </div>
            </div>
            <div v-else>
              {{ row[col.field] }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
    components:{

    },
    data(){
        return{
            columns:[
                {
                    label:"名前",
                    field:"name",
                    sortable: false,
                    width:'300px'
                },
                {
                    label:"試合数",
                    field:"played",
                    sortable: false,
                    width:'50px'
                },
                {
                    label:"得点",
                    field:"score",
                    sortable: false,
                    width:'50px'
                },
                {
                    label:"T",
                    field:"try",
                    sortable: false,
                    width:'30px'
                },
                {
                    label:"G",
                    field:"goal",
                    sortable: false,
                    width:'30px'
                },
                {
                    label:"PG",
                    field:"pg",
                    sortable: false,
                    width:'30px'
                },
                {
                    label:"DG",
                    field:"dg",
                    sortable: false,
                    width:'30px'
                },
                {
                    label:"GP",
                    field:"g_p",
                    type: 'percentage',
                    sortable: false,
                    width:'70px'
                },
                {
                    label:"PGP",
                    field:"pg_p",
                    type: 'percentage',
                    sortable: false,
                    width:'70px'
                },
                {
                    label:"DGP",
                    field:"dg_p",
                    type: 'percentage',
                    sortable: false,
                    width:'70px'
                }
            ],
            height:"700px"
        }
    },
    props:{
        rows:{
            type:Array,
            default: () => []
        }
    },
    mounted(){
        
    },
    methods:{
        onRowClick(row){
          const param = {
                        playerID: row.name_id,
                        playername:row.name
                    };
          this.$emit("cellClick", param);
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

td:not(.name){
  text-align: right;
}

.name td{
  text-align: left;
}

td,th{
    border-right: 1px solid #999;
    border-bottom: 1px solid #999;
}
#rangking_table tr:first-child th{
    border-top: 1px solid #999;
}
#rangking_table th:first-child{
    border-left: 1px solid #999;
}
</style>