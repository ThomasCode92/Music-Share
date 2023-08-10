import { mount } from '@vue/test-utils';

import SongItem from '../SongItem.vue';

describe('SongItem.vue', () => {
  test('should render the display name of the song', () => {
    const song = { display_name: 'test' };
    const wrapper = mount(SongItem, { shallow: true, props: song });
    expect(wrapper.text()).toContain(song.display_name);
  });
});
