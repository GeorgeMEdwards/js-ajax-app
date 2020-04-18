/**
 * @class TaskList
 *
 * Creates a list of tasks and updates a list
 */

class Employee {
    constructor(title, name, phone) {
      this.title = title;
      this.name = name;
      this.phone = phone;
    }
  }
  
  // UI Class: Handle UI Tasks
  class UI {
    static displayEmployees() {
      const employees = Store.getEmployees();
  
      employees.forEach((employee) => UI.addEmployeeToList(employee));
    }
  
    static addEmployeeToList(employee) {
      const list = document.querySelector('#employee-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${employee.title}</td>
        <td>${employee.name}</td>
        <td>${employee.phone}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deleteEmployee(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#employee-form');
      container.insertBefore(div, form);
  
      // Clear in 3 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
  
    static clearFields() {
      document.querySelector('#title').value = '';
      document.querySelector('#name').value = '';
      document.querySelector('#phone').value = '';
    }
  }
  
  // Store Class: Handles Storage
  class Store {
    static getEmployees() {
      let employees;
      if(localStorage.getItem('employees') === null) {
        employees = [];
      } else {
        employees = JSON.parse(localStorage.getItem('employees'));
      }
  
      return employees;
    }
  
    static addEmployee(employee) {
      const employees = Store.getEmployees();
      employees.push(employee);
      localStorage.setItem('employees', JSON.stringify(employees));
    }
  
    static removeEmployee(phone) {
      const employees = Store.getEmployees();
  
      employees.forEach((employee, index) => {
        if(employee.phone === phone) {
          employees.splice(index, 1);
        }
      });
  
      localStorage.setItem('employees', JSON.stringify(employees));
    }
  }
  
  // Event: Display Employees
  document.addEventListener('DOMContentLoaded', UI.displayEmployees);
  
  // Event: Add an Emloyee
  document.querySelector('#employee-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
  
    // Get form values
    const title = document.querySelector('#title').value;
    const name = document.querySelector('#name').value;
    const phone = document.querySelector('#phone').value;
  
    // Validate
    if(title === '' || name === '' || phone === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
      // Instatiate employee
      const employee = new Employee(title, name, phone);
  
      // Add Employee to UI
      UI.addEmployeeToList(employee);
  
      // Add employee to store
      Store.addEmployee(employee);
  
      // Show success message
      UI.showAlert('Employee Added', 'success');
  
      // Clear fields
      UI.clearFields();
    }
  });
  
  // Event: Remove an Employee
  document.querySelector('#employee-list').addEventListener('click', (e) => {
    // Remove employee from UI
    UI.deleteEmployee(e.target);
  
    // Remove employee from store
    Store.removeEmployee(e.target.parentElement.previousElementSibling.textContent);
  
    // Show success message
    UI.showAlert('Employee Removed', 'success');
  });