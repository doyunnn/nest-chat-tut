const socket = io('/chattings');

const getElementById = (id) => document.getElementById(id) || null;

//* get DOM element
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

//* global socket handler
socket.on('user_connected', (username) => {
  drawNewChat(`${username} is connected`);
});

socket.on('new_chat', ({chat, username}) => {
  drawNewChat(`${username}: ${chat}`);
});

const handleSubmit = (event) => {
  event.preventDefault();
  const value = event.target.elements[0].value;
  if (value !== ''){
    socket.emit('submit_chat', value);
    drawNewChat(`me: ${value}`);
    event.target.elements[0].value = ''
  }
};

//* draw functions
const drawHelloStranger = (username) =>
  (helloStrangerElement.innerText = `Hello ${username} Stranger :)`);
const drawNewChat = (message) => {
  const wrapperChatBox = document.createElement('div');
  const chatBox = `
    <div>
      ${message}
    </div>
  `;
  wrapperChatBox.innerHTML = chatBox;
  chattingBoxElement.append(wrapperChatBox);
}


function helloUser() {
  const username = prompt('What is your name?');
  socket.emit('new_user', username, (data) => {
    drawHelloStranger(data);
  });
}

function init() {
  helloUser();

  formElement.addEventListener('submit', handleSubmit);
}

init();
