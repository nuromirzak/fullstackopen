import { test, expect } from '@playwright/test';

test.describe('Blog app', () => {
  // Utility function to reset database
  const resetDatabase = async (request) => {
    await request.post('/api/testing/reset');
    await request.post('/api/users', {
      data: {
        username: 'root',
        name: 'Superuser',
        password: 'salainen'
      }
    });
  };

  // Utility function to log in
  const login = async (page, username, password) => {
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);
    await page.click('button');
    await page.waitForLoadState('networkidle'); // Ensure page is fully loaded
  };

  // Utility function to create a blog
  const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'new blog' }).click();
    await page.fill('input[name="title"]', title);
    await page.fill('input[name="author"]', author);
    await page.fill('input[name="url"]', url);
    await page.getByRole('button', { name: 'Create' }).click();
  };

  test.beforeEach(async ({ page, request }) => {
    await resetDatabase(request);
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle'); // Ensure page is fully loaded
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.locator('form')).toBeVisible();
  });

  test.describe('Login', () => {
    test('user can login', async ({ page }) => {
      await login(page, 'root', 'salainen');
      await expect(page.locator('html')).toContainText('root logged-in');
    });

    test('login fails with wrong password', async ({ page }) => {
      await login(page, 'root', 'wrong');
      await expect(page.locator('html')).toContainText('Wrong credentials');
    });
  });

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      await login(page, 'root', 'salainen');
    });

    test('A blog can be created', async ({ page }) => {
      await createBlog(page, 'test title', 'test author', 'test url');
      await expect(page.locator('html')).toContainText('test title - test author');
    });

    test.describe('and a blog exists', () => {
      test.beforeEach(async ({ page }) => {
        await createBlog(page, 'test title', 'test author', 'test url');
      });

      test('it can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click();
        await page.getByRole('button', { name: 'like' }).click();
        await expect(page.locator('html')).toContainText('Likes: 1');
      });

      test('it can be deleted', async ({ page }) => {
        page.on('dialog', async dialog => {
          await dialog.accept();
        });

        await page.getByRole('button', { name: 'view' }).click();
        await page.getByRole('button', { name: 'remove' }).click();
        await expect(page.locator('html')).not.toContainText('test title - test author');
      });

      test('only the user who added the blog sees the blog\'s delete button', async ({ page, request }) => {
        await request.post('/api/users', {
          data: {
            username: 'other',
            name: 'Other User',
            password: 'password'
          }
        });

        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await login(page, 'other', 'password');

        await page.getByRole('button', { name: 'view' }).click();
        await expect(page.locator('button', { hasText: 'remove' })).not.toBeVisible();
      });

      test('blogs are ordered by likes', async ({ page }) => {
        // Create 3 blogs
        await createBlog(page, 'test title 1', 'test author 1', 'test url 1');
        await createBlog(page, 'test title 2', 'test author 2', 'test url 2');

        // Like the blogs
        await page.getByRole('button', { name: 'view' }).nth(0).click();
        await page.getByRole('button', { name: 'like' }).click();
        await page.getByRole('button', { name: 'hide' }).click();

        await page.getByRole('button', { name: 'view' }).nth(1).click();
        await page.getByRole('button', { name: 'like' }).click();
        await page.getByRole('button', { name: 'hide' }).click();

        await page.getByRole('button', { name: 'view' }).nth(1).click();
        await page.getByRole('button', { name: 'like' }).click();
        await page.getByRole('button', { name: 'hide' }).click();

        const views = await page.locator('.view').all();
        await Promise.all(views.map(view => view.click()));

        // Check the order
        const likes = await page.locator('.likes').all();
        const likesText = await Promise.all(likes.map(like => like.textContent()));
        expect(likesText).toEqual(['Likes: 2 like', 'Likes: 1 like', 'Likes: 0 like']);
      });
    });
  });
});
