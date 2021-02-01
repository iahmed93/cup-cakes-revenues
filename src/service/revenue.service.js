const moment = require('moment');
const PRICES = require('../constant/prices');

module.exports = {

    async calculateBasicRevenueTotals(dateToNumbersMap) {
        // console.log(dateToNumbersMap)
        const basicRevenues = {
            yearly: {},
            monthly: {},
            weekly: {}
        }
        for (let key in dateToNumbersMap) {
            const dayRevenue = dateToNumbersMap[key] * PRICES.BASIC_CUPCAKES;
            const date = moment(key, "MM-DD-YYYY");
            const year = date.year();
            const month = moment(key, "MM-DD-YYYY").endOf('month');
            const week = moment(key, "MM-DD-YYYY").endOf('week');
            
            if (!basicRevenues.yearly[year]){
                basicRevenues.yearly[year] = 0;
            }
            basicRevenues.yearly[year] += dayRevenue;

            if(!basicRevenues.monthly[month]){
                basicRevenues.monthly[month] = 0;
            }
            basicRevenues.monthly[month] += dayRevenue;

            if(!basicRevenues.weekly[week]){
                basicRevenues.weekly[week] = 0;
            }
            basicRevenues.weekly[week] += dayRevenue;
        }
        // console.log(basicRevenues);
        return basicRevenues;
    },
    async calculateDeluxeRevenueTotals(dateToNumbersMap) {
        // console.log(dateToNumbersMap)
        const deluxeRevenues = {
            yearly: {},
            monthly: {},
            weekly: {}
        }
        for (let key in dateToNumbersMap) {
            const dayRevenue = dateToNumbersMap[key] * PRICES.DELUXE_CUPCAKES;
            const date = moment(key, "MM-DD-YYYY");
            const year = date.year();
            const month = moment(key, "MM-DD-YYYY").endOf('month');
            const week = moment(key, "MM-DD-YYYY").endOf('week');
            
            if (!deluxeRevenues.yearly[year]){
                deluxeRevenues.yearly[year] = 0;
            }
            deluxeRevenues.yearly[year] += dayRevenue;

            if(!deluxeRevenues.monthly[month]){
                deluxeRevenues.monthly[month] = 0;
            }
            deluxeRevenues.monthly[month] += dayRevenue;

            if(!deluxeRevenues.weekly[week]){
                deluxeRevenues.weekly[week] = 0;
            }
            deluxeRevenues.weekly[week] += dayRevenue;
        }
        // console.log(deluxeRevenues);
        return deluxeRevenues;
    },
    async calculateDailyTotalRevenuesTotals(dateToNumbersMap) {
        // console.log(dateToNumbersMap)
        const dailyTotalRevenues = {
            yearly: {},
            monthly: {},
            weekly: {}
        }
        for (let key in dateToNumbersMap) {
            const dayRevenue = dateToNumbersMap[key];
            const date = moment(key, "MM-DD-YYYY");
            const year = date.year();
            const month = moment(key, "MM-DD-YYYY").endOf('month');
            const week = moment(key, "MM-DD-YYYY").endOf('week');
            
            if (!dailyTotalRevenues.yearly[year]){
                dailyTotalRevenues.yearly[year] = 0;
            }
            dailyTotalRevenues.yearly[year] += dayRevenue;

            if(!dailyTotalRevenues.monthly[month]){
                dailyTotalRevenues.monthly[month] = 0;
            }
            dailyTotalRevenues.monthly[month] += dayRevenue;

            if(!dailyTotalRevenues.weekly[week]){
                dailyTotalRevenues.weekly[week] = 0;
            }
            dailyTotalRevenues.weekly[week] += dayRevenue;
        }
        // console.log(dailyTotalRevenues);
        return dailyTotalRevenues;
    },

}