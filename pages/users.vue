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
export default {
    name: 'Users',
    data() {
        return {
            headers: [
                { text: 'First Name', value: 'firstname' },
                { text: 'Last Name', value: 'surname' },
                { text: 'Age', value: 'age' },
                { text: 'Department', value: 'department' },
            ],
            users: [
                { firstname: 'John', surname: 'Doe', age: 30, department: 'HR' },
                { firstname: 'Jane', surname: 'Smith', age: 25, department: 'IT' },
                // Add more users as needed
            ],
        };
    },
};
</script>
