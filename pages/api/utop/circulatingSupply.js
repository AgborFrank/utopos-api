export default async function handler(req, res) {
    const apiKey = "1MTAKD8PPDHUYWKHJMB3K9PD8F8SYU5KV9";
    const tokenAddress = "0x2E6819782bEdE1fBfaDa433906253A90CA06157a";
    const burnAddress = "0x000000000000000000000000000000000000dead";
  
    const totalSupplyEndpoint = `https://api.polygonscan.com/api?module=stats&action=tokensupply&contractaddress=${tokenAddress}&apikey=${apiKey}`;
    const balanceOfEndpoint = `https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=${tokenAddress}&address=${burnAddress}&tag=latest&apikey=${apiKey}`;
  
    try {
      // Fetch total supply and burn balance concurrently
      const [totalSupplyRes, burnBalanceRes] = await Promise.all([
        fetch(totalSupplyEndpoint),
        fetch(balanceOfEndpoint),
      ]);
  
      // Parse JSON responses
      const totalSupplyData = await totalSupplyRes.json();
      const burnBalanceData = await burnBalanceRes.json();
  
      // Validate API responses
      if (totalSupplyData.status !== "1" || burnBalanceData.status !== "1") {
        throw new Error("Failed to fetch token data");
      }
  
      // Convert results to BigInt for precise calculations
      const totalSupply = BigInt(totalSupplyData.result);
      const burnBalance = BigInt(burnBalanceData.result);
  
      // Calculate circulating supply
      const circulatingSupply = totalSupply - burnBalance;
  
      // Send circulating supply as plain text
      res.status(200).send((circulatingSupply / BigInt(10 ** 18)).toString());
    } catch (error) {
      // Send error message as plain text
      res.status(500).send("NA");
    }
  }
  