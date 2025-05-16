const tbody = document.getElementById("crypto-body");

async function carregarDados() {
  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

  const resposta = await fetch(url);
  const moedas = await resposta.json();

  tbody.innerHTML = "";

  moedas.forEach(moeda => {
    const tr = document.createElement("tr");

    const variacao = moeda.price_change_percentage_24h.toFixed(2);
    const classeVariacao = variacao >= 0 ? "positive" : "negative";

    tr.innerHTML = `
      <td><img src="${moeda.image}" alt="${moeda.name}"></td>
      <td>${moeda.name} (${moeda.symbol.toUpperCase()})</td>
      <td>$${moeda.current_price.toFixed(2)}</td>
      <td class="${classeVariacao}">${variacao}%</td>
    `;
    
    tbody.appendChild(tr);
  });
}

carregarDados();

// Atualiza a cada 1 minuto
setInterval(carregarDados, 60000);
