<template>
    <v-container>
        <v-data-table :headers="headers" :items="users" items-per-page="-1">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Users</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="400px">
                        <template v-slot:activator="{ props }">
                            <v-btn @click="dialog = true" color="primary">New Item</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span>{{ formTitle }}</span>
                            </v-card-title>
                            <v-card-text>
                                <v-form ref="form" @submit.prevent="validate">
                                    <v-text-field v-model="editedItem.name" label="Shortname"
                                        :rules="rules"></v-text-field>
                                    <v-text-field v-model="editedItem.surname" label="Fullname"
                                        :rules="rules"></v-text-field>
                                    <v-text-field v-model="editedItem.age" label="Age" :rules="rules"></v-text-field>
                                    <v-autocomplete v-model="editedItem.department_shortname" label="Department"
                                        :items="allDepartments"></v-autocomplete>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="close">Cancel</v-btn>
                                <v-btn @click="validate" color="primary">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title>
                                <span>Delete Item</span>
                            </v-card-title>
                            <v-card-text>
                                <p>Are you sure you want to delete this item?</p>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="closeDelete">Cancel</v-btn>
                                <v-btn @click="deleteItemConfirm" color="error">Delete</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon size="small" class="me-2" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon size="small" @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import { useUserStore } from '~/store/userstore';
import { useDepartmentStore } from '~/store/departmentstore';
import { storeToRefs } from 'pinia';
export default {
    setup() {
        const userStore = useUserStore();
        const { fetchUsers } = userStore;
        const { users } = storeToRefs(userStore);

        fetchUsers();

        const departmentStore = useDepartmentStore();
        const { fetchDepartments } = departmentStore;
        const { departments } = storeToRefs(departmentStore);

        fetchDepartments();

        return {
            users,
            userStore,
            departments,
            departmentStore
        };
    },
    data: () => ({
        headers: [
            { title: 'First Name', value: 'name' },
            { title: 'Last Name', value: 'surname' },
            { title: 'Age', value: 'age' },
            { title: 'Department', value: 'department_shortname' },
            { title: 'Actions', key: 'actions', sortable: false, align: 'end' },
        ],
        dialog: false,
        dialogDelete: false,
        rules: [
            v => !!v || 'Item is required'
        ],
        defaultItem: {
            name: '',
            surname: '',
            age: '',
            department_shortname: ''
        },
        editedItem: {
            name: '',
            surname: '',
            age: '',
            department_shortname: ''
        },
        editedIndex: -1,
        valid: {
            valid: false,
        }
    }),
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New User' : 'Edit User';
        },
        allDepartments() {
            var allDepartments = [];
            this.departments.forEach(element => {
                allDepartments.push(element.shortname);
            });
            return allDepartments;
        }
    },
    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        }
    },
    methods: {
        editItem(item) {
            this.editedIndex = item.id;
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },
        deleteItem(item) {
            this.editedIndex = item.id;
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },
        deleteItemConfirm() {
            this.userStore.deleteUser(this.editedIndex);
            this.closeDelete();
        },
        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },
        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },
        save() {
            if (this.editedIndex > -1) {
                this.userStore.editUser(this.editedIndex, this.editedItem);
            } else {
                this.userStore.addUser(this.editedItem);
            }
            this.close();
        },
        async validate() {
            this.valid = await this.$refs.form.validate();
            if (this.valid) {
                this.save();
            }
        }
    },
};
</script>
