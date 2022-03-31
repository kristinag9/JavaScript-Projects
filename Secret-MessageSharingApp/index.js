const { hash } = window.location;

const message = atob(hash.replace('#', ''));
if(message) {
   document.querySelector('#message-form').classList.add('hide');
   document.querySelector('#message-show').classList.remove('hide');

   document.querySelector('h1').innerHTML = message;
}

document.querySelector('form').addEventListener('submit', event => {
   event.preventDefault(); // to stop the default browser behavior which will submit the form

   document.querySelector('#message-form').classList.add('hide');
   document.querySelector('#link-form').classList.remove('hide');
   const input = document.querySelector('#message-input');
   const encrypted = btoa(input.value);
   const messageInput = document.querySelector('#link-input');
   messageInput.value = `${window.location}#${encrypted}`;
   messageInput.select();
});