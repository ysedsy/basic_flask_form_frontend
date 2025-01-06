<template>
    <v-container>
        <v-data-table
            :headers="headers"
            :items="users"
            items-per-page="-1"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Users</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import { useUserStore } from '~/store/userstore';
import { storeToRefs } from 'pinia';
export default {
    setup() {
        const userStore = useUserStore();
        const { fetchUsers } = userStore;
        const { users } = storeToRefs(userStore);

        fetchUsers();
        return {
            users
        };
    },
    name: 'Users',
    data() {
        return {
            headers: [
                { title: 'First Name', value: 'name' },
                { title: 'Last Name', value: 'surname' },
                { title: 'Age', value: 'age' },
                { title: 'Department', value: 'department.shortname' },
            ],
            // users: [
            //     { firstname: 'John', surname: 'Doe', age: 30, department: 'HR' },
            //     { firstname: 'Jane', surname: 'Smith', age: 25, department: 'IT' },
            //     // Add more users as needed
            // ],
        };
    },
};
</script>
