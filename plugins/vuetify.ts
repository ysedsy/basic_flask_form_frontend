import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import * as labs from 'vuetify/labs/components';

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        ssr: false,
        components: {
            ...components,
            ...labs
        },
        directives
    });
    app.vueApp.use(vuetify)
});

