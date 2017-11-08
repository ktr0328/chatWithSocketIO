import * as $ from 'jquery';

export function reloadPrivateMessagingList(userList, currentUser) {
  const list = $('#messageTo');
  list.empty();
  list.append("<option id='toAll'>All</option>");

  Object.keys(userList)
    .filter(username => userList[username] && username != currentUser)
    .forEach((username) => {
      list.append(`<option id="to${username}">${username}</option>`);
    });
}
