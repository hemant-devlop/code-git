const hours1=document.getElementById('hours')
const minuts1=document.getElementById('minuts')
const seconds1=document.getElementById('seconds')


function getClock(){
  const time=new Date()

  let hours=time.getHours();
  const minuts=time.getMinutes();
  const seconds=time.getSeconds();

  const ampm=hours>=12 ? 'PM':"AM"

  hours=hours % 12;
  hours=hours?hours:12;

  const formatHours=String(hours).padStart(2,'0')
  const formatMinutes=String(minuts).padStart(2,'0')
  const formatseconds=String(seconds).padStart(2,'0')

  hours1.textContent=formatHours;
  minuts1.textContent=formatMinutes;
  seconds1.textContent=formatseconds;

}



setInterval(getClock,1000)