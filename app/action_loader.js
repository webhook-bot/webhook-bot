'use strict';

module.exports = app => {
  app.beforeStart(async () => {
    await loadAction(app);
    await loadPlugin(app);
  });
};

async function loadAction(app) {
  const cwd = app.config.cwd;
  const actions = {};
  const actionDir = path.join(cwd, action);
  const files = await fs.readdir(actionDir);
  for (const file of files) {
    const actionPath = require(path.join(actionDir, file));
    register(actionPath, {}, app);
  }
}

async function loadPlugin(app) {
  const cwd = app.config.cwd;
  const pluginListConfig = app.config.plugin;
  if (!(pluginListConfig && pluginListConfig.length)) return;

  for (const config of pluginListConfig) {
    let pluginName = config;
    let pluginConfig = {};
    if (is.array(config)) {
      pluginName = config[0];
      pluginConfig = config[1] || {};
    }

    const actionPath = path.join(cwd, 'node_modules', pluginName);
    register(actionPath, pluginConfig, app);
  }
}

function register(actionPath, config, app) {
  try {
    actionPath = require.resolve(actionPath);
  } catch (_) {
    throw new Error(`Load ${actionPath} failed`);
  }

  const action = require(actionPath) || {};
  action.filepath = actionPath;
  assert(action.event, 'event property is required in ' + action.filepath);
  assert(action.action, 'action method is required in ' + action.filepath);
  action.action.config = config;
  app.webhook.register(action.event, action.action);
}
