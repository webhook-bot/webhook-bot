'use strict';

const WEBHOOK = Symbol('Application#webhook');

module.exports = {
  webhook() {
    if (this[WEBHOOK]) return this[WEBHOOK];
    this[WEBHOOK] = new Webhook(this);
    return this[WEBHOOK];
  }
};
