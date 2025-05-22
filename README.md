# TechSolutions Pro - Test Website

This is a simple static website created for testing the Revenue Magick SaaS platform. It includes a landing page with forms to collect user data and demonstrate behavior tracking, ad performance tracking, and CRM integration.

## Project Structure

```
test-website/
├── index.html             # Main landing page
├── public/                # Public assets
│   └── favicon.svg        # Favicon
├── src/                   # Source files
│   ├── css/               # CSS styles
│   │   └── styles.css     # Main stylesheet
│   ├── js/                # JavaScript files
│   │   └── main.js        # Main JavaScript file
│   └── images/            # SVG images and icons
└── README.md              # This file
```

## Running Locally

Since this is a simple static website, you can run it locally using any static file server. Here are a few options:

### Option 1: Using Python's built-in HTTP server

```bash
cd test-website
python -m http.server 8000
```

Then open your browser and navigate to `http://localhost:8000`.

### Option 2: Using Node.js and serve

First, install the `serve` package globally:

```bash
npm install -g serve
```

Then run:

```bash
cd test-website
serve
```

The website will be available at the URL shown in the terminal (typically `http://localhost:5000`).

### Option 3: Using Visual Studio Code Live Server extension

If you're using Visual Studio Code, you can install the Live Server extension and then right-click on `index.html` and select "Open with Live Server".

## Deploying to Vercel

To deploy this website to Vercel, follow these steps:

1. Create a Vercel account at [vercel.com](https://vercel.com) if you don't have one already.

2. Install the Vercel CLI:

```bash
npm install -g vercel
```

3. Login to Vercel from the CLI:

```bash
vercel login
```

4. Deploy the website:

```bash
cd test-website
vercel
```

5. Follow the prompts in the CLI. When asked about the build settings, you can use the default settings for a static site.

6. Once deployed, Vercel will provide you with a URL for your website.

## Integration Testing

After deploying the website, you can use it to test various integrations with Revenue Magick as outlined in the `USER_TEST.md` document in the root directory of the repository.

The website includes:

- Forms for collecting user data
- JavaScript hooks for behavior tracking
- Placeholders for analytics and tracking scripts
- Responsive design for testing on different devices

## Customizing

If you need to customize the website for specific testing scenarios:

- Edit `index.html` to modify the page structure and content
- Modify `src/css/styles.css` to change the styling
- Update `src/js/main.js` to adjust the form handling and tracking behavior

## License

This test website is for demonstration purposes only and should not be used in production environments without proper review and modifications. 