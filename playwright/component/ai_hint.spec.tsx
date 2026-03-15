import { test, expect } from '@playwright/experimental-ct-react';
import { Hint } from '../../src/components/HintProvider';

test.describe('HintProvider', () => {    
    test('can show hint button', async ({ page, mount }) => {
        const hintProvider = await mount(<Hint />);
        const hint = hintProvider.getByText('Get hint');

        await expect(hint).toBeVisible();
    });

    test('clicking hint button shows loading state', async ({ page, mount }) => {
        await page.route('https://openrouter.ai/api/v1/chat/completions', async (route) => {
            await new Promise(f => setTimeout(f, 2000)); 
            route.fulfill({
                status: 200,
                body: JSON.stringify({ message: 'Mocked Data' }),
            });
        });

        const hintProvider = await mount(<Hint />);
        const hintButton = hintProvider.getByText('Get hint');

        await hintButton.click();

        await expect(hintProvider.getByText('Asking AI for a hint...')).toBeVisible();
    });

    test('can get hint and show it', async ({ page, mount }) => {
        await page.route('https://openrouter.ai/api/v1/chat/completions', async (route) => {
            route.fulfill({
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: 'xyz',
                    object: 'chat.completion',
                    created: 1234567890,
                    model: 'openai/gpt-oss-120b',
                    choices: [
                        {
                            index: 0,
                            message: {
                                role: 'assistant',
                                content: 'right'
                            }
                        }
                    ]
                }),
            });
        });

        const hintProvider = await mount(<Hint />);
        const hintButton = hintProvider.getByText('Get hint');

        await hintButton.click();

        await expect(hintProvider.getByText('💡 try RIGHT')).toBeVisible();
    });
});