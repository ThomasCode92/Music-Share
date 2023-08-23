import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

import useUserStore from '../../stores/user';

vi.mock('../../includes/firebase', () => ({
  default: { signInAuthUserWithEmailAndPassword: () => Promise.resolve() },
}));

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
