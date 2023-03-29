const validarEntradaDeDados = (lancamento) => {

   let validaçãoResultado = "";

   const valorRegex = /^[0-9]{11}$/;

   if (!valorRegex.test(lancamento.cpf)) {
      validaçãoResultado = "* Devem ser informados somente números no campo CPF, totalizando 11 dígitos!" + "\n";
   }

   if (!validarCpf(lancamento.cpf)) {
      validaçãoResultado += "* Dígitos verificadores do cpf informado inválidos!" + "\n";;
   }
   if (typeof lancamento.valor !== 'number') {
      validaçãoResultado += "* O dado informado no campo VALOR deve ser numérico!" + "\n";;
   }
   if (lancamento.valor > 15000 || lancamento.valor < -2000) {
      validaçãoResultado += "* O valor do lançamento não pode ser superior a 15000.00 e nem inferior a -2000.00!" + "\n";
   }

   return (validaçãoResultado === '') ? null : validaçãoResultado;
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

   const tresMaioresSaldosArray = mapearMaiores(saldos);

   return tresMaioresSaldosArray;
}

const recuperarMaioresMedias = (lancamentos) => {
   const medias = {};

   for (let i = 0; i < lancamentos.length; i++) {
      if ((medias[lancamentos[i].cpf])) {
         medias[lancamentos[i].cpf].valor += lancamentos[i].valor;
         medias[lancamentos[i].cpf].numeroLancamentos++;
      }
      else {
         medias[lancamentos[i].cpf] = { valor: lancamentos[i].valor, numeroLancamentos: 1 };
      }
   }

   for (let i in medias) {
      medias[i] = medias[i].valor / medias[i].numeroLancamentos;
   }

   const tresMaioresMediasArray = mapearMaiores(medias);

   return tresMaioresMediasArray;
}

// funções auxiliares


const mapearMaiores = (registros) => {
   const tresMaioresRegistrosArray = [];

   for (let i in registros) {

      if (tresMaioresRegistrosArray.length === 3) {
         for (let j = 0; j < 3; j++) {
            if (registros[i] > tresMaioresRegistrosArray[j].valor) {
               const registro = { cpf: i, valor: registros[i] };
               tresMaioresRegistrosArray.splice(j, 0, registro);
               tresMaioresRegistrosArray.pop();
               break;
            }
         }
      }
      else if (tresMaioresRegistrosArray.length > 0) {

         const tamanhoInicial = tresMaioresRegistrosArray.length;

         for (let j = 0; j < tresMaioresRegistrosArray.length; j++) {
            if (registros[i] > tresMaioresRegistrosArray[j].valor) {
               const registro = { cpf: i, valor: registros[i] };
               tresMaioresRegistrosArray.splice(j, 0, registro);
               break;
            }
         }

         if (tresMaioresRegistrosArray.length === tamanhoInicial) {

            const registro = { cpf: i, valor: registros[i] };
            tresMaioresRegistrosArray.push(registro);
         }
      }
      else {
         const registro = { cpf: i, valor: registros[i] };
         tresMaioresRegistrosArray.push(registro);
      }
   }

   return tresMaioresRegistrosArray;
}

const validarCpf = (cpf) => {

   cpf = cpf.replace(/[^\d]+/g, '');

   // Valida 1o digito	
   let add = 0;
   for (i = 0; i < 9; i++) {
      add += parseInt(cpf.charAt(i)) * (10 - i);
   }

   let rev = 11 - (add % 11);

   if (rev == 10 || rev == 11) {
      rev = 0;
   }

   if (rev != parseInt(cpf.charAt(9))) {
      return false;
   }

   // Valida 2o digito	
   add = 0;
   for (i = 0; i < 10; i++) {
      add += parseInt(cpf.charAt(i)) * (11 - i);
   }

   rev = 11 - (add % 11);

   if (rev == 10 || rev == 11) {
      rev = 0;
   }

   if (rev != parseInt(cpf.charAt(10))) {
      return false;
   }

   return true;
}