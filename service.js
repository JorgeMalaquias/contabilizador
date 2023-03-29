const validarEntradaDeDados = (lancamento) => {
   return null;
}

const recuperarSaldosPorConta = (lancamentos) => {

   const saldos = {};

   for (let i = 0; i < lancamentos.length; i++) {
      if ((saldos[lancamentos[i].cpf])) {
         saldos[lancamentos[i].cpf] += lancamentos[i].valor;
      }
      else {
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
   const maiorMenorRegistrosCpf = [];

   for (let i = 0; i < lancamentos.length; i++) {
      if (lancamentos[i].cpf === cpf) {
         if (maiorMenorRegistrosCpf.length > 0) {

            //condição em que é comparado se o lançamento analisado é menor do que o atual menor lançamento que está salvo em maiorMenorRegistrosCpf[0]
            if (maiorMenorRegistrosCpf[0].valor > lancamentos[i].valor) {
               maiorMenorRegistrosCpf[0] = lancamentos[i];
               continue;
            }

            //condição em que é comparado se o lançamento analisado é maior do que o atual maior lançamento que está salvo em maiorMenorRegistrosCpf[1]
            if (maiorMenorRegistrosCpf[1].valor < lancamentos[i].valor) {
               maiorMenorRegistrosCpf[1] = lancamentos[i];
            }

         }
         else {
            maiorMenorRegistrosCpf.push(lancamentos[i]);
            maiorMenorRegistrosCpf.push(lancamentos[i]);
         }
      }
   }
   return maiorMenorRegistrosCpf;
}

const recuperarMaioresSaldos = (lancamentos) => {
   const saldos = {};

   for (let i = 0; i < lancamentos.length; i++) {
      if ((saldos[lancamentos[i].cpf])) {
         saldos[lancamentos[i].cpf] += lancamentos[i].valor;
      }
      else {
         saldos[lancamentos[i].cpf] = lancamentos[i].valor;
      }
   }

   const tresMaioresSaldosArray = mapeandoMaiores(saldos);

   return tresMaioresSaldosArray;
}

const recuperarMaioresMedias = (lancamentos) => {
   return [];
}

// funções auxiliares


const mapeandoMaiores = (registros) => {
   const tresMaioresRegistrosArray = [];

   for (let i in registros) {

      if (tresMaioresRegistrosArray.length === 3) {
         for (let j = 0; j < 3; j++) {
            if (saldos[i] > tresMaioresRegistrosArray[j]) {
               const registro = { cpf: i, valor: saldos[i] };
               tresMaioresRegistrosArray.splice(j, 0, registro);
               tresMaioresRegistrosArray.pop();
               break;
            }
         }
      }
      else if (tresMaioresRegistrosArray.length > 0) {

         const tamanhoInicial = tresMaioresRegistrosArray.length;

         for (let j = 0; j < tresMaioresRegistrosArray.length - 1; j++) {
            if (saldos[i] > tresMaioresRegistrosArray[j]) {
               const registro = { cpf: i, valor: saldos[i] };
               tresMaioresRegistrosArray.splice(j, 0, registro);
               break;
            }
         }

         if (tresMaioresRegistrosArray.length === tamanhoInicial) {
            const registro = { cpf: i, valor: saldos[i] };
            tresMaioresRegistrosArray.push(registro);
         }
      }
      else {
         const registro = { cpf: i, valor: saldos[i] };
         tresMaioresRegistrosArray.push(registro);
      }
   }

   return tresMaioresRegistrosArray;
}