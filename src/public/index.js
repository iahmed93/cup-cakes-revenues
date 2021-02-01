document.querySelector('#submit-btn').addEventListener('click', () => {
  handleFilesUpload();
  document.querySelector('#upload').style.display = "none";
  document.querySelector('#loader').style.display = "block";
  setTimeout(() => {
    getRevenues();
  }, 4000);
});

let currentTabId = '#basic-tab'; 

document.querySelector('#tabs-nav').addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.nodeName == 'A') {
    const id = event.target.getAttribute('href');
    document.querySelector(id).style.display = 'block';
    document.querySelector(currentTabId).style.display = 'none';
    currentTabId = id;
  }
});

const handleFilesUpload = event => {
  // const files = event.target.files
  const basicFile = document.querySelector('#basic-file').files[0];
  const deluxFile = document.querySelector('#delux-file').files[0];
  const totalFile = document.querySelector('#total-file').files[0];

  const formData = new FormData();

  formData.append('basic', basicFile);
  formData.append('delux', deluxFile);
  formData.append('total', totalFile);

  fetch('/files', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
}

const showRevenues = async (revenues) => {

  //basic
  //yearly
  await renderTable(revenues.basic.yearly, 'basic-yearly-revenue', 'YYYY');

  // monthly
  await renderTable(revenues.basic.monthly, 'basic-monthly-revenue', 'MMM-YYYY');

  // weekly
  await renderTable(revenues.basic.weekly, 'basic-weekly-revenue', 'MMM-DD-YYYY');

  // delux
  //yearly
  await renderTable(revenues.deluxe.yearly, 'delux-yearly-revenue', 'YYYY');

  // monthly
  await renderTable(revenues.deluxe.monthly, 'delux-monthly-revenue', 'MMM-YYYY');

  // weekly
  await renderTable(revenues.deluxe.weekly, 'delux-weekly-revenue', 'MMM-DD-YYYY');

  //total
  //yearly
  await renderTable(revenues.total.yearly, 'total-yearly-revenue', 'YYYY');

  // monthly
  await renderTable(revenues.total.monthly, 'total-monthly-revenue', 'MMM-YYYY');

  // weekly
  await renderTable(revenues.total.weekly, 'total-weekly-revenue', 'MMM-DD-YYYY');

}

const renderTable = async (map, tableId, dateFormat) => {
  const fragment = document.createDocumentFragment();
  for (let item in map) {
    const trElement = document.createElement('tr');
    const monthTdElement = document.createElement('td');
    const revenueTdElement = document.createElement('td');

    monthTdElement.textContent = moment(item).format(dateFormat);
    revenueTdElement.textContent = `$${map[item]}`;

    trElement.appendChild(monthTdElement);
    trElement.appendChild(revenueTdElement);
    fragment.appendChild(trElement);
  }
  const tableElement = document.querySelector(`#${tableId}`);
  tableElement.appendChild(fragment);
}

const getRevenues = () => {
  fetch('/revenue', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);

      if (data.basic && data.deluxe && data.total) {
        document.querySelector('#loader').style.display = "none";
        document.querySelector('#result').style.display = "block";
        showRevenues(data);
        // clearInterval(getRevenueInterval);
      } else {
        throw new Error('IncompleteData')
      }

    })
    .catch(error => {
      if (error == 'IncompleteData') {
        console.log('Try Again')
      }
      console.error(error);
    });
}