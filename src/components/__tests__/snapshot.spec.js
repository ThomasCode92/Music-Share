import { describe, expect, test } from 'vitest';
import { RouterLinkStub, shallowMount } from '@vue/test-utils';

import SongItem from '../SongItem.vue';

describe('Snapshot SongItem', () => {
  test('should render the component correctly', () => {
    const song = {
      docId: 'abc',
      modified_name: 'modified name',
      display_name: 'display name',
      comment_count: 5,
    };

    const wrapper = shallowMount(SongItem, {
      propsData: { song },
      global: {
        components: { 'router-link': RouterLinkStub },
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
