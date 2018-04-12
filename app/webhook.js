'use strict';

class Webhook {
  constructor(app) {
    this.app = app;
    this.hooks = new Map();
  }

  register(event, action) {
    const hook = this.hook.get(event);
    hook.set(action);
  }

  async invoke(event, payload) {
    const hook = this.hook.get(event);
    for (const action of hook) {
      try {
        await action(payload, action.config);
      } catch (err) {
        this.app.logger.error(err);
      }
    }
  }
}
