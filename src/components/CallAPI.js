import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
    extends: Line,
    data: function () {
        return {
            datacollection: {
                labels: [],
                datasets: [
                    {
                        label: "west",
                        data: [],
                        backgroundColor: "red",
                        borderColor: "red",
                        fill: false
                    },
                    {
                        label: "national",
                        data: [],
                        backgroundColor: "blue",
                        borderColor: "blue",
                        fill: false
                    },
                    {
                        label: "east",
                        data: [],
                        backgroundColor: "aqua",
                        borderColor: "aqua",
                        fill: false
                    },
                    {
                        label: "central",
                        data: [],
                        backgroundColor: "green",
                        borderColor: "green",
                        fill: false
                    },
                    {
                        label: "south",
                        data: [],
                        backgroundColor: "yellow",
                        borderColor: "yellow",
                        fill: false
                    },
                    {
                        label: "north",
                        data: [],
                        backgroundColor: "pink",
                        borderColor: "pink",
                        fill: false
                    }],
            },
            options: {
                legend: { display: true },
                title: {
                    display: true,
                    text: 'PSI 24-Hourly Readings (By Region)'
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        fetchItems: function () {
            axios.get('https://api.data.gov.sg/v1/environment/psi?date=2021-02-23').then(response => {
                let records = response.data.items;

                for (var record in records) {
                    this.datacollection.labels.push(records[record]["timestamp"])

                    var psiData = records[record]["readings"]["psi_twenty_four_hourly"]
                    this.datacollection.datasets[0].data.push(psiData['west'])
                    this.datacollection.datasets[1].data.push(psiData['national'])
                    this.datacollection.datasets[2].data.push(psiData['east'])
                    this.datacollection.datasets[3].data.push(psiData['central'])
                    this.datacollection.datasets[4].data.push(psiData['south'])
                    this.datacollection.datasets[5].data.push(psiData['north'])
                }
                this.renderChart(this.datacollection, this.options)
            })
        }
    },
    created() {
        this.fetchItems()
    }
}