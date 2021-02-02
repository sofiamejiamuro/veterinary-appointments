// Variables
const formDOM = document.querySelector('#nueva-cita');
const petNameDOM = document.querySelector('#mascota');
const petOwnerDOM = document.querySelector('#propietario');
const phoneDOM = document.querySelector('#telefono');
const dateDOM = document.querySelector('#fecha');
const timeDOM = document.querySelector('#hora');
const symptomsDOM = document.querySelector('#sintomas');
const appointmentContainer = document.querySelector('#citas');
let editing;

class Appointments {
  constructor(){
    this.appointments = []
  };

  addAppointment(appointment){
    //console.log( this.appointments );
    // take copy of this.appointments and add the next appointment
    this.appointments = [...this.appointments, appointment ];
    // console.log( this.appointments )
    // console.log(appointment);
  };

  deleteAppointmentFromArray(id){
    this.appointments = this.appointments.filter(appointment => appointment.id !== id)
  };

  editAppointmentFromArray(updatedAppointment){
    this.appointments = this.appointments.map(appointment => appointment.id === updatedAppointment.id ? updatedAppointment : appointment )
  }
};

class UI {
  alert(message, type){
    const messageDOM = document.createElement('div');
    messageDOM.classList.add('text-center', 'alert', 'd-block', 'col-12');
    if(type === 'error') {
      messageDOM.classList.add('alert-danger');
    } else {
      messageDOM.classList.add('alert-success');
    };
    messageDOM.textContent = message;
    document.querySelector('#contenido').insertBefore( messageDOM , document.querySelector('.agregar-cita'));

    setTimeout(() => {
      messageDOM.remove();
    }, 2000);
  };

  // Destructuring from the function parameters
  printAppointments({appointments}){
    // console.log(appointments);
    this.clearHTML();
    appointments.forEach(appointment => {
      const {pet, owner, phone, date, time, symptoms, id } = appointment;

      const appointmentDOM = document.createElement('div');
      appointmentDOM.classList.add('cita', 'p-3');
      appointmentDOM.dataset.id = id;

      // DOM SCRIPTING 
      const petInfo = document.createElement('h2');
      petInfo.classList.add('card-title', 'font-weight-bolder');
      petInfo.innerHTML = `${pet}`;

      const ownerInfo = document.createElement('p');
      ownerInfo .innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${owner}`;

      const phoneInfo  = document.createElement('p');
      phoneInfo .innerHTML = `<span class="font-weight-bolder">Teléfono: </span> ${phone}`;

      const dateInfo  = document.createElement('p');
      dateInfo .innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${date}`;

      const timeInfo  = document.createElement('p');
      timeInfo .innerHTML = `<span class="font-weight-bolder">Hora: </span> ${time}`;

      const symptomsInfo  = document.createElement('p');
      symptomsInfo .innerHTML = `<span class="font-weight-bolder">Síntomas: </span> ${symptoms}`;

      const btnDelete = document.createElement('button');
      btnDelete.onclick = () => deleteAppointment(id); 
      btnDelete.classList.add('btn', 'btn-danger', 'mr-2');
      btnDelete.innerHTML = 'Eliminar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
      
      const btnEdit = document.createElement('button');
      btnEdit.onclick = () => editAppointment(appointment);
      btnEdit.classList.add('btn', 'btn-info');
      btnEdit.innerHTML = 'Editar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'

      // add to HTML
      appointmentDOM.appendChild(petInfo );
      appointmentDOM.appendChild(ownerInfo);
      appointmentDOM.appendChild(phoneInfo);
      appointmentDOM.appendChild(dateInfo);
      appointmentDOM.appendChild(timeInfo);
      appointmentDOM.appendChild(symptomsInfo);
      appointmentDOM.appendChild(btnDelete)
      appointmentDOM.appendChild(btnEdit)
      appointmentContainer.appendChild(appointmentDOM);
    });    
  };

  clearHTML(){
    while(appointmentContainer.firstChild){
      appointmentContainer.removeChild(appointmentContainer.firstChild);
    };
  };
};

const ui = new UI();
const manageAppointments = new Appointments();

eventListeners();
function eventListeners(){
  petNameDOM.addEventListener('input', appointmentInfo);
  petOwnerDOM.addEventListener('input', appointmentInfo);
  phoneDOM.addEventListener('input', appointmentInfo);
  dateDOM.addEventListener('input', appointmentInfo);
  timeDOM.addEventListener('input', appointmentInfo);
  symptomsDOM.addEventListener('input', appointmentInfo);
  formDOM.addEventListener('submit', newAppointment);
};

// It is a global object
const appointmentItem = {
  pet: '',
  owner: '',
  phone: '',
  date: '',
  time: '',
  symptoms: ''
};

function appointmentInfo(e) {
  appointmentItem[e.target.name] = e.target.value
  // console.log(appointmentItem);
};

function newAppointment(e) {
  e.preventDefault();
  // console.log(e.target.elements);
  // console.log(typeof e.target.elements); // object
  const arrayFromForm = Array.from(e.target.elements);
  // VALIDATE THAT THERE IS NO EMPTY INPUT VALUES
  // if some input element its value is empty then true, if there is no empty value then false 
  const emptyArray = arrayFromForm.some( input => input.value === "" ) 
  // console.log(emptyArray);
  if(!emptyArray){
    // console.log('there is no empty elements');
    
    if(editing){
      ui.alert('Editado correctamente')
      formDOM.querySelector('button[type="submit"]').textContent = 'Crear cita';
      manageAppointments.editAppointmentFromArray({...appointmentItem})
      editando = false
    }else{
      // CREATE NEW ITEM OBJECT and generate a unique ID 
      // console.log(appointmentItem);
      appointmentItem.id = Date.now();
      // console.log(appointmentItem);
      // Send the global object, thus it is rewriting the previous object  
      // manageAppointments.addAppointment(appointmentItem)
      // Send a copy of the global object and do not rewrite the previous content , just sending the mutated copy object
      manageAppointments.addAppointment({...appointmentItem})
      ui.alert('Cita añadida correctamente');
    };
    
    reinitObject();
    // The reset method resets the values of all elements in a form (same as clicking the Reset button)
    formDOM.reset();
    ui.printAppointments(manageAppointments);
    
  } else {
    // Error
    ui.alert('Todos los campos deben estar llenos', 'error')
    // console.log('there is at least one empty element');
  }
};

function reinitObject(){
  appointmentItem.pet = '';
  appointmentItem.owner = '';
  appointmentItem.phone = '';
  appointmentItem.date = '';
  appointmentItem.time = '';
  appointmentItem.symptoms = '';
};

function deleteAppointment(id) {
  manageAppointments.deleteAppointmentFromArray(id);
  ui.alert('Cita se eliminó correctamente');
  ui.printAppointments(manageAppointments);
};

function editAppointment(appointment){
  console.log(appointment);
  const {pet, owner, phone, date, time, symptoms, id } = appointment;
  // Fill inputs
  petNameDOM.value = pet;
  petOwnerDOM.value = owner;
  phoneDOM.value = phone;
  dateDOM.value = date;
  timeDOM.value = time;
  symptomsDOM.value = symptoms;

  // Fill global object
  appointmentItem.pet = pet;
  appointmentItem.owner = owner;
  appointmentItem.phone = phone;
  appointmentItem.date = date;
  appointmentItem.time = time;
  appointmentItem.symptoms = symptoms;
  appointmentItem.id = id;

  formDOM.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

  editing = true;
};