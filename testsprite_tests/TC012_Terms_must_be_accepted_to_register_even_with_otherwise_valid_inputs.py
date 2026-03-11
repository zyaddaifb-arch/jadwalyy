import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Interact with the page elements to simulate user flow
        # -> Navigate to http://localhost:3000
        await page.goto("http://localhost:3000", wait_until="commit", timeout=10000)
        
        # -> Navigate to /register using the exact path http://localhost:3000/register (per test step).
        await page.goto("http://localhost:3000/register", wait_until="commit", timeout=10000)
        
        # -> Type 'Test User' into the full name field (index 572).
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=/html/body/div[2]/main/div/div/form/div/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Test User')
        
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=/html/body/div[2]/main/div/div/form/div[2]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('testsprite.user+reg2@example.com')
        
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=/html/body/div[2]/main/div/div/form/div[3]/div/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('5552223333')
        
        # -> Select a subject from the dropdown (use 'الفيزياء' because 'Science' option is not present), type password into the password field, click the Register button to attempt submission without checking the terms checkbox, then observe whether the form prevents registration and whether the 'terms' text is visible as an indication of requirement.
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=/html/body/div[2]/main/div/div/form/div[4]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('ValidPass123!')
        
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/div[2]/main/div/div/form/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        
        # --> Assertions to verify final state
        frame = context.pages[-1]
        # -> Assert that the Terms of Service link (شروط الخدمة) is visible (uses exact xpath from available elements list).
        frame = context.pages[-1]
        elem = frame.locator('xpath=/html/body/div[2]/main/div/div[1]/form/div[5]/label/a[1]').nth(0)
        assert await elem.is_visible()
        # -> Assert that we are still on the register page (registration should be prevented because checkbox was not checked).
        assert "/register" in frame.url
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    