import { test, expect } from '@playwright/test'

test.describe('Calculator Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/calculator', { waitUntil: 'networkidle' })
  })

  test('renders page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /calculate your.*macros/i })).toBeVisible()
  })

  test('back to home link is visible with correct href', async ({ page }) => {
    const backLink = page.locator('a[href="/"]')
    await expect(backLink.first()).toBeVisible()
  })

  test('weight input accepts numbers', async ({ page }) => {
    const weightInput = page.locator('input[placeholder*="75"]')
    await expect(weightInput).toBeVisible()
    await weightInput.fill('75')
    await expect(weightInput).toHaveValue('75')
  })

  test('height input accepts numbers', async ({ page }) => {
    const heightInput = page.locator('input[placeholder*="170"]')
    await expect(heightInput).toBeVisible()
    await heightInput.fill('170')
    await expect(heightInput).toHaveValue('170')
  })

  test('unit toggle switches between KG and LBS', async ({ page }) => {
    const lbsButton = page.getByRole('button', { name: 'LBS' })
    const kgButton = page.getByRole('button', { name: 'KG' })
    await expect(kgButton).toBeVisible()
    await lbsButton.click()
    await expect(page.locator('input[placeholder*="165"]')).toBeVisible()
    await kgButton.click()
    await expect(page.locator('input[placeholder*="75"]')).toBeVisible()
  })

  test('goal selector shows three options', async ({ page }) => {
    await expect(page.getByRole('button', { name: /fat loss/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /maintenance/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /muscle gain/i })).toBeVisible()
  })

  test('goal selector responds to clicks', async ({ page }) => {
    const fatLossBtn = page.getByRole('button', { name: /fat loss/i })
    await fatLossBtn.click()
    await expect(fatLossBtn).toHaveClass(/border-neon/)
  })

  test('activity level slider is visible', async ({ page }) => {
    await expect(page.getByText(/activity level/i)).toBeVisible()
    await expect(page.getByText(/sedentary/i).first()).toBeVisible()
  })

  test('gender and age optional fields are visible', async ({ page }) => {
    await expect(page.getByText('Gender')).toBeVisible()
    await expect(page.getByText('Age')).toBeVisible()
  })

  test('submit button is present', async ({ page }) => {
    await expect(page.getByRole('button', { name: /calculate my macros/i })).toBeVisible()
  })

  test('shows validation error on empty submit', async ({ page }) => {
    await page.getByRole('button', { name: /calculate my macros/i }).click()
    const errors = page.locator('.text-destructive')
    await expect(errors.first()).toBeVisible({ timeout: 3000 })
  })

  test('trust signals are displayed', async ({ page }) => {
    await expect(page.getByText(/science-backed/i)).toBeVisible()
    await expect(page.getByText(/instant results/i)).toBeVisible()
    await expect(page.getByText(/free forever/i)).toBeVisible()
  })
})
