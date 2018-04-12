'use strict';

module.exports = ({ router }) => {
  router.post('/github', 'github.hook');
};
