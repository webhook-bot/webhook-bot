'use strict';

const { Controller } = require('egg');

class Github extends Controller {
  async hook() {
    const payload = this.ctx.request.body;
    let eventName = this.ctx.request.headers['x-github-event'];
    if (!eventName) {
      this.ctx.status = 422;
      this.ctx.body = {

      };
      return;
    }
    if (eventName && verifySignature(ctx.request)) {
    }
  }
}

module.exports = Github;

function verifySignature(request) {
  let signature = crypto
    .createHmac('sha1', process.env.GITHUB_SECRET_TOKEN)
    .update(request.rawBody)
    .digest('hex');
  signature = `sha1=${signature}`;
  return fixedTimeComparison(signature, request.headers['x-hub-signature']);
},
