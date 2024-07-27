const pingThingStatsRequest =  fetch(
    '/api/api/v1/ping-thing-stats/mainnet.json?interval=1',
    {
        headers: {
            'Token': 'WKbLWvVjERoQ5utRzC842fZN',
            'Content-Type': 'application/json',
        },
    }
);

console.log(pingThingStatsRequest)