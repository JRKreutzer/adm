function generateConfig() {
  const site = document.getElementById('siteInput').value;
  const action = document.getElementById('actionSelect').value;

  const configOutput = document.getElementById('configOutput');
  configOutput.innerHTML = '';

  if (site.trim() === '') {
    alert('Por favor, insira um site válido.');
    return;
  }

  let script;

  if (action === 'allow') {
    // Adiciona regra para permitir o site
    script = `#!/bin/bash\n\n# Script de configuração de firewall\n\n# Adiciona regra para permitir o site ${site}\nsudo iptables -D INPUT -s ${site} -j DROP\n`;
  } else {
    // Adiciona regra para bloquear o site
    script = `#!/bin/bash\n\n# Script de configuração de firewall\n\n# Adiciona regra para bloquear o site ${site}\nsudo iptables -A INPUT -s ${site} -j DROP\n`;
  }

  const pre = document.createElement('pre');
  pre.textContent = script;

  configOutput.appendChild(pre);

  // Adiciona o link de download
  const downloadLink = document.getElementById('downloadLink');
  downloadLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(script));
  downloadLink.style.display = 'block';

  // Adiciona a execução direta do script com sudo
  const executeButton = document.getElementById('executeButton');
  executeButton.style.display = 'block';
  executeButton.onclick = function () {
    executeScriptWithSudo(script);
  };
}

function executeScriptWithSudo(script) {
  const blob = new Blob([script], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'firewall_script.sh';

  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(url);
}
