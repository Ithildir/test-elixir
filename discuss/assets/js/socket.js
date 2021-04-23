import { htmlEscape } from "escape-goat";
import { Socket } from "phoenix";

let socket = new Socket("/socket", {params: {token: window.userToken}})

socket.connect()

const commentTemplate = (comment) => {
  let email = 'Anonymous';

  if (comment.user) {
    email = comment.user.email;
  }

  return `
    <li class="collection-item">
      ${htmlEscape(comment.content)}
      <div class="secondary-content">
        ${htmlEscape(email)}
      </div>
    </li>
  `
};

const renderComment = (comment) => {
  const renderedComment = commentTemplate(comment);

  document.querySelector('.collection').innerHTML += renderedComment;
};

const renderComments = (comments) => {
  const renderedComments = comments.map(commentTemplate);

  document.querySelector('.collection').innerHTML = renderedComments.join('');
};

const createSocket = (topicId) => {
  let channel = socket.channel(`comments:${topicId}`, {})

  channel.join()
    .receive("ok", resp => renderComments(resp.comments))
    .receive("error", resp => { console.log("Unable to join", resp) })

  channel.on(`comments:${topicId}:new`, (data) => renderComment(data.comment));

  document.querySelector('button').addEventListener('click', () => {
    const content = document.querySelector('textarea').value;

    channel.push('comment:add', { content });
  });
};

window.createSocket = createSocket;
