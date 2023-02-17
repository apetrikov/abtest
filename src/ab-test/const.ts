export enum AB {
  SELECTOR_NAME = 'data-test',  // main selector of the test. Only one per document
  SELECTOR_EXPIRATION = 'data-expiration',  // date of test expiration
  SELECTOR_VARIANT = 'data-variant',  // test variant letter
  SELECTOR_IMAGE = 'data-src'  // for image optimization
}

export enum LS {
  KEY_NAME = 'APP_ABTEST'
}