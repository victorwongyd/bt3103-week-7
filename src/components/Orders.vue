<template>
    <div>
        <ul id="orders">
            <li v-for="order in orders" v-bind:key='order.id'>
                <div v-for = 'eachOrder in order.slice(1)' :key='eachOrder'>
                    <ul>
                        <li v-for="(key,value) in eachOrder" v-bind:key = "key">
                            {{ value }} : {{ key }}
                        </li>
                    </ul>
                    <button v-bind:id='order[0]' v-on:click='deleteItem($event)'>Delete</button>
                    <button v-bind:id='order[0]' v-on:click='route($event)'>Modify</button>
                </div>
            </li>


        </ul>
    </div>    
</template>


<script>
    import database from '../firebase.js'

    export default {
        data() {
            return {
                orders:[]
            }
        },

        methods: {
            fetchItems: function() {
                database.collection('orders').get().then((querySnapShot)=>{
                    querySnapShot.forEach(doc=>{
                        this.orders.push([doc.id, doc.data()]) 
                    })
                })
                console.log(this.orders);
            },
            deleteItem: function(event) {
                let doc_id = event.target.getAttribute('id');
                database.collection('orders').doc(doc_id).delete().then(() => location.reload());
            },
            route: function(event) {
                let doc_id = event.target.getAttribute('id');
                this.$router.push({name: "modify", params: {id: doc_id}})
            }
        },

        created() {
           this.fetchItems()
        }
    }

</script>

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

    li ul {
        width: 70%;
        float:left
    }

    li ul li {
        flex-grow: 1;
        flex-basis: 300px;
        text-align: center;
        padding: 0px;
        border: 0px;
        margin: 0px;
    }

    button {
        width: 65px;
        height: 30px;
        background-color: #f7cac9;
        border-radius: 10px;
        border-width: 1px;
    }
</style>