import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        _users: [],
        _user: null,
    }),
    actions: {
        async fetchUsers() {
            try {
                const response = await useFetch('http://localhost:9999/api/users');
                this.users = response.data;
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        async fetchUser(id) {
            try {
                const response = await $fetch("http://localhost:9999/api/users/"+id);
                this.user = response.data;
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        },
        async addUser(userData) {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData),
                };
                const response = await $fetch('http://localhost:9999/api/users', requestOptions);
                this.users = response;
            } catch (error) {
                console.error('Error creating user:', error);
            }
        },
        async editUser(id, userData) {
            try {
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData),
                };
                const response = await $fetch("http://localhost:9999/api/users/"+id, requestOptions);
                this.users = response;
            } catch (error) {
                console.error('Error updating user:', error);
            }
        },
        async deleteUser(id) {
            try {
                const requestOptions = {
                    method: 'DELETE',
                };
                await $fetch("http://localhost:9999/api/users/"+id, requestOptions);
                this.fetchUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        },
    },
    getters:{
        users: state => state._users,
        user: state => state._user,
    }
});