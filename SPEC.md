### MVP AB-testing

#### Content

1. Description
2. Solution
2. Test creating
3. Test editing
4. Collecting data
5. Detecting the winner
6. Realisation

#### Problem description
- Blog articles are cached via a CDN. It means all variations will be added by content editors to the article and rendered into the DOM.
- Developers have no access to the markup of articles.

We’d like to use AB-testing to learn which content formats wins. In addition, we want to empower our content editors to launch AB-tests without engineering support.
To win means to prove testing Hypothesis. E.g. increase convertion rate after changing color of the CTA button.

#### Solution
- Content editors properly set up ABtests into markup of articles
- We load our ABtesting script to each article. It allows to
    1. Show default variant to registered users
    2. Show random variant for a new user and keep it between sessions
    3. Log errors to our endpoint for debugging
- We load our analytics script to each article. It allows to
    1. Track page events like load/leave
    2. Track user events like clicks
- With analytics info we are able to measure test results and improve our product
- Two parallel AB tests take as many time as two consequent tests. In latter case we could be sure that we tested all variants. We decided to create different variants of the whole article markup because parallel testing has high risk of errors.

#### Test creating
The system handles A/B/n testing. One could apply as many test variants as they need.
- data-test is a unique test name
- data-expiration is a date of test expiration
- data-variant is a name of the test variant
- default variant is the first one
```mermaid
<div data-test="T1" data-expiration="12.06.2024">
    <div class="content" data-variant="A">
        ...content
    </div>
    <div class="content" data-variant="B">
        ...content
    </div>
</div>
```
One apply changes to the CDN and the test begins. We receive analytics data.
After expiration date the first variant is applied.

#### Test editing
Test editing is not possible. One should create a new test with a unique name and push it to CDN. We will collect new data about the new test.

Tests are url-sensitive, test and variant names are case-sensitive.

#### Collecting data
Using analytics API provided by our backend "console.log".
Endpoit receive data as:

```mermaid
userId: string,
ts: number,
url: string,
data: string
```
Test info uses data property.
```mermaid
userId: 1,
ts: 1676652093841,
url: http://localhost:1234/,
data: "AB test, name: T1, variant: B"
```

#### Detecting the winner
Our backend teams receive a lot of ABtest data. Content editors share AB test information about start, end and variants with teams.
After calculating the winner, Content editor apply this variant to the CDN.
Current AB test is finished.

#### Realisation
For MVP abtesting and analytics scripts are located on frontend part. Data send to BE endpoint.
Usage of backend and other services for AB testing is a question of the next iteration.