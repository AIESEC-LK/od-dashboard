const {GoogleAuth} = require('google-auth-library');
const {google} = require('googleapis');
const sheets = google.sheets('v4');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

const sheets_list = {
    "Finance": "ODI"	,
    "BD"	: "ODI"	,
    "EwA & PR"	: "ODI"	,
    "Product Marketing"	: "ODI"	,
    "Brand MKT"	: "ODI"	,
    "EM"	: "ODI"	,
    "IM"	: "ODI"	,
    "iGV"	: "ODI"	,
    "oGV"	: "ODI"	,
    "iGTa/iGTe"	: "ODI"	,
    "oGTa/oGTe"	: "ODI"	,
    "TM"	: "ODI"	,
    "XDI"	: "ODI"	,
    "HDI"	: "ODI"	,
    "ODI"	: "ODI"	
}

const columns = {
    "Finance"	        : ["C", "C"]	,
    "BD"	            : ["D", "D"]	,
    "EwA & PR"	        : ["E", "E"]	,
    "Product Marketing"	: ["F", "F"]	,
    "Brand MKT"	        : ["G", "G"]	,
    "EM"	            : ["H", "H"]	,
    "IM"	            : ["I", "I"]	,
    "iGV"	            : ["J", "J"]	,
    "oGV"	            : ["K", "K"]	,
    "iGTa/iGTe"	        : ["L", "L"]	,
    "oGTa/oGTe"	        : ["M", "M"]	,
    "TM"	            : ["N", "N"]	,
    "XDI"	            : ["O", "O"]	,
    "HDI"	            : ["P", "P"]	,
    "ODI"	            : ["Q", "Q"]
}

const metrics_count = {
    "Finance"	: 1	,
    "BD"	: 1	,
    "EwA & PR"	: 1	,
    "Product Marketing"	: 1	,
    "Brand MKT"	: 1	,
    "EM"	: 1	,
    "IM"	: 1	,
    "iGV"	: 1	,
    "oGV"	: 1	,
    "iGTa/iGTe"	: 1	,
    "oGTa/oGTe"	: 1	,
    "TM"	: 1	,
    "XDI"	: 1	,
    "HDI"	: 1	,
    "ODI"	: 1	
}

const sort = {
    "Finance"	:	6	,
    "BD"	    :	7	,
     "EwA & PR"	:	8	,
    "Product Marketing"	:	9	,
    "Brand MKT"	:	10	,
    "EM"	    :	10.25	,
    "IM"	    :	10.5	,
    "iGV"	    :	1	,
    "oGV"	    :	2	,
    "iGTa/iGTe"	:	3	,
    "oGTa/oGTe"	:	4	,
    "TM"	    :	5	,
    "XDI"	    :	10.75	,
    "HDI"	    :	11	,
    "ODI"	    :	12	
}

const entities = ["CC", "CN", "CS", "Kandy", "USJ", "Ruhuna", "SLIIT", "NSBM", "NIBM"]
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
            spreadsheetId: "12cMEAeC-uqEJZLkBLIGJwa2LV26N6taXBKF0wc9_lVk",
            range: range_name,
            auth: auth
        })

        const values = results.data.values;
        console.log("Result:", values);

        let year = 2023;
        if (month >= 13) year = 2024;

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

        await db.collection('scores').doc(function_name + "-" + month_names[(month-1)%12] + "-2023").set(data);
        return data;
    }
}

function getRange(function_name, month) {
    return sheets_list[function_name] + "!" + columns[function_name][0] + (2 + (month - 2) * 8) + ":" +
        columns[function_name][1] + (9 + (month - 2) * 8);
}
