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

describe('Router', () => {
  test('should render router link', () => {
    const song = { docId: 'abc' };

    const wrapper = shallowMount(SongItem, {
      propsData: { song },
      global: {
        components: { 'router-link': RouterLinkStub },
      },
    });

    expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
      name: 'song',
      params: { id: song.docId },
    });
  });
});
