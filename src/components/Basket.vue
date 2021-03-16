<template>
    <div>
        <ul id="shoppingBasket">
            Menu:
            <li v-for="item in itemsSelected" :key="item[0]">
                {{item[0]}} x {{item[1]}}
            </li>

            <br><br>
            
            <button v-on:click="findTotal(); sendOrder()">Add Order</button>

            <div v-show="calculationShown">
                <p> Subtotal: ${{ sub_total }} </p>
                <p> Grand Total: ${{ findGrandTotal }} </p>
            </div>
        </ul>

    </div>    
</template>

<script>
    import database from '../firebase.js';
    export default {
        data() {
            return {
                calculationShown: false,
                sub_total: 0,
            }
        },
        props: {
            itemsSelected: {
                type: Array
            }
        },

        methods: {
            findTotal: function() {
                var curr = 0;
                for (var i = 0 ; i < this.itemsSelected.length; i++) {
                    curr += this.itemsSelected[i][1] * this.itemsSelected[i][2];
                }
                this.sub_total=curr;
                this.calculationShown = true;
            },
            
            sendOrder: function() {
                var order = {}

                for (let i=0; i< this.itemsSelected.length; i++) {
                    var item = this.itemsSelected[i];
                    order[item[0]] = item[1]
                }

                var names = ['Prawn omelette', "Dry Beef Hor Fun", "Sambal KangKung", "Pork Fried Rice", "Mapo Tofu", "Cereal Prawn"]
                for (let i=0; i< names.length; i++) {
                    if (!(names[i] in order)) {
                        order[names[i]] = 0
                    }
                }
                console.log(order);
                database.collection('orders').add(order).then(() => location.reload());
            }
        },

        computed: {
            findGrandTotal: function () {
                var grandTotal = this.sub_total *1.07;
                return grandTotal.toFixed(2);
            }
        }
    }
</script>

<style scoped>

    /* #shoppingBasket {
    position: absolute; 
    top: 23%;
    left: 78%;
    } */
</style>