document.getElementById('themeToggle').addEventListener('click', function () {
    const currentTheme = document.body.className;
    if (currentTheme === 'light-theme') {
        document.body.className = 'dark-theme';
        document.querySelectorAll(".headerButton").forEach((e) => {
            e.classList.add("dark-theme")
        })
    } else {
        document.body.className = 'light-theme';
        document.querySelectorAll(".headerButton").forEach((e) => {
            e.classList.remove("dark-theme")
        })
    }
});