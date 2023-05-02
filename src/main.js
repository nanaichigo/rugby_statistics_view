/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import font awesome icon component */
import { faTwitter, faFacebookF, faLine, faWordpress, faEvernote } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
/* add icons to the library */
library.add(faTwitter, faFacebookF, faLine, faWordpress, faEvernote, faEnvelope)

const app = createApp(App)

registerPlugins(app)

app
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')

import ScriptX from 'vue-scriptx'
app.use(ScriptX)

import Ads from 'vue-google-adsense'
app.use(Ads.AutoAdsense, { adClient: 'ca-pub-6336239615356624', isNewAdsCode: false })