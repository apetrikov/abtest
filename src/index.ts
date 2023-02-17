import "./styles.css";
import {CTA_SELECTOR, userId} from "./const";
import {initAnalytics} from "./analytics/analytics";

// Your code here

// Parse HTML for test info
// Parse cookies
// Compare cookies and HTML
// Apply final variant changes to HTML


// TODO

// Add analytics tracker
const url: string = window.location.href
initAnalytics(userId, url, CTA_SELECTOR)


// Work with HTML service
// Work with cookie service
// Log errors servise