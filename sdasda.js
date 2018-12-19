
enviar.addEventListener('click', () => {
  let jobId = document.getElementById('jobId').value;
  const team = document.getElementById('team').value;
  if(jobId === ''){
    swal('llene los campos', '','error');
  } else if(team ===''){
    swal('llene los campos','', 'error');
  }else {
    apiPost();
  }
});
/* function safeCall(){
  const data = datos;
  data.call ++;
  let time = data.call * 5000;
 setTimeout(()=> {
  apiPost();
 }, time);
}*/
const apiPost = () => {
  let jobId = document.getElementById('jobId').value;
  const team = document.getElementById('team').value;
  const url = 'https://api.tookanapp.com/v2/edit_task';
  const data = {
    "api_key":"5161688df9054a454b462e6b571021471fe5cdf92cdb723e5a1f",
    "team_id":`${team}`, 
    "job_id":`${jobId}`, 
    "notify": 1,
    "call": 1
  }
  console.log(`1 ${JSON.stringify(data)}`);

  data.call ++;
  let time = data.call * 5000;
  setTimeout(function() {
    console.log(`2 ${JSON.stringify(data)}`);
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
      for(let i in data){
        if(data[i].hasOwnProperty('team_id' && 'job_id')){  
            data[i].job_id = jobId.split(',');
            data[i].team_id = team;
        }
     }
      console.log(`1 ${JSON.stringify(data.team_id)}`);
      console.log(`2 ${JSON.stringify(data.job_id)}`);
    });
  }, time);
}