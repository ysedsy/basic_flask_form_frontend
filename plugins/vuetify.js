import { CreateVuetify } from 'vuetify';
import * as components from 'vuetify/lib/components';
import * as directives from 'vuetify/lib/directives';
import * as labs from 'vuetify/lib/labs';

export default defineNuxtPlugin(nuxtApp => {
    const vuetify = CreateVuetify({
        components: {
            ...components,
            ...labs
        },
        directives
    });
    nuxtApp.vueApp.use(vuetify)
});