const headerTemplate = () => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="/css/style.css?v=1.1">
            <title>GGMJ's Art Project</title>
        </head>
        <body>
            <header>GGMJ's Art Project</header>
            <div class="homeBtn">
                <button onclick="goToHome()">Home</button>
            </div>
            <script>
            function goToHome() {
                window.location.href = '/home';
            }
            </script>
    `;
};

module.exports = headerTemplate;