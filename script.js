async function fetchM3U() {
  const url = document.getElementById('m3uUrl').value;
  if (!url) return alert('Please enter a valid URL');

  try {
    const res = await fetch(url);
    const text = await res.text();
    parseM3U(text);
  } catch (err) {
    alert('Failed to fetch the playlist. Check the URL or CORS settings.');
  }
}

function parseM3U(text) {
  const lines = text.split('\n');
  const infoSection = document.getElementById('info');
  const channelList = document.getElementById('channelList');
  const channelSection = document.getElementById('channels');

  let channels = [];
  lines.forEach((line, i) => {
    if (line.startsWith('#EXTINF')) {
      const nameMatch = line.match(/,(.*)/);
      const name = nameMatch ? nameMatch[1].trim() : 'Unnamed Channel';
      const url = lines[i + 1]?.trim();
      if (url && url.startsWith('http')) {
        channels.push({ name, url });
      }
    }
  });

  // Fake details — replace or enhance with real parsing if available
  infoSection.innerHTML = `
    <h2>Connection Info</h2>
    <p><strong>Status:</strong> Active</p>
    <p><strong>Allowed Output:</strong> m3u8, ts</p>
    <p><strong>Total Channels:</strong> ${channels.length}</p>
  `;
  infoSection.classList.remove('hidden');

  channelList.innerHTML = '';
  channels.forEach(ch => {
    const li = document.createElement('li');
    li.textContent = ch.name;
    channelList.appendChild(li);
  });
  channelSection.classList.remove('hidden');
}
