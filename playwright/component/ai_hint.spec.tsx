import { test, expect } from '@playwright/experimental-ct-react';
import { HintProvider } from '../../src/components/HintProvider';

test('can show hint', async ({ mount }) => {
    const hintProvider = await mount(<HintProvider />);
    const hint = hintProvider.getByText('Get hint');

    await expect(hint).not.toBeVisible();
});