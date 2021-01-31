document.querySelector('#submit-btn').addEventListener('click', () => {
  handleFilesUpload();
  document.querySelector('#upload').style.display = "none";
  document.querySelector('#loader').style.display = "block";
  setTimeout(() => {
    getRevenues();
    document.querySelector('#result').style.display = "block";
    document.querySelector('#loader').style.display = "none";
  }, 2000);
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

const showBasicRevenues = (revenues) => {
  const basicYearlyRevenues = revenues.basic.yearly;
  const yearlyTablefragment = document.createDocumentFragment();

  for (let year in basicYearlyRevenues) {
    const trElement = document.createElement('tr');
    const yearTdElement = document.createElement('td');
    const revenueTdElement = document.createElement('td');

    yearTdElement.textContent = year;
    revenueTdElement.textContent = `$${basicYearlyRevenues[year]}`;

    trElement.appendChild(yearTdElement);
    trElement.appendChild(revenueTdElement);
    yearlyTablefragment.appendChild(trElement);
  }
  const basicYearlyTable = document.querySelector('#basic-yearly-revenue');
  basicYearlyTable.appendChild(yearlyTablefragment);
  
  // monthly
  const basicMonthlyRevenues = revenues.basic.monthly;
  const monthlyTablefragment = document.createDocumentFragment();

  for (let month in basicMonthlyRevenues) {
    const trElement = document.createElement('tr');
    const monthTdElement = document.createElement('td');
    const revenueTdElement = document.createElement('td');

    monthTdElement.textContent = moment(month).format('MMM-YYYY');
    revenueTdElement.textContent = `$${basicMonthlyRevenues[month]}`;

    trElement.appendChild(monthTdElement);
    trElement.appendChild(revenueTdElement);
    monthlyTablefragment.appendChild(trElement);
  }
  const basicMonthlyTable = document.querySelector('#basic-monthly-revenue');
  basicMonthlyTable.appendChild(monthlyTablefragment);
}

const getRevenues = async () => {
  fetch('/revenue', {
    method: 'GET'
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    showBasicRevenues(data);
  })
  .catch(error => {
    console.error(error);
  });
}