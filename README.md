# Responsive Internship Board

A responsive, accessible internship listing interface built with **semantic HTML, CSS, and vanilla JavaScript**—no frontend framework required.

> The internship records in `internships.json` are fictional sample data for this learning project.

## Features

- Responsive layout for mobile, tablet, and desktop.
- Search by role, company, description, domain, location, or skill.
- Filter by domain and work mode.
- Live result count and helpful empty state.
- Data-loading error state with a clear recovery hint.
- Semantic landmarks, a skip link, explicit form labels, live status announcements, and visible keyboard focus.
- Reduced-motion preference support.
- DOM cards built with `createElement` and `textContent` rather than injecting untrusted HTML.

## Project files

- `index.html` — page structure and accessible controls.
- `styles.css` — responsive styling and focus states.
- `app.js` — data loading, filters, DOM rendering, empty/error states.
- `internships.json` — fictional sample listings.

## Run locally

Because the page loads `internships.json` with `fetch`, run it through a local web server instead of opening `index.html` directly as a `file://` URL.

### Option 1: Python

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

### Option 2: VS Code

Install the **Live Server** extension, right-click `index.html`, and choose **Open with Live Server**.

## Test checklist

1. Search for `Python` — relevant listings should remain.
2. Choose **Data & AI** — only Data listings should appear.
3. Choose **Remote** — only remote roles should appear.
4. Search for a nonsense phrase such as `xyz-no-match` — the empty state should appear.
5. Press **Clear filters** — all listings should return and focus should move back to the search field.
6. Use only the keyboard: press `Tab` and `Shift+Tab` to navigate controls and links; focus indicators should be visible.
7. Resize the viewport to mobile, tablet, and desktop widths.
8. To test the loading error state, temporarily rename `internships.json`, refresh, and confirm the error message appears. Restore the filename afterward.

## Deploy with GitHub Pages

1. Create a **public** GitHub repository named `responsive-internship-board`.
2. Upload all four project files (`index.html`, `styles.css`, `app.js`, and `internships.json`) plus this README to the repository root.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose branch `main` and folder `/ (root)`, then save.
6. Wait for GitHub Pages to finish publishing. Your preview URL will look like:

   `https://YOUR-USERNAME.github.io/responsive-internship-board/`

   Replace `YOUR-USERNAME` with your GitHub username and use the actual URL shown in Settings → Pages.

## README screenshots

After the site is deployed, capture and add these screenshots to a `screenshots/` folder in the repository:

- `desktop.png` — full listings page at desktop width.
- `mobile.png` — page at a narrow/mobile width.
- `search-empty-state.png` — search result showing the empty state.

Then add this section to the README:

```markdown
## Screenshots

### Desktop
![Desktop layout](screenshots/desktop.png)

### Mobile
![Mobile layout](screenshots/mobile.png)

### Empty search state
![Empty search state](screenshots/search-empty-state.png)
```

## Submission

Submit **one link**: either your public GitHub repository or the deployed preview URL. The repository should contain the source files, README, and screenshots; ideally, submit the deployed preview URL after verifying it works.
