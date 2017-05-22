import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GroupModel } from "../../models/group.model";
import { HealthDataService } from "../../services/healthdata.service";
import { Chart } from 'chart.js';

@Component({
  selector: 'group-view',
  templateUrl: 'groupView.component.html'
})
export class GroupView {

    // Aggregates
    public totalMiles: any;
    public avgMiles: any;
    public totalSteps: any;
    public avgSteps: any;
    public totalCalories: any;
    public avgCalories: any;
    public totalHeartRate: any;
    public avgHeartRate: any;
    public count: any;
    public done: boolean;

    // Graph points
    public datesList: any;
    public milesList: any;
    public caloriesList: any;
    public stepsList: any;
    public heartRatesList: any;

    @ViewChild('lineCanvas') lineCanvas;
    @ViewChild('stepsCanvas') stepsCanvas;
    @ViewChild('caloriesCanvas') caloriesCanvas;
    @ViewChild('ratesCanvas') ratesCanvas;
    lineChart: any;
    stepChart: any;
    caloriesChart: any;
    ratesChart: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private health: HealthDataService) {}

    public Group:GroupModel = this.navParams.get('group');

    private calculate () {
        for (let workout of this.Group.workouts) {
            this.totalMiles += workout.miles;
            this.totalCalories += workout.calories;
            this.queryWorkoutData(workout.startTime, workout.endTime, workout.date);
            this.datesList.push(workout.date);
            this.milesList.push(workout.miles);
            this.caloriesList.push(workout.calories);
        }
        this.avgMiles = (this.totalMiles / this.Group.workouts.length).toFixed(2);
        this.avgCalories = (this.totalCalories / this.Group.workouts.length).toFixed(2);
    }

    private queryWorkoutData(start, end, date) {
        this.health.getStepCount(start, end).then(result => {
            this.totalSteps += Math.round(result[0].quantity);
            this.stepsList.push(Math.round(result[0].quantity));
            if (this.stepsList.length == this.Group.workouts.length) {
                this.avgSteps = Math.ceil((this.totalSteps / this.stepsList.length));
                this.stepsChart();
            }
        }, error => {
            console.log("ERROR -> " + JSON.stringify(error));
        });

        this.health.getHeartRates(start, end).then(result => {
            this.totalHeartRate += result[0].quantity;
            this.heartRatesList.push(Math.round(result[0].quantity));
            if (this.heartRatesList.length == this.Group.workouts.length) {
                this.avgHeartRate = (this.totalHeartRate / this.heartRatesList.length).toFixed(2);
                this.makeRatesChart();
            }
        }, error => {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    }

    private makeChart () {
        let self = this;
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: self.datesList,
                datasets: [
                    {
                        label: "Miles",
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: self.milesList,
                        spanGaps: false,
                    }
                ]
            },
            options: { 
            legend: {display: false},
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "white",
                        beginAtZero:true
                    },
                    gridLines: {
                        color: 'black'
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "white",
                    },
                    gridLines: {
                        color: 'black'
                    }
                }]
            }
        }
 
        });
    }

    private makeCaloriesChart () {
        let self = this;
        this.caloriesChart = new Chart(this.caloriesCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: self.datesList,
                datasets: [
                    {
                        label: "Calories",
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: "rgba(127, 191, 63, .4)",
                        borderColor: "rgba(127, 191, 63, 1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(127, 191, 63, 1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: self.caloriesList,
                        spanGaps: false,
                    }
                ]
            },
            options: { 
            legend: {display: false},
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "white",
                        beginAtZero:true
                    },
                    gridLines: {
                        color: 'black'
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "white",
                    },
                    gridLines: {
                        color: 'black'
                    }
                }]
            }
        }
 
        });
    }

    private stepsChart () {
        let self = this;
        this.stepChart = new Chart(this.stepsCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: self.datesList,
                datasets: [
                    {
                        label: "Steps",
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: "rgba(127, 63, 191, .4)",
                        borderColor: "rgba(127, 63, 191, 1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(127, 63, 191, .7)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(127, 63, 191, 1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: self.stepsList,
                        spanGaps: false,
                    }
                ]
            },
            options: { 
            legend: {display: false},
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "white",
                        beginAtZero:true
                    },
                    gridLines: {
                        color: 'black'
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "white",
                    },
                    gridLines: {
                        color: 'black'
                    }
                }]
            }
        }
 
        });
    }

    private makeRatesChart () {
        let self = this;
        this.ratesChart = new Chart(this.ratesCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: self.datesList,
                datasets: [
                    {
                        label: "Heart Rates",
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: "rgba(230, 53, 30, .4)",
                        borderColor: "rgba(230, 53, 30, 1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(230, 53, 30, .7)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(230, 53, 30, 1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: self.heartRatesList,
                        spanGaps: false,
                    }
                ]
            },
            options: { 
            legend: {display: false},
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "white",
                        beginAtZero:true
                    },
                    gridLines: {
                        color: 'black'
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "white",
                    },
                    gridLines: {
                        color: 'black'
                    }
                }]
            }
        }
 
        });
    }

    ngOnInit () {
        this.done = false;
        this.totalMiles = 0;
        this.avgMiles = 0;
        this.totalSteps = 0;
        this.avgSteps = 0;
        this.totalCalories = 0;
        this.avgCalories = 0;
        this.totalHeartRate = 0;
        this.avgHeartRate = 0;
        this.count = 0;
        this.stepsList = [];
        this.milesList = [];
        this.datesList = [];
        this.caloriesList = [];
        this.heartRatesList = [];
        this.calculate();
        this.makeChart();
        this.makeCaloriesChart();
    }

}
