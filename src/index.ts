import "./styles.css";
import {CTA_SELECTOR, userId, isRegisteredUser} from "./const";
import {initAnalytics} from "./analytics/analytics";
import {initABTest} from "./ab-test"

// Your code here

// Parse HTML for test info
// Parse cookies
// Compare cookies and HTML
// Apply final variant changes to HTML


// TODO

// Add analytics tracker
const url: string = window.location.href

const logger = initAnalytics(userId, url, CTA_SELECTOR)
initABTest({url, userId, isRegisteredUser}, logger)




// Work with HTML service
// Work with cookie service
// Log errors servise