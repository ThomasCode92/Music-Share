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
    });

    const items = component.findAllComponents(SongItem);

    expect(items).toHaveLength(songs.length);
  });
});
