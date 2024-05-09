import { test, expect } from '@playwright/test'

test('should navigate to demo page', async ({ page }) => {
  await page.goto('http://localhost:3000/demo')
  await expect(page.locator('form')).toHaveClass(/todo-form/)
})

test('should show todo list when submit new data', async ({ page }) => {
  await page.goto('http://localhost:3000/demo')
  await page.fill('input[name="todo_name"]', 'Sample Todo')
  await page.selectOption('select[name="todo_type"]', { label: 'Work' })
  await page.click('button[type="submit"]')
  const todoItem = await page.textContent('.todo-item')
  expect(todoItem).toContain('Sample Todo')
})

test('should keep the data that stored in IDB', async ({ page }) => {
  await page.goto('http://localhost:3000/demo')
  await page.fill('input[name="todo_name"]', 'Data 1')
  await page.selectOption('select[name="todo_type"]', { label: 'Work' })
  await page.click('button[type="submit"]')
  const todoItem = await page.textContent('.todo-item')
  expect(todoItem).toContain('Data 1')

  await page.reload()

  const todoItem2 = await page.textContent('.todo-item')
  expect(todoItem2).toContain('Data 1')
})

test('should successfully remove todo item', async ({ page }) => {
  // Navigate to the page
  await page.goto('http://localhost:3000/demo')

  // Fill the form and submit to add a todo item
  await page.fill('input[name="todo_name"]', 'Data 1')
  await page.selectOption('select[name="todo_type"]', { label: 'Work' })
  await page.click('button[type="submit"]')

  // Wait for the todo item to be added
  await page.waitForSelector('.todo-item')

  // Get the initial number of todo items
  const initialTodoCount = (await page.$$('.todo-item')).length
  expect(initialTodoCount).toEqual(1)

  // Listen for the dialog event and accept it
  page.on('dialog', async (dialog) => {
    expect(dialog.type()).toContain('confirm')
    expect(dialog.message()).toContain('Are you sure ?')
    await dialog.accept()
  })

  // Click the delete button on the first todo item
  await page.click('.todo-item:first-child button')

  // Wait for the todo item to be removed
  await page.waitForTimeout(1000) // Adjust the timeout as needed

  // Get the number of todo items after deletion
  const updatedTodoCount = (await page.$$('.todo-item')).length
  expect(updatedTodoCount).toEqual(0)
})
