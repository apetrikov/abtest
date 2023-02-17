/**
 * Tracks a pageview to our "imaginary api" - in this demo just the browser console. ;)
 * Send as params whatever you might seem valuable to send.
 * The URL is probably a good start though.
 */


// here we will send other data from navigator
type Payload = {
  userId: string,
  ts: number,
  url: string,
}

type PageViewPayload  = Payload & {
    type: 'load' | 'unload'
}

type EventPayload = Payload & {
    type: 'click'
}

type CodePayload = Payload & {
  data: string
}

// send page events like open, close, scroll
export const trackPageview = (payload: PageViewPayload): void => {
    const parsed: String = JSON.stringify(payload)
    console.log(`--> Tracking Pageview: ${parsed}`);
};

// sent user events like press, click
export const trackEvent = (payload: EventPayload): void => {
    const parsed: String = JSON.stringify(payload)
    console.log(`--> Tracking Event: ${parsed}`);
};

export const trackCodeEvent = (payload: CodePayload): void => {
  const parsed: String = JSON.stringify(payload)
  console.log(`--> Tracking code event: ${parsed}`);
};