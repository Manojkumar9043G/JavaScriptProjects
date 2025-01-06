[{"id":12321,"content" : " "},{"id":23412,"content" : " "}]

const Textarea = document.querySelector('.textBox');
const btn = document.querySelector('button');
const NextBtn = document.querySelector('.NextBox');

function getJsonElement(){
    return JSON.parse(localStorage.getItem('Notes') || '[]');
}


getJsonElement().forEach(element => {
    createNotes(element.id,element.content);
});

function createNotes(id,content){
    const newTextArea = document.createElement('textarea');
    newTextArea.value = content;
    newTextArea.placeholder = 'tell your wishes';


    let NewBox = document.createElement('div');
    let RBtn = document.createElement('a');
    RBtn.innerHTML = 'x';
    NewBox.className ='boxes';
    RBtn.className = 'RemoveBtn';

    RBtn.addEventListener('click',()=>{
        RemoveNote(id);
    });

    NewBox.appendChild(newTextArea);
    NewBox.appendChild(RBtn);

    Textarea.insertBefore(NewBox,btn);

    newTextArea.addEventListener('change',()=>
        UpdateNote(id,newTextArea.value)
    );
}

function RemoveNote(id){
    const Notes = getJsonElement();

    const NewNotes = Notes.filter((note)=>note.id!==id);
    console.log(id);
    SaveNotes(NewNotes);
    location.reload();
}

function CreateNewSticky(){
    const Notes = getJsonElement();
    let Random = Math.floor(Math.random()*100000);
    const NewNote = {id : Random,content : ""};
    createNotes(NewNote.id,NewNote.content);
    Notes.push(NewNote);
    SaveNotes(Notes);
}

function UpdateNote(id,content){
    const Notes = getJsonElement();
    const Update = Notes.filter((note)=>note.id==id)[0];
    Update.content = content;
    SaveNotes(Notes);
}

btn.addEventListener('click',()=>CreateNewSticky());

function SaveNotes(Notes){
    localStorage.setItem('Notes',JSON.stringify(Notes));
}
