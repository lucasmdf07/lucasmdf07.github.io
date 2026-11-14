document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    let count = 0;
    document.querySelectorAll('.directory-item').forEach(item => {
      item.hidden = category !== 'All' && item.dataset.category !== category;
      if (!item.hidden) count++;
    });
    document.getElementById('project-count').textContent = `${count} ${count === 1 ? 'entry' : 'entries'}`;
    document.querySelector('.collection-empty').hidden = count !== 0;
  });
});
