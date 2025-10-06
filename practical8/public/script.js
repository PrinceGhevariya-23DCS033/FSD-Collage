const counterEl = document.getElementById('counter');


window.onload = async () => {
  let storedCount = localStorage.getItem('repCount');
  if (storedCount === null) {
    try {
      const res = await fetch('/api/count');
      const data = await res.json();
      storedCount = data.count;
      localStorage.setItem('repCount', storedCount);
    } catch (err) {
      console.error('Server error:', err);
      storedCount = 0;
    }
  }
  counterEl.innerText = storedCount;
};


function changeCount(delta) {
  let count = parseInt(localStorage.getItem('repCount')) || 0;
  count += delta;
  if (count < 0) count = 0;

  counterEl.innerText = count;
  localStorage.setItem('repCount', count);

  fetch('/api/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ count }),
  }).catch(console.error);
}

function resetCounter() {
  localStorage.setItem('repCount', 0);
  counterEl.innerText = 0;

  fetch('/api/reset', {
    method: 'POST',
  }).catch(console.error);
}


