<template>
<v-app>
    <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>User Database</v-toolbar-title>
    </v-app-bar>
    <v-main>

        <v-navigation-drawer app :model-value="drawer" clipped >
            <v-list>
                <v-list-item to="/users">
                        <v-icon>mdi-account</v-icon>
                        Users
                </v-list-item>
                <v-list-item to="/departments">
                        <v-icon>mdi-briefcase</v-icon>
                        Departments
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
            drawer: true
        }
    }
}
</script>