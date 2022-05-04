const postData = async (formData) => {
  try {
    const response = await fetch("http://localhost:3333/transactions/register/file", {
      method: "POST",
      body: formData
    })
    const res = await response.json();
    return res;
  } catch {
    console.error(error);
  }
};

const geAllFullTransactionsData = async () => {
  try {
    const response = await fetch(`http://localhost:3333/transactions/list`, {
      method: "GET"
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.error(error);
  }
};

const geAllResumeTransactionsData = async () => {
  try {
    const response = await fetch(`http://localhost:3333/transactions/resume`, {
      method: "GET"
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.error(error);
  }
};

async function listAllData(formData) {  
  await postData(formData);
  alert('Arquivos importados com Sucesso, clique em Listar para visualizar os registros inseridos.');
}

function clearTables() {
  span1 = document.getElementById('totalR');
  span1.innerHTML = "";
  span2 = document.getElementById('totalT');
  span2.innerHTML = "";

  const table1 = document.getElementById('transactions-table');
  table1.innerHTML = "";
  
  const table2 = document.getElementById('resume-table');
  table2.innerHTML = "";
}

async function listData() {
  clearTables();

  const allResumeData = await geAllResumeTransactionsData();
  let { message: resumeTransactions } = allResumeData;

  const allTransactionData = await geAllFullTransactionsData();
  let { message: transactions } = allTransactionData;

  if (!Object.keys(resumeTransactions).length || !(Object.keys(transactions).length)) {
    alert('Não há registros a serem listados.');
    return
  }

  const buildAmountData = []
  for (const [client, amount] of Object.entries(resumeTransactions)) {
    const totalAmount = amount.totalAmount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })

    buildAmountData.push({ client, totalAmount })
  }

  function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
      let th = document.createElement("th");
      let text = document.createTextNode(key.toUpperCase());
      th.appendChild(text);
      row.appendChild(th);
    }
  }

  function generateTable(table, data) {
    for (let element of data) {
      let row = table.insertRow();
      for (let key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
    }
  }

  const table1 = document.getElementById('transactions-table');
  let data1 = Object.keys(transactions[0]);
  generateTableHead(table1, data1);
  generateTable(table1, transactions);
  span1 = document.getElementById('totalT');
  span1.innerHTML = ` (${transactions.length})`;

  const table2 = document.getElementById('resume-table');
  let data2 = Object.keys(buildAmountData[0]);
  generateTableHead(table2, data2);
  generateTable(table2, buildAmountData);
  span2 = document.getElementById('totalR');
  span2.innerHTML = ` (${buildAmountData.length})`;

  alert('Registros obtidos com sucesso!');
}

document.getElementById("uploadButton").onclick = () => {
  clearTables();
  let fileElement = document.getElementById('fileInput')

  if (fileElement.files.length === 0) {
    alert('Escolha um arquivo CNAB (.txt) para processar')
    return
  }

  let file = fileElement.files[0]

  let formData = new FormData();
  formData.set('file', file);

  listAllData(formData);
}

document.getElementById("getDataButton").onclick = () => {
  listData();
}

document.getElementById("clearListButton").onclick = () => {
  clearTables();
}
