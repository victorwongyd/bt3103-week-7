<template>
    <div>
        <button v-on:click="subtracting()">-</button>    
        <span>{{ nCounter }}</span>
        <button v-on:click="adding()">+</button>
    </div>    
</template>


<script>
    export default {
        data () {
            return {
                nCounter: 0
            }
        },

        props: {
            item: {
                type: Object
            }
        },

        methods: {
            adding: function() {
                if (this.nCounter === 10) {
                    alert("You cannot buy more than 10 items.")
                } else {
                    this.nCounter++
                }
                this.$emit('counter', this.item, this.nCounter)
            },
            subtracting: function() {
                if (this.nCounter === 0) {
                    alert("Cannot buy negative items.")
                } else {
                    this.nCounter--
                }
                this.$emit('counter', this.item, this.nCounter)
            }
        }
    }
</script>
<style scoped>
    button{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;  
    text-align: center;
    margin: 4px 4px;
    font-size: 16px;
    background-color: #dc143c;
    border-radius: 4px;
    padding: 8px 16px;
    }
</style>