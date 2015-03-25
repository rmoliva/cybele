NS('AdminJS.test');

AdminJS.test.Callbacks = function(sb) {
    'use strict';

    var getDateRangeActivities = function(startDate, endDate) {
        return new Promise(function(resolve, reject) {
            var data = [],
                i;

            data.push([]);
            data.push([]);
            data.push([]);
            data.push([]);

            for (i = 0; i < 12; i++) {
                data[0].push(Math.random() * 30);
            }
            for (i = 0; i < 12; i++) {
                data[1].push(Math.random() * 30);
            }
            for (i = 0; i < 12; i++) {
                data[2].push(Math.random() * 30);
            }
            for (i = 0; i < 12; i++) {
                data[3].push(Math.random() * 30);
            }

            resolve({
                title: {
                    text: 'Resolución de actividades',
                    x: -20 //center
                },
                subtitle: {
                    text: '',
                    x: -20
                },
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                    ]
                },
                yAxis: {
                    title: {
                        text: 'Num. Actividades '
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: 'Num'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: 'Tokyo',
                    data: data[0]
                }, {
                    name: 'New York',
                    data: data[1]
                }, {
                    name: 'Berlin',
                    data: data[2]
                }, {
                    name: 'London',
                    data: data[3]
                }]
            });
        });
    };

    return {
        getDateRangeActivities: getDateRangeActivities
    };
};
