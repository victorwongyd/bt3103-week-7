<template>
    <div>
        <ul id="items">
            
            <li v-for="item in items" v-bind:key='item.name'>
                {{ item.name }} <br> 
                <img :src="item.imageURL"> <br> 
                ${{ item.price }} <br> 
                
                <QuantityCounter v-on:counter="onCounter" v-bind:item="item" ></QuantityCounter>
            </li>
        </ul>
    <Basket v-bind:itemsSelected = "itemsSelected" id="shoppingBasket"></Basket>
    </div>    
</template>


<script>
    import QuantityCounter from './QuantityCounter.vue'
    import Basket from './Basket.vue'
    import database from '../firebase.js'

    export default {
        data() {
            return {
                itemsSelected : [],
                items:[]
            }
        },
        // props: {
        //     itemsList: {
        //         type: Array
        //     }
        // },

        methods: {
            onCounter: function (item, count) {
                if (this.itemsSelected.length === 0 && count > 0) {
                    //If there is nothing in items selected, push the ORDER in
                    this.itemsSelected.push([item.name, count, item.price]);
                } else {
                    const initial_length = this.itemsSelected.length;
                    var found = false;

                    // Loop through everything to check what is not in the basket
                    for (let i = 0; i < this.itemsSelected.length; i++) {
                        const curr_item = this.itemsSelected[i];
                        const item_name = curr_item[0];

                        // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
                        if (item_name === item.name && count > 0) {
                            this.itemsSelected.splice(i, 1, [item.name, count, item.price]);
                            found = true;
                            console.log(this.itemsSelected[i][1]);

                        // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
                        } else if (item_name === item.name && count === 0) {
                            this.itemsSelected.splice(i, 1); // (0,1,2)
                             i--;
                             found = true;
                             console.log(this.itemsSelected);

                        // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
                        }  
                        if ((i+1 == initial_length) && (!(found))) {
                            this.itemsSelected.push([item.name, count, item.price]);
                        }
                    }
                }
            },

            fetchItems: function() {
                database.collection('menu').get().then((querySnapShot)=>{
                    let item={}
                    querySnapShot.forEach(doc=>{
                        item=doc.data()
                        item.show=false
                        item.id=doc.id
                        this.items.push(item) 
                    })
                })
                console.log(this.items);
            },
        },

        components: {
            QuantityCounter,
            Basket
        },

        created() {
           this.fetchItems()
        }
    }
</script>

<style scoped>
    #itemsList {
    width: 100%;
    max-width: 70%;
    margin: 0px;
    padding: 0 5px;
    box-sizing: border-box;
    }

    ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
    width: 70%
    }

    li {
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 10px;
    border: 1px solid #222;
    margin: 10px;
    }

    img {
    width: 135px;
    height: 135px;
    }

    #price {
    font-size: 30px;
    }

    #itemName {
    font-size: 30px;
    }

    #shoppingBasket {
    position: absolute;
    top: 30%;
    left: 70%;
    }
</style>