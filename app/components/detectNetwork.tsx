export const detectNetwork = (phone: string) => {
  const prefix = phone.substring(0, 4);

  const networks: Record<string, string[]> = {
    mtn: ["0703","0706","0803","0806","0813","0816","0810","0814","0903","0906"],
    airtel: ["0701","0708","0802","0808","0812","0902","0907","0901"],
    glo: ["0705","0805","0807","0811","0815","0905"],
    "9mobile": ["0809","0817","0818","0909"]
  };

  for (const network in networks) {
    if (networks[network].includes(prefix)) {
      return network;
    }
  }

  return "Unknown";
};