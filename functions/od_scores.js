const {GoogleAuth} = require('google-auth-library');
const {google} = require('googleapis');
const sheets = google.sheets('v4');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

const sheets_list = {
    "Finance": "ODI",
    "BD": "ODI",
    "EwA": "ODI",
    "IM+Mkt": "ODI",
    "iGV": "ODI",
    "oGV": "ODI",
    "iGTa": "ODI",
    "iGTe": "ODI",
    "oGTa": "ODI",
    "oGTe": "ODI",
    "MXP": "ODI",
    "PDI": "ODI",
    "HDI": "ODI",
    "ODI": "ODI"
}

const columns = {
    "Finance": ["K", "K"],
    "BD": ["L", "L"],
    "EwA": ["J", "J"],
    "IM+Mkt": ["M", "M"],
    "iGV": ["C", "C"],
    "oGV": ["D", "D"],
    "iGTa": ["H", "H"],
    "iGTe": ["G", "G"],
    "oGTa": ["E", "E"],
    "oGTe": ["F", "F"],
    "MXP": ["I", "I"],
    "PDI": ["N", "N"],
    "HDI": ["O", "O"],
    "ODI": ["P", "P"]
}

const metrics_count = {
    "Finance": 1,
    "BD": 1,
    "EwA": 1,
    "IM+Mkt": 1,
    "iGV": 1,
    "oGV": 1,
    "iGTa": 1,
    "iGTe": 1,
    "oGTa": 1,
    "oGTe": 1,
    "MXP": 1,
    "PDI": 1,
    "HDI": 1,
    "ODI": 1
}

const sort = {
    "Finance": 8,
    "BD": 9,
    "EwA": 10,
    "IM+Mkt": 10.5,
    "iGV": 1,
    "oGV": 2,
    "iGTa": 3,
    "iGTe": 5,
    "oGTa": 4,
    "oGTe": 6,
    "MXP": 7,
    "PDI": 10.75,
    "HDI": 11,
    "ODI": 12
}

const entities = ["CC", "CN", "CS", "Kandy", "USJ", "Ruhuna", "SLIIT", "NSBM"]
const month_names = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

module.exports = {
    add: async function (function_name, month) {
        const range_name = getRange(function_name, month);
        console.log(function_name, month, "Range:", range_name);

        const auth = new GoogleAuth({
            keyFilename: 'credentials/sheets_service_account.json',
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        });

        let results = await sheets.spreadsheets.values.get({
            spreadsheetId: "1hxXP7QKBgUJkBgwVst9rUxSu-hKlPeeJl1kb8a7F9hY",
            range: range_name,
            auth: auth
        })

        const values = results.data.values;
        console.log("Result:", values);

        let year = 2022;
        if (month >= 13) year = 2023;

        let data = {
            function: function_name,
            sort: sort[function_name],
            month_name: year + " " + month_names[(month-1)%12],
            month: month,
        }

        for (let i = 0; i < values.length; i++) {
            const float_val = parseFloat(values[i][metrics_count[function_name] - 1 ]);
            if (isNaN(float_val)) data[entities[i]] = 0;
            else data[entities[i]] = float_val;
        }
        console.log("Data:", data);

        await db.collection('scores').doc(function_name + "-" + month_names[(month-1)%12] + "-2022").set(data);
        return data;
    }
}

function getRange(function_name, month) {
    return sheets_list[function_name] + "!" + columns[function_name][0] + (2 + (month - 2) * 8) + ":" +
        columns[function_name][1] + (9 + (month - 2) * 8);
}
