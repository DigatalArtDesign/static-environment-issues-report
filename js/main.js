document.addEventListener('DOMContentLoaded', () => {
    const pathnames = ['/', '/contact.html', '/404.html', '/redirected.html'];

    if (!pathnames.includes(location.pathname)) {
        location.href = './404.html'
    }
});