<template>
   <div>
       
    <ul>
        <li>
        <router-link to="/home" exact>Home </router-link>
        </li>
        <li>
        <router-link to="/orders" exact>Order</router-link>
        </li>
        <li>
        <router-link to="/dashboard" exact>Dashboard</router-link>
        </li>

    </ul>
    </div>
  
</template>

<style scoped>
    ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
    }
    li {
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 10px;
    border: 1px solid #222;
    margin: 10px;
    }

</style>