<template>
    <v-main>
        <v-container>
            <v-row align-content="center">
                <v-col align="center">
                    <v-row>
                        <v-col cols="2">対象</v-col>
                        <v-col>
                            <v-btn-toggle v-model="custom">
                                <v-btn value="official" color=secondary>公式</v-btn>
                                <v-btn value="custom" color=secondary>カスタム</v-btn>
                            </v-btn-toggle>
                        </v-col>
                        <v-container v-if="custom === 'custom'">
                            <v-row>
                                <v-col cols="2">大会</v-col>
                                <v-col>
                                    <v-btn-toggle v-model="tournamentType" multiple>
                                        <v-btn value="leagueone" color=secondary>リーグワン</v-btn>
                                        <v-btn value="topleague" color=secondary>トップリーグ</v-btn>
                                    </v-btn-toggle>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="2">リーグ戦</v-col>
                                <v-col v-if="tournamentType.includes('leagueone')">
                                    <v-checkbox label="リーグワン" v-model="leagueOneRegular" color=secondary></v-checkbox>
                                </v-col><v-col v-if="tournamentType.includes('topleague')">
                                    <v-checkbox label="トップリーグ" v-model="topleagueRegular" color=secondary></v-checkbox>
                                </v-col><v-col v-if="tournamentType.includes('topleague')">
                                    <v-checkbox label="カップ" v-model="cupRegular" color=secondary></v-checkbox>
                                </v-col><v-col v-if="tournamentType.includes('topleague')">
                                    <v-checkbox label="プレシーズン" v-model="preRegular" color=secondary></v-checkbox>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="2">プレーオフ</v-col>
                                <v-col v-if="tournamentType.includes('leagueone')">
                                    <v-checkbox label="リーグワン" v-model="leagueOnePlayoff" color=secondary></v-checkbox>
                                </v-col><v-col v-if="tournamentType.includes('topleague')">
                                    <v-checkbox label="トップリーグ" v-model="topleaguePlayoff" color=secondary></v-checkbox>
                                </v-col><v-col v-if="tournamentType.includes('topleague')">
                                    <v-checkbox label="カップ" v-model="cupPlayoff" color=secondary></v-checkbox>
                                </v-col><v-col v-if="tournamentType.includes('topleague')">
                                    <v-checkbox label="プレシーズン" v-model="prePlayoff" color=secondary></v-checkbox>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="2">入替戦</v-col>
                                <v-col v-if="tournamentType.includes('leagueone')">
                                    <v-checkbox label="リーグワン" v-model="leagueOneChange" color=secondary></v-checkbox>
                                </v-col>
                                <v-col v-if="tournamentType.includes('topleague')">
                                    <v-checkbox label="トップリーグ" v-model="topleagueChange" color=secondary></v-checkbox>
                                </v-col>
                            </v-row>
                            <v-row v-if="tournamentType.includes('leagueone')">
                                <v-col cols="2">Division</v-col>
                                <v-col>
                                    <v-btn-toggle v-model="division" multiple>
                                        <v-btn value="D1" color=secondary>D1</v-btn>
                                        <v-btn value="D2" color=secondary>D2</v-btn>
                                        <v-btn value="D3" color=secondary>D3</v-btn>
                                    </v-btn-toggle>
                                </v-col>
                            </v-row>
                            <v-row v-if="tournamentType.includes('topleague')">
                                <v-col cols="2">Division</v-col>
                                <v-col>
                                    <v-btn-toggle v-model="divisionTL" multiple>
                                        <v-btn value="TL" color=secondary>TL</v-btn>
                                        <v-btn value="TCL" color=secondary>TLC/TCL</v-btn>
                                    </v-btn-toggle>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-row>
                    <v-row>
                        <v-col cols="2">種類</v-col>
                        <v-col>
                            <v-btn-toggle v-model="sort" @click="sortClick()">
                                <v-btn color=secondary value="played">出場数</v-btn>
                                <v-btn color=secondary value="score">得点</v-btn>
                                <v-btn color=secondary value="tryNum">トライ</v-btn>
                                <v-btn color=secondary value="goal">ゴール</v-btn>
                                <v-btn color=secondary value="pg">ペナルティゴール</v-btn>
                                <v-btn color=secondary value="dg">ドロップゴール</v-btn>
                            </v-btn-toggle>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="2">範囲</v-col>
                        <v-col>
                            <v-range-slider v-model="range" :min="1" :max="rangeMax" :step="1" hide-details
                                class="align-center">
                                <template v-slot:prepend>
                                    <v-text-field :model-value="range[0]" hide-details single-line type="number"
                                        variant="outlined" density="compact" style="width: 70px"
                                        @change="$set(range, 0, $event)"></v-text-field>
                                </template>
                                <template v-slot:append>
                                    <v-text-field :model-value="range[1]" hide-details single-line type="number"
                                        variant="outlined" style="width: 100px" density="compact"
                                        @change="$set(range, 1, $event)"></v-text-field>
                                </template>
                            </v-range-slider>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col><v-btn color=ng @click="reset()">リセット</v-btn></v-col>
                        <v-col><v-btn color=primary @click="getView()">取得</v-btn></v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
