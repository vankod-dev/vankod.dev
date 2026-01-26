document.addEventListener('DOMContentLoaded', function() {
  // Add copy button to all code blocks
  document.querySelectorAll('.highlight').forEach(function(codeBlock) {
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.textContent = 'Copy';

    button.addEventListener('click', function() {
      let code;

      // Check if this is a code block with line numbers (lntable structure)
      const lntable = codeBlock.querySelector('.lntable');
      if (lntable) {
        // Get only the code from the last column (not the line numbers)
        const codeCell = lntable.querySelector('td:last-child code');
        code = codeCell ? codeCell.innerText : codeBlock.querySelector('code').innerText;
      } else {
        // For code blocks without line numbers
        code = codeBlock.querySelector('code').innerText;
      }

      navigator.clipboard.writeText(code).then(function() {
        button.textContent = 'Copied!';
        button.classList.add('copied');

        setTimeout(function() {
          button.textContent = 'Copy';
          button.classList.remove('copied');
        }, 2000);
      }).catch(function(err) {
        console.error('Failed to copy:', err);
        button.textContent = 'Error';

        setTimeout(function() {
          button.textContent = 'Copy';
        }, 2000);
      });
    });

    codeBlock.appendChild(button);
  });
});
