import _ from 'lodash';

export default {
  install(app) {
    const baseComponents = import.meta.glob('../components/base/*.vue', {
      eager: true,
    });

    Object.entries(baseComponents).forEach(([path, module]) => {
      const filename = path
        .split('/')
        .pop()
        .replace(/\.\w+$/, '');
      const componentName = _.upperFirst(_.camelCase(filename));

      // export default
      app.component(componentName, module.default);
    });
  },
};
