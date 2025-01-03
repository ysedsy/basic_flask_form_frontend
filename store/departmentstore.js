import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [],
        user: null,
    }),
    actions: {
        async fetchUsers() {
            try {
                const response = await useFetch('/api/users');
                this.users = response.data;
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        async fetchUser(id) {
            try {
                const response = await useFetch(`/api/users/${id}`);
                this.user = response.data;
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        },
        async createUser(userData) {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData),
                };
                const response = await $fetch('/api/users', requestOptions);
                this.users.push(response.data);
            } catch (error) {
                console.error('Error creating user:', error);
            }
        },
        async updateUser(id, userData) {
            try {
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData),
                };
                const response = await $fetch(`/api/users/${id}`, requestOptions);
                const index = this.users.findIndex(user => user.id === id);
                if (index !== -1) {
                    this.users[index] = response.data;
                }
            } catch (error) {
                console.error('Error updating user:', error);
            }
        },
        async deleteUser(id) {
            try {
                const requestOptions = {
                    method: 'DELETE',
                };
                await $fetch(`/api/users/${id}`, requestOptions);
                this.users = this.users.filter(user => user.id !== id);
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        },
    },
    getters:{
        departments: state => state._departments,
        department: state => state._department,
    }
});