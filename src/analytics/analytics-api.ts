/**
 * Tracks a pageview to our "imaginary api" - in this demo just the browser console. ;)
 * Send as params whatever you might seem valuable to send.
 * The URL is probably a good start though.
 */

type PageViewPayload = {
    url: string,
    type: 'load' | 'leave'
}

type EventPayload = {
    url: string,
    type: 'click'
}

// send page events like open, close, scroll
export const trackPageview = (payload: PageViewPayload): void => {
    console.log(`--> Tracking Pageview: ${payload}`);
};

// sent user events like press, click
export const trackEvent = (payload: EventPayload): void => {
    console.log(`--> Tracking Event: ${payload}`);
};
