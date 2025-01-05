<template>
    <v-container>
        <v-data-table
            :headers="headers"
            :items="departments"
            items-per-page="-1"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Departments</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
export default {
    name: 'Departments',
    data() {
        return {
            headers: [
                { text: 'First Name', value: 'shortname' },
                { text: 'Last Name', value: 'fullname' },
            ],
            departments: [
                { shortname: 'John', fullname: 'Doe', age: 30, department: 'HR' },
                { shortname: 'Jane', fullname: 'Smith', age: 25, department: 'IT' },
                // Add more departments as needed
            ],
        };
    },
};
</script>
