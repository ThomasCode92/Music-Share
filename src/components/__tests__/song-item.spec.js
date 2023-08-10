import { RouterLinkStub, mount } from '@vue/test-utils';

import SongItem from '../SongItem.vue';

describe('SongItem.vue', () => {
  test('should render the display name of the song', () => {
    const song = { display_name: 'test' };

    const wrapper = mount(SongItem, {
      shallow: true,
      props: { song },
      global: {
        components: { 'router-link': RouterLinkStub },
      },
    });

    const compositionAuthor = wrapper.find('.text-gray-500');

    expect(compositionAuthor.text()).toBe(song.display_name);
  });
});
