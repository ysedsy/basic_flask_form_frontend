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
import { useDepartmentStore } from '~/store/departmentstore';
import { storeToRefs } from 'pinia';
export default {
    
    name: 'Departments',
    setup(){
        const departmentStore = useDepartmentStore();
        const {fetchDepartments} = departmentStore;
        const {departments} = storeToRefs(departmentStore);

        fetchDepartments();

        return {
            departments
        };
    },
    data() {
        return {
            headers: [
                { title: 'Shortname', value: 'shortname' },
                { title: 'Fullname', value: 'fullname' },
            ],
        };
    },
};
</script>
