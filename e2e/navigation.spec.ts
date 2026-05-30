import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('Calculator nav link has correct href', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await expect(page.locator('nav a[href="/calculator"]').first()).toBeVisible()
  })

  test('clicking Calculator nav link navigates to /calculator', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.locator('nav a[href="/calculator"]').first().click()
    await page.waitForURL('/calculator', { timeout: 8000 })
    await expect(page).toHaveURL('/calculator')
  })

  test('back to home link on calculator returns to /', async ({ page }) => {
    await page.goto('/calculator', { waitUntil: 'networkidle' })
    await page.locator('a[href="/"]').first().click()
    await page.waitForURL('/', { timeout: 8000 })
    await expect(page).toHaveURL('/')
  })

  test('hero CTA navigates to /calculator', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.locator('a[href="/calculator"]').first().click()
    await page.waitForURL('/calculator', { timeout: 8000 })
    await expect(page).toHaveURL('/calculator')
  })

  test('pricing link has correct href', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await expect(page.locator('a[href="/pricing"]').first()).toBeVisible()
  })

  test('blog link has correct href', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await expect(page.locator('a[href="/blog"]').first()).toBeVisible()
  })

  test('footer renders on landing page', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(300)
    await expect(page.locator('footer')).toBeVisible()
  })
})
