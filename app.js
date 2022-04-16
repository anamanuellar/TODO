//* Criar banco de dados salvando no localStorage

const getBanco = () => JSON.parse(localStorage.getItem ('todoList')) ?? []; //*transformando string em array quando vier do localStorage. Se estiver vazio, trará o array vazio também
const setBanco = (banco) => localStorage.setItem ('todoList', JSON.stringify(banco));

//*Criar as tarefas 
const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
    <input type="checkbox" ${status} class="done" data-indice=${indice}>
    <div>${tarefa}</div>
    <input type="button" data-indice=${indice}>
    `;


    document.getElementById('todoList').appendChild(item);
}
//*Limpar tarefas

const limparTarefas =() => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild){
        todoList.removeChild(todoList.lastChild);
    }
}

//*Ler o banco e a tualizar tela (render)

const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem (item.tarefa, item.status, indice));
}
//*Ler a tarefa digitada no input e inserir uma nova tarefa
const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter'){
        const banco = getBanco();    
        banco.push (  { 'tarefa': texto, 'status': '' });
        setBanco(banco);
        atualizarTela();
        evento.target.value = ''; //*limpar a tarefa
    }
}
//*Deletar tarefa
const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice (indice,1);
    setBanco(banco);
    atualizarTela();
}
//*Identifar as tarefas através do índice
const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ?  'checked' : '';
    setBanco(banco);
    atualizarTela();
}

//*Atualizar o status da tarefa
const clickItem = (evento) => {
    const elemento = evento.target;
     if (elemento.type === 'button') {
         const indice = elemento.dataset.indice;
         removerItem(indice);
     }  else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem (indice);
     }
}


document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();