export default {
    data() {
        return {
            tournamentType: ["topleague", "leagueone"],
            tournamentAll: false,
            tournamentText: "All",

            sort: "played",

            division: ["D1", "D2", "D3"],
            divisionAll: true,
            divisionText: "Clear",

            divisionTL: ["TL"],
            divisionTLAll: false,
            divisionTLText: "All",

            cupRegular: false,
            preRegular: false,
            topleagueRegular: true,
            leagueOneRegular: true,

            cupPlayoff: false,
            prePlayoff: false,
            topleaguePlayoff: false,
            leagueOnePlayoff: true,

            leagueOneChange: true,
            topleagueChange: false,
            custom: "official",
            range: [1, 300],
            rangeMax: 200,
        }
    },
    mounted() {
    },
    methods: {
        checkLeagueoneDivisionAll() {
            if (this.divisionAll) {
                this.division = [];
                this.divisionAll = false;
                this.divisionText = "All";
            } else {
                this.division = ["D1", "D2", "D3"],
                    this.divisionAll = true;
                this.divisionText = "Clear";
            }
        },
        checkTournamentAll() {
            if (this.tournamentAll) {
                this.tournamentType = [];
                this.tournamentAll = false;
                this.tournamentText = "All";
            } else {
                this.tournamentType = ["topleague", "leagueone"];
                this.tournamentAll = false;
                this.tournamentText = "All";
            }
        },
        reset() {
            this.custom = "official";

            this.tournamentType = ["topleague", "leagueone"];
            this.tournamentAll = false;
            this.tournamentText = "All";

            this.sort = "played";

            this.division = ["D1", "D2", "D3"];
            this.divisionAll = true;
            this.divisionText = "Clear";

            this.divisionTL = ["TL"];
            this.divisionTLAll = false;
            this.divisionTLText = "All";

            this.cupPlayoff = false;
            this.prePlayoff = false;
            this.topleaguePlayoff = false;
            this.leagueOnePlayoff = true;

            this.cupRegular = false;
            this.preRegular = false;
            this.topleagueRegular = true;
            this.leagueOneRegular = true;

            this.leagueOneChange = true;
            this.topleagueChange = false;
        },
        sortClick() {
            switch (this.sort) {
                case "played":
                    this.range[0] = 1
                    this.range[1] = 300
                    this.rangeMax = 2000
                    break;
                case "score":
                    this.range[0] = 1
                    this.range[1] = 2000
                    this.rangeMax = 2000
                    break;
                case "tryNum":
                    this.range[0] = 1
                    this.range[1] = 200
                    this.rangeMax = 200
                    break;
                case "goal":
                    this.range[0] = 1
                    this.range[1] = 500
                    this.rangeMax = 500
                    break;
                case "pg":
                    this.range[0] = 1
                    this.range[1] = 300
                    this.rangeMax = 300
                    break;
                case "dg":
                    this.range[0] = 1
                    this.range[1] = 50
                    this.rangeMax = 50
                    break;

            }
        },
        getView() {
            if (this.custom === "official") {
                
                const params = {
                        official: this.custom,
                        sort: this.sort,
                        minRange: this.range[0],
                        maxRange: this.range[1]
                    }

                this.$emit("get-button", params);
            } else {
                let params = {
                    official: this.custom,
                    sort: this.sort,
                    minRange: this.range[0],
                    maxRange: this.range[1]
                };

                // tournament
                let hasLeagueOne = false;
                let hasTopLeague = false;
                let hasCup = false;
                let hasPreSeason = false;
                let tournaments = 0;

                if (this.tournamentType.includes("leagueone")) {
                    hasLeagueOne = true;
                    tournaments += 1;
                }
                if (this.tournamentType.includes("topleague")) {
                    hasTopLeague = true;
                    tournaments += 2;
                }
                if (this.cupRegular || this.cupPlayoff) {
                    hasCup = true;
                    tournaments += 4;
                }
                if (this.prePlayoff || this.preRegular) {
                    hasPreSeason = true;
                    tournaments += 8;
                }


                // leagueone
                if (hasLeagueOne) {
                    let leagueoneTournament = 0;
                    if (this.leagueOneRegular) {
                        leagueoneTournament += 1;
                    }
                    if (this.leagueOnePlayoff) {
                        leagueoneTournament += 2;
                    }
                    if (this.leagueOneChange) {
                        leagueoneTournament += 4;
                    }

                    // leagueone division
                    let LOdivision = 0;
                    if (this.division.includes("D1")) {
                        LOdivision += 1;
                    }
                    if (this.division.includes("D2")) {
                        LOdivision += 2;
                    }
                    if (this.division.includes("D3")) {
                        LOdivision += 4;
                    }

                    if (leagueoneTournament === 0) {
                        params.tournaments -= 1;
                    } else {
                        params.lot = leagueoneTournament;
                        if (LOdivision === 0) {
                            params.lod = 7;
                        } else {
                            params.lod = LOdivision;
                        }
                    }

                }
                // topleague
                if (hasTopLeague) {
                    let topleagueTournament = 0;
                    if (this.topleagueRegular) {
                        topleagueTournament += 1;
                    }
                    if (this.topleaguePlayoff) {
                        topleagueTournament += 2;
                    }
                    if (this.topleagueChange) {
                        topleagueTournament += 4;
                    }

                    // topleague division
                    let TLdivision = 0;
                    if (this.divisionTL.includes("TL")) {
                        TLdivision += 1;
                    }
                    if (this.divisionTL.includes("TCL")) {
                        TLdivision += 2;
                    }

                    if (topleagueTournament === 0) {
                        params.tournaments -= 2;
                    } else {
                        params.tlt = topleagueTournament;
                        if (TLdivision === 0) {
                            params.tld = 3;
                        } else {
                            params.tld = TLdivision;
                        }
                    }
                }
                // cup
                if (hasCup) {
                    let cupTournament = 0;
                    if (this.cupRegular) {
                        cupTournament += 1;
                    }
                    if (this.cupPlayoff) {
                        cupTournament += 2;
                    }

                    if (cupTournament === 0) {
                        params.tournaments -= 4;
                    } else {
                        params.cupt = cupTournament;
                    }
                }

                // preseason
                if (hasPreSeason) {
                    let preTournament = 0;
                    if (this.preRegular) {
                        preTournament += 1;
                    }
                    if (this.prePlayoff) {
                        preTournament += 2;
                    }

                    if (preTournament === 0) {
                        params.tournaments -= 8;
                    } else {
                        params.pret = preTournament;
                    }
                }
                params.tournaments = tournaments;

                this.$emit("get-button", params);
            }
        }
    }
}
</script>

<style></style>