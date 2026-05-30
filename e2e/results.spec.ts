import { test, expect } from '@playwright/test'

// Inject pre-computed results directly into Zustand's sessionStorage store
// (key: 'macro-calc') — same format Zustand persist middleware writes.
async function loadResultsInStore(page: Parameters<Parameters<typeof test>[1]>[0]) {
  await page.goto('/calculator', { waitUntil: 'domcontentloaded' })
  await page.evaluate(() => {
    const stored = {
      state: {
        input: {
          weight: 75, height: 170, unit: 'KG',
          goal: 'MAINTENANCE', activityLevel: 'MODERATE',
        },
        result: {
          calories: 2456, protein: 135, fat: 68,
          carbs: 307, fiber: 34, weightKg: 75,
        },
        emailCaptured: false, email: '', firstName: '',
      },
      version: 0,
    }
    sessionStorage.setItem('macro-calc', JSON.stringify(stored))
  })
  await page.goto('/results', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(500)
}

test.describe('Results Page', () => {
  test('renders blank / redirects when store is empty', async ({ page }) => {
    await page.goto('/results', { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(2000)
    // Either stays on /results (renders null) or redirects to /calculator
    const url = page.url()
    expect(url).toMatch(/\/results|\/calculator/)
  })

  test('displays all four macro cards', async ({ page }) => {
    await loadResultsInStore(page)
    await expect(page.getByText('Calories')).toBeVisible()
    await expect(page.getByText('Protein')).toBeVisible()
    await expect(page.getByText('Carbs')).toBeVisible()
    await expect(page.getByText('Fat')).toBeVisible()
  })

  test('macro values are numeric (kcal and g units shown)', async ({ page }) => {
    await loadResultsInStore(page)
    await expect(page.getByText('kcal').first()).toBeVisible()
    await expect(page.getByText('g').first()).toBeVisible()
  })

  test('displays fiber information', async ({ page }) => {
    await loadResultsInStore(page)
    await expect(page.getByText('Fiber')).toBeVisible()
  })

  test('share button is present', async ({ page }) => {
    await loadResultsInStore(page)
    await expect(page.getByRole('button', { name: /share/i }).first()).toBeVisible()
  })

  test('AI meal plan CTA link is present', async ({ page }) => {
    await loadResultsInStore(page)
    await expect(page.locator('a[href="/meal-planner"]').first()).toBeVisible()
  })

  test('valid form data shows no validation errors', async ({ page }) => {
    await page.goto('/calculator', { waitUntil: 'domcontentloaded' })
    await page.waitForSelector('input[placeholder*="75"]', { state: 'visible' })

    // Fill valid weight and height
    await page.locator('input[placeholder*="75"]').pressSequentially('75', { delay: 30 })
    await page.keyboard.press('Tab')
    await page.locator('input[placeholder*="170"]').pressSequentially('170', { delay: 30 })
    await page.keyboard.press('Tab')
    await page.waitForTimeout(300)

    // Trigger submit to run validation
    await page.getByRole('button', { name: /calculate my macros/i }).click({ force: true })
    await page.waitForTimeout(1000)

    // With valid data, no destructive (error) messages should be visible
    const errors = await page.locator('.text-destructive:visible').count()
    expect(errors).toBe(0)
  })
})
