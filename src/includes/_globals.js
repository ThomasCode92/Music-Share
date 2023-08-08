import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

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
      const componentName = upperFirst(camelCase(filename));

      // export default
      app.component(componentName, module.default);
    });
  },
};
