const VIA_CEP_URL = "https://viacep.com.br/ws";

export async function lookupCep(cep, { signal } = {}) {
  const normalizedCep = cep.replace(/\D/g, "");
  if (normalizedCep.length !== 8) {
    throw new Error("Digite um CEP com 8 números.");
  }

  const response = await fetch(`${VIA_CEP_URL}/${normalizedCep}/json/`, { signal });
  if (!response.ok) {
    throw new Error(`A API respondeu com status ${response.status}.`);
  }

  const data = await response.json();
  if (data.erro) {
    throw new Error("CEP não encontrado. Confira os números e tente novamente.");
  }

  return data;
}
