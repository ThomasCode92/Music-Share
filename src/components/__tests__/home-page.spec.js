import { describe, expect, test } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import HomePage from '../../views/HomePage.vue';
import SongItem from '../SongItem.vue';

describe('HomePage.vue', () => {
  test('should render a list of songs', () => {
    const songs = [{}, {}, {}];
    const component = shallowMount(HomePage, {
      data() {
        return { songs };
      },
      global: { mocks: { $t: message => message } },
    });

    const items = component.findAllComponents(SongItem);

    expect(items).toHaveLength(songs.length);

    items.forEach((wrapper, idx) => {
      expect(wrapper.props().song).toStrictEqual(songs[idx]);
    });
  });
});
