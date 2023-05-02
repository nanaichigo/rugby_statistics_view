<template>
    <v-container>
        <v-row>
            <v-col>
                <ShareNetwork v-for="network in networks" :network="network.network" :key="network.network"
                    :style="{ backgroundColor: network.color }" :url="sharing.url" :title="sharing.title"
                    :hashtags="sharing.hashtags"
                    :twitterUser="sharing.twitterUser">
                    <v-btn :style="{ backgroundColor: network.color, color: '#ffffff' }" density="comfortable">
                    <font-awesome-icon :icon="network.icon" />&nbsp; {{ network.name }}
                    </v-btn>
                </ShareNetwork>
                <a href="https://h.accesstrade.net/sp/cc?rk=0100o47000n6hj" rel="nofollow" referrerpolicy="no-referrer-when-downgrade">
                <img src="https://h.accesstrade.net/sp/rr?rk=0100o47000n6hj" alt="J SPORTS（ジェイスポーツ）オンデマンド" border="0" /></a>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props:{
        sharing:{
            type:Object,
            default: () => ({
                title: 'JAPAN RUGBY Player Stats - datairoro',
                description: 'ranking',
                quote: 'ranking',
                hashtags: 'rugbyjp,ラグビー',
                twitterUser: 'iroro_sports',
                url:"https://datairoro.com/"
            })
        },
        networks:{
            type:Array,
            default: () => [
                { network: 'twitter', name: 'Twitter', icon: 'fab fah fa-lg fa-twitter', color: '#1da1f2' },
                { network: 'facebook', name: 'Facebook', icon: 'fab fah fa-lg fa-facebook-f', color: '#1877f2' },
                { network: 'line', name: 'Line', icon: 'fab fah fa-lg fa-line', color: '#00c300' },
                { network: 'wordpress', name: 'Wordpress', icon: 'fab fah fa-lg fa-wordpress', color: '#21759b' },
                { network: 'evernote', name: 'Evernote', icon: 'fab fah fa-lg fa-evernote', color: '#2dbe60' },
                { network: 'email', name: 'Email', icon: 'far fah fa-lg fa-envelope', color: '#333333' },
            ]
        }
    }
}
</script>

<style>

</style>