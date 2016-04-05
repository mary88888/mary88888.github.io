if ('serviceWorker' in navigator) {
               
  navigator.serviceWorker.register('sw.js').then(function(r) {
      console.log(r);
   console.log("Registeration successful");
  }).catch(function(r) {
       console.log(r);
    console.log("Registeration unsuccessful");
  });
}
