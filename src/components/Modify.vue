<template>
    <div>
        <ul id="modifiers">
            <li v-for="(number, name, index) in datapacket" v-bind:key="index">
                {{ name }} : {{ number }}<br>
                <input v-bind:id=index placeholder="0" type ="number" min = "0" max = "10">
            </li>
            <button v-on:click='updateOrder'>Update Order</button>
        </ul>
    </div>    
</template>


<script>
    import database from '../firebase.js'

    export default {
        data() {
            return {
                datapacket: {}
            }
        },

        props: {
            id: {
                type: String,
            }
        },

        methods: {
            fetchItems: function() {
                database.collection('orders').doc(this.id).get().then((querySnapShot)=>{
                    this.datapacket = querySnapShot.data();
                    console.log(this.datapacket);

                    // querySnapShot.forEach(doc=>{
                    //     this.orders.push([doc.id, doc.data()]) 
                    // })
                })
            },
            updateOrder: function() {
                var updatedOrder = {};
                for (var order in this.datapacket) {
                    updatedOrder[order] = this.datapacket[order];
                    // console.log(order);
                    // console.log(this.datapacket[order]);
                    // console.log(updatedOrder);
                }
                console.log(updatedOrder);

                var currIndex = 0;
                for (var item in updatedOrder) {
                    console.log(item);
                    var newNum = document.getElementById(currIndex).value;
                    console.log(newNum);

                    if (newNum != '') {
                        updatedOrder[item] = newNum;
                    } else {
                        updatedOrder[item] = 0;
                    }
                    
                    currIndex++;
                }

                database.collection('orders').doc(this.id).update(updatedOrder).then(() => this.$router.push("orders"));
            }
        },

        created() {
           this.fetchItems()
        }
    }

</script>

<style scoped>
    ul {
        /* display: flex;
        flex-wrap: wrap; */
        list-style-type: none;
        /* padding: 0; */
    }
    li {
        flex-grow: 1;
        flex-basis: 300px;
        /* text-align: center; */
        /* padding: 10px; */
        /* border: 1px solid #222; */
        margin: 10px;
    }
    
    /*
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
    } */

    button {
        width: 65px;
        height: 30px;
        background-color: #f7cac9;
        border-radius: 10px;
        border-width: 1px;
    }
</style>