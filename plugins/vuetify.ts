import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
// import * as labs from 'vuetify/labs';

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        components: {
            ...components,
            // ...labs
        },
        directives
    });
    app.vueApp.use(vuetify)
});

