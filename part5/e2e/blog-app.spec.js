import { test, expect } from '@playwright/test'

test.describe('Blog app', () => {
  test('login form is shown', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Stories worth keeping.' })).toBeVisible()
  })

  test('wrong credentials show an error', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('username').fill('wrong')
    await page.getByLabel('password').fill('wrong')
    await page.getByRole('button', { name: /log in/i }).click()
    await expect(page.getByRole('status')).toContainText('Wrong username or password')
  })
})
