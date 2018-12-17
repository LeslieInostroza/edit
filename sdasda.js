enviar.addEventListener('click', () => {
  let jobId = document.getElementById('jobId').value;
  const name = document.getElementById('name').value;
  const url = 'https://api.tookanapp.com/v2/edit_task';
  const data = {
    "api_key":"5161688df9054a454b462e6b571021471fe5cdf92cdb723e5a1f",
    "team_id":`${name}`, 
    "job_id":`${jobId}`, 
    "notify": 1
  };
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(explorer => {
    console.log('Success:', explorer)
    data.job_id = jobId;
    data.team_id = name;
    console.log(`1 ${JSON.stringify(data.team_id)}`);
    console.log(`1 ${JSON.stringify(data.job_id)}`);
  });
});

25610191