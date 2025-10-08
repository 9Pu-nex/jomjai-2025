// Configuration file
// Replace this URL with your Google Apps Script Web App URL
const CONFIG = {
    // Your Google Apps Script Web App URL (after deploying code.gs)
    SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbweN3SZzba0XZlgti1Pv0GimndqeEiD-Rmq20QEPoyjBvXp1_z0Zh2_p_InC7whg_1ZQg/exec',

    // Room configurations
    ROOMS: {
        floor1: {
            title: "1st Floor",
            rooms: {
                d101: { name: "D101 Music Room", url: "https://tinyurl.com/jomjai-d101" },
                d102: { name: "D102 Food and Nutrition", url: "https://tinyurl.com/jomjai-d102" },
                i101: { name: "I101 Classroom", url: "https://tinyurl.com/jomjai-i101" },
                s101: { name: "S101 Science Lab", url: "https://tinyurl.com/jomjai-s101" }
            }
        },
        floor2: {
            title: "2nd Floor",
            rooms: {
                d201: { name: "D201 Classroom", url: "https://tinyurl.com/jomjai-d201" },
                d202: { name: "D202 Classroom", url: "https://tinyurl.com/jomjai-d202" },
                d203: { name: "D203 Classroom", url: "https://tinyurl.com/jomjai-d203" },
                d204: { name: "D204 Chinese Room", url: "https://tinyurl.com/jomjai-d204" },
                d205: { name: "D205 Thai Room", url: "https://tinyurl.com/jomjai-d205" }
            }
        },
        floor3: {
            title: "3rd Floor",
            rooms: {
                d301: { name: "D301 Classroom", url: "https://tinyurl.com/jomjai-d301" },
                d302: { name: "D302 Classroom", url: "https://tinyurl.com/jomjai-d302" },
                d303: { name: "D303 Classroom", url: "https://tinyurl.com/jomjai-d303" },
                d304: { name: "D304 Classroom", url: "https://tinyurl.com/jomjai-d304" },
                d305: { name: "D305 Classroom", url: "https://tinyurl.com/jomjai-d305" },
                d306: { name: "D306 Classroom", url: "https://tinyurl.com/jomjai-d306" },
                i301: { name: "I301 Art Room", url: "https://tinyurl.com/jomjai-i301" },
                s301: { name: "S301 Guidance Room", url: "https://tinyurl.com/jomjai-s301" },
                s302: { name: "S302 STEM Room", url: "https://tinyurl.com/jomjai-s302" }
            }
        }
    }
};
