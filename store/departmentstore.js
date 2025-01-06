import { defineStore } from 'pinia';

export const useDepartmentStore = defineStore('department', {
    state: () => ({
        _departments: [],
        _department: null,
    }),
    actions: {
        async fetchDepartments() {
            try {
                const response = await useFetch('http://localhost:9999/api/departments');
                this.departments = response.data;
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        },
        async fetchDepartment(id) {
            try {
                const response = await useFetch(`http://localhost:9999/api/departments/${id}`);
                this.department = response.data;
            } catch (error) {
                console.error('Error fetching department:', error);
            }
        },
        async createDepartment(departmentData) {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(departmentData),
                };
                const response = await $fetch('http://localhost:9999/api/departments', requestOptions);
                this.departments.push(response.data);
            } catch (error) {
                console.error('Error creating department:', error);
            }
        },
        async updateDepartment(id, departmentData) {
            try {
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(departmentData),
                };
                const response = await $fetch(`http://localhost:9999/api/departments/${id}`, requestOptions);
                const index = this.departments.findIndex(department => department.id === id);
                if (index !== -1) {
                    this.departments[index] = response.data;
                }
            } catch (error) {
                console.error('Error updating department:', error);
            }
        },
        async deleteDepartment(id) {
            try {
                const requestOptions = {
                    method: 'DELETE',
                };
                await $fetch(`http://localhost:9999/api/departments/${id}`, requestOptions);
                this.departments = this.departments.filter(department => department.id !== id);
            } catch (error) {
                console.error('Error deleting department:', error);
            }
        },
    },
    getters:{
        departments: state => state._departments,
        department: state => state._department,
    }
});