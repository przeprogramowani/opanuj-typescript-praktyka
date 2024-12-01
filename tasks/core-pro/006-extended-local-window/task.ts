/* Rozszerz interfejs globalnego obiektu window o nowe właściwości wykorzystywane w poniższym kodzie */

window.storage = {
  temporaryValue: 'Am I testing this code or is it testing me?',
};

console.log(`Temporary value: ${window.storage.temporaryValue}`);
