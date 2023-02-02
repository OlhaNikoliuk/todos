import { TodoCategory } from "../src/data/utils/types";
import { test, expect, Browser, chromium } from "@playwright/test";

const newTodo = {
  title: "Playwright",
  description: "Write tests",
  category: TodoCategory.study,
  completed: false,
};

test.beforeEach(async ({ page }) => {
  await page.goto("/todos");
});

test.describe("New todo", () => {
  test("should create new todo", async ({ page, request }) => {
    await (await page.$("id=add-todo-btn")).click();

    const categoryFilter = page.getByTestId("category-filter");

    await categoryFilter.click();

    // fill form
    await page.getByRole("option", { name: TodoCategory.study }).click();
    expect(categoryFilter.locator("div", { hasText: TodoCategory.study }));
    await page.getByLabel("Title").fill(newTodo.title);
    await page.getByLabel("Description").fill(newTodo.description);

    await page.getByTestId("create-todo-button").click();

    const response = await request
      .post("https://todo-api-0i3118.can.canonic.dev/api/todos", {
        data: {
          input: {
            title: newTodo.title,
            description: newTodo.description,
            category: newTodo.category,
            completed: newTodo.completed,
          },
        },
      })
      .then((data) => data);

    const resBody = JSON.parse(await response.text());

    expect(response.status()).toBe(200);
    expect(resBody.data.title).toBe(newTodo.title);
    expect(resBody.data.description).toBe(newTodo.description);
    expect(resBody.data.category).toBe(newTodo.category);
    expect(resBody.data.completed).toBe(newTodo.completed);
  });
});

test.describe("Edit todo", () => {
  test("should edit todo", async ({ page, request }) => {
    const todoItem = (await page.getByTestId("todo-item")).first();

    const todoIdToEdit = await todoItem.evaluate((el) => el.id);

    await todoItem.locator("#edit-todo-btn").click();

    const categoryFilter = page.getByTestId("category-filter");

    await categoryFilter.click();

    // fill form
    await page.getByRole("option", { name: TodoCategory.study }).click();
    expect(categoryFilter.locator("div", { hasText: TodoCategory.study }));
    await page.getByLabel("Title").fill(newTodo.title);
    await page.getByLabel("Description").fill(newTodo.description);

    await page.getByTestId("create-todo-button").click();

    const response = await request
      .patch(
        `https://todo-api-0i3118.can.canonic.dev/api/todos/${todoIdToEdit}`,
        {
          data: {
            input: {
              title: newTodo.title,
              description: newTodo.description,
              category: newTodo.category,
              completed: newTodo.completed,
            },
          },
        }
      )
      .then((data) => data);

    const resBody = JSON.parse(await response.text());
    console.log(resBody);

    expect(response.status()).toBe(200);
    expect(resBody.success).toBe(true);
    expect(resBody.data.title).toBe(newTodo.title);
    expect(resBody.data.description).toBe(newTodo.description);
    expect(resBody.data.category).toBe(newTodo.category);
    expect(resBody.data.completed).toBe(newTodo.completed);
  });
});

test.describe("Delete todo", () => {
  test("should delete todo", async ({ page, request }) => {
    const todoItem = (await page.getByTestId("todo-item")).first();

    const todoIdToDelete = await todoItem.evaluate((el) => el.id);

    await todoItem.locator("#delete-todo-btn").click();

    await (await page.$("#confirm-button")).click();

    const response = await request
      .delete(
        `https://todo-api-0i3118.can.canonic.dev/api/todos/${todoIdToDelete}`
      )
      .then((data) => data);

    const resBody = JSON.parse(await response.text());
    console.log(resBody);

    // check if todo was deleted
    expect(response.status()).toBe(200);
    expect(resBody.success).toBe(true);
    expect(resBody.data).toBe(null);
  });

  test("should decline delete todo", async ({ page, request }) => {
    const todoItem = (await page.getByTestId("todo-item")).first();

    const todoIdToDelete = await todoItem.evaluate((el) => el.id);

    await todoItem.locator("#delete-todo-btn").click();

    await (await page.$("#reject-button")).click();

    // check if todo is still in the list
    await page.$("#todoIdToDelete");
  });
});

test.describe("Toggle complete todo", () => {
  test("should toggle todo completed ", async ({ page, request }) => {
    const todoItem = (await page.getByTestId("todo-item")).first();
    const todoIdToEdit = await todoItem.evaluate((el) => el.id);
    const todoItemCheckbox = await todoItem.locator("input#todo-checked");
    const todoCompletedStatus = await todoItemCheckbox.isChecked();

    if (!todoCompletedStatus) {
      await todoItemCheckbox.check();
    } else await todoItemCheckbox.uncheck();

    const response = await request
      .patch(
        `https://todo-api-0i3118.can.canonic.dev/api/todos/${todoIdToEdit}`,
        {
          data: {
            input: {
              title: newTodo.title,
              description: newTodo.description,
              category: newTodo.category,
              completed: !todoCompletedStatus,
            },
          },
        }
      )
      .then((data) => data);

    const resBody = JSON.parse(await response.text());

    expect(response.status()).toBe(200);
    expect(resBody.success).toBe(true);

    // check that completed state was changed
    expect(resBody.data.completed).toBe(!todoCompletedStatus);
  });
});
