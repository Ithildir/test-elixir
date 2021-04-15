import { htmlEscape } from "escape-goat";
import { Socket } from "phoenix";

let socket = new Socket("/socket", {params: {token: window.userToken}})

socket.connect()

const renderComments = (comments) => {
  const renderedComments = comments.map((comment) => `<li class="collection-item">${htmlEscape(comment.content)}</li>`);

  document.querySelector('.collection').innerHTML = renderedComments.join('');
};

const createSocket = (topicId) => {
  let channel = socket.channel(`comments:${topicId}`, {})

  channel.join()
    .receive("ok", resp => renderComments(resp.comments))
    .receive("error", resp => { console.log("Unable to join", resp) })

  document.querySelector('button').addEventListener('click', () => {
    const content = document.querySelector('textarea').value;

    channel.push('comment:add', { content });
  });
};

window.createSocket = createSocket;
