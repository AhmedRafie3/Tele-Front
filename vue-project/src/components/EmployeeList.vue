<template>
  <div class="employee-management">
    <div class="logout-container">
      <button @click="logout" class="logout-button">Logout</button>
    </div>
    <h2>Employee Management</h2>
    <button @click="routeToAddEmployee">Add New Employee</button>

    <table v-if="employees.length > 0">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Grad</th>
          <th v-if="canAddEmployee">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <td>{{ employee.name }}</td>
          <td>{{ employee.phoneNumber }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.grad }}</td>
          <td v-if="canAddEmployee">
            <button @click="editEmployee(employee.id)">Edit</button>
            <button @click="deleteEmployee(employee.id)" class="delete-button">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No employees found.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      employees: []
    };
  },
  computed: {
    canAddEmployee() {
      const userRole = sessionStorage.getItem('userRole');
      if(userRole==1) return true;
      return userRole === 1;
    }
  },
  mounted() {
    this.fetchEmployees();
  },
  methods: {
    async fetchEmployees() {
      try {
        const token = sessionStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.get('https://localhost:7129/api/Employees/GetAllEmployes', config);
        this.employees = response.data;
      } catch (error) {
      }
    },
    routeToAddEmployee() {
      this.$router.push('/addnewemp'); 
    },
    editEmployee(employeeId) {
      this.$router.push(`/editemp/${employeeId}`);
    },
    async deleteEmployee(employeeId) {
      try {
        const token = sessionStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        await axios.delete(`https://localhost:7129/api/Employees/DeleteEmployee?id=${employeeId}`, config);
        this.employees = this.employees.filter(employee => employee.id !== employeeId);
      } catch (error) {
      }
    },
    logout() {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userRole');
      this.$router.push('/'); 
    }
  }
};
</script>

<style scoped>
.employee-management {
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

thead {
  background-color: #f0f0f0;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #e0e0e0;
}

.employee-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

button {
  margin-bottom: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.logout-container {
  text-align: right;
  margin-bottom: 10px;
}

.logout-button {
  padding: 8px 16px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #c82333;
}

.delete-button {
  background-color: #dc3545;
}

.delete-button:hover {
  background-color: #c82333;
}
</style>
