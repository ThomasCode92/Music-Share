import { beforeEach, describe, expect, test } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

import useUserStore from '../../stores/user';

describe('stores', () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  test('should authenticate user', async () => {
    const store = useUserStore();

    expect(store.userLoggedIn).not.toBeTruthy();
    await store.authenticate({});
    expect(store.userLoggedIn).toBeTruthy();
  });
});
