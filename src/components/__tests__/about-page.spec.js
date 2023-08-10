import { mount } from '@vue/test-utils';

import AboutPage from '../../views/AboutPage.vue';

describe('AboutPage.vue', () => {
  test('should render the inner text', () => {
    const wrapper = mount(AboutPage, { shallow: true });
    expect(wrapper.text()).toContain('about');
  });
});
