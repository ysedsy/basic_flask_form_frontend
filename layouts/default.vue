<template>
<v-app>
    <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>My App</v-toolbar-title>
    </v-app-bar>
    <v-main>

        <v-navigation-drawer app :model-value="drawer" clipped :expand-on-hover="true">
            <v-list>
                <v-list-item>
                        <v-icon>mdi-home</v-icon>
                    <v-list-item-title>Home</v-list-item-title>
                </v-list-item>
                <v-list-item>
                        <v-icon>mdi-account</v-icon>
                    <v-list-item-title>Profile</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <slot/>
    </v-main>
        
</v-app>
</template>

<script>
export default {
    setup() {

    },
    data() {
        return {
            drawer: false
        }
    }
}
</script>