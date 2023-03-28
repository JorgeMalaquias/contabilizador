const validarEntradaDeDados = (lancamento) => {
   return null;
}

const recuperarSaldosPorConta = (lancamentos) => {

   const saldos = {};

   for (let i = 0; i < lancamentos.length; i++) {
      if ((saldos[lancamentos[i].cpf])) {
         saldos[lancamentos[i].cpf] += lancamentos[i].valor;
      } else {
         saldos[lancamentos[i].cpf] = lancamentos[i].valor;
      }
   }

   const saldosArray = [];

   for (let i in saldos) {
      saldosArray.push({ cpf: i, valor: saldos[i] });
   }

   return saldosArray;
}

const recuperarMaiorMenorLancamentos = (cpf, lancamentos) => {
   return [];
}

const recuperarMaioresSaldos = (lancamentos) => {
   return [];
}

const recuperarMaioresMedias = (lancamentos) => {
   return [];
}