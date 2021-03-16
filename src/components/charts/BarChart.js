import { Bar } from 'vue-chartjs';
import database from '../../firebase.js';

export default {
    extends: Bar,
    data: function () {
        return {
            datacollection: {
                labels: [],
                datasets: [{
                    label: "Number of orders",
                    backgroundColor: ['aqua','lightgreen','red','orange', 'yellow'],
                    data: []
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Total number of orders from Victor\'s Food'
                },
                responsive: true,
                maintainAspectRatio: false,
                scales:{
                    yAxes:[{
                        ticks:{
                            min:0
                        }
                     }],
                }
            }
        }
    },
    methods: {
        fetchItems: function () {
            database.collection('orders').get().then(querySnapShot => {
                querySnapShot.forEach(doc => { 
                    var keys = Object.keys(doc.data()).sort();
                    this.datacollection.labels = keys;
                    
                    for (let i = 0; i < keys.length; i++) {
                        if (this.datacollection.datasets[0].data[i] === undefined) {
                            this.datacollection.datasets[0].data.push(parseInt(doc.data()[keys[i]]));
                            console.log('initially added ' + parseInt(doc.data()[keys[i]]) + " to " + keys[i]);
                            console.log('im here');
                        } else {
                            this.datacollection.datasets[0].data[i] += parseInt(doc.data()[keys[i]]);
                            console.log("added " + doc.data()[keys[i]] + " to " + keys[i]);
                        }
                        console.log(this.datacollection.datasets[0].data);
                    }
                    console.log(this.datacollection.datasets[0])
                    console.log(this.datacollection.labels)
                    

                })
                this.renderChart(this.datacollection, this.options);
            })
        }
    },
    created () {
        this.fetchItems()
    }
}