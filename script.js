async function checkLinks() {
  const input = document.getElementById('playlist').value;
  const lines = input.split('\n').filter(line => line.trim() !== '' && !line.startsWith('#'));
  const resultList = document.getElementById('result');
  resultList.innerHTML = 'Checking...';

  const results = await Promise.all(lines.map(async (url) => {
    try {
      await fetch(url, { method: 'HEAD', mode: 'no-cors' });
      return `<li class="ok">${url} — online</li>`;
    } catch {
      return `<li class="fail">${url} — offline</li>`;
    }
  }));

  resultList.innerHTML = results.join('');
}
