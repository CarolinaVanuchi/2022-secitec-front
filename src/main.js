window.onload = function(){ 
    buscar();
}

setInterval(buscar, 10000);

async function buscar() {

    const url = "http://localhost:3000/sensor";
    
    const response = await fetch(url, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    });

    const valores = await response.json();
    atualizar_tabela(valores);
}

function atualizar_tabela(valores) {
    let corpo = '';
    
    let tabela = document.getElementById("tabela_sensor");
    
    const inicio = `
    <table class="table table-striped bg-white">
        <thead>
          <tr>
            <th class="text-center"> Corrente </th>
            <th class="text-center"> Frequência </th>
            <th class="text-center"> Data - Hora </th>
          </tr>
        </thead>
        <tbody>
      `;

      valores.forEach(function(item){
        const data_hora = new Date( item.data_cadastro); 
        const data_registro = ((data_hora.getDate() )) + "/" + ((data_hora.getMonth() + 1)) + "/" + data_hora.getFullYear() +" - "+ data_hora.getHours() +":"+data_hora.getMinutes() +":"+data_hora.getSeconds(); 
        
        corpo += `
        <tr>
            <td class="text-center"> ` + item.corrente +      ` </td>
            <td class="text-center"> ` + item.frequencia +    ` </td>
            <td class="text-center"> ` + data_registro + ` </td>
        </tr>`;
          
      });

      const fim = "</tbody> </table>";

      tabela.innerHTML = [inicio + corpo + fim].join("\n");
}