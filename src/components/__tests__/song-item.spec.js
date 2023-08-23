import { describe, expect, test } from 'vitest';
import { RouterLinkStub, shallowMount } from '@vue/test-utils';

import SongItem from '../SongItem.vue';

describe('SongItem.vue', () => {
  test('should render the display name of the song', () => {
    const song = { display_name: 'test' };

    const wrapper = shallowMount(SongItem, {
      props: { song },
      global: {
        components: { 'router-link': RouterLinkStub },
      },
    });

    const compositionAuthor = wrapper.find('.text-gray-500');

    expect(compositionAuthor.text()).toBe(song.display_name);
  });

  test('should set the song.docId in id attribute', () => {
    const song = { docId: 'abc' };

    const wrapper = shallowMount(SongItem, {
      props: { song },
      global: {
        components: { 'router-link': RouterLinkStub },
      },
    });

    expect(wrapper.attributes().id).toBe(`song-id-${song.docId}`);
  });
});
