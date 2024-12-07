export default async function handler(req, res) {
    const apiKey = "1MTAKD8PPDHUYWKHJMB3K9PD8F8SYU5KV9";
    const tokenAddress = "0x2E6819782bEdE1fBfaDa433906253A90CA06157a";
  
    const totalSupplyEndpoint = `https://api.polygonscan.com/api?module=stats&action=tokensupply&contractaddress=${tokenAddress}&apikey=${apiKey}`;
    const burnAddress = "0x000000000000000000000000000000000000dead";
    const balanceOfEndpoint = `https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=${tokenAddress}&address=${burnAddress}&tag=latest&apikey=${apiKey}`;
  
    try {
      const [totalSupplyRes, burnBalanceRes] = await Promise.all([
        fetch(totalSupplyEndpoint),
        fetch(balanceOfEndpoint),
      ]);
  
      const totalSupplyData = await totalSupplyRes.json();
      const burnBalanceData = await burnBalanceRes.json();
  
      const totalSupply = BigInt(totalSupplyData.result);
      const burnBalance = BigInt(burnBalanceData.result);
      const circulatingSupply = totalSupply - burnBalance;
  
      res.status(200).send(circulatingSupply.toString()); // Send plain text response
    } catch (error) {
      res.status(500).send("Error fetching circulating supply");
    }
  }
  