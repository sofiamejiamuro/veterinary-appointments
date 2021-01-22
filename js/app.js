// Variables
const formDOM = document.querySelector('#nueva-cita');
const petNameDOM = document.querySelector('#mascota');
const petOwnerDOM = document.querySelector('#propietario');
const phoneDOM = document.querySelector('#telefono');
const dateDOM = document.querySelector('#fecha');
const timeDOM = document.querySelector('#hora');
const symptomsDOM = document.querySelector('#sintomas');
const appointmentContainer = document.querySelector('#citas');
let appointmentsAray = [];

// Clasess
class Appointment {
  // In this case I wont need a constructure because I wont manipulate inside the data as in the prevous project were I had to add, substract, etc.
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

  addAppointmentToList(appointmentsAray){
    appointmentsAray.forEach(appointment => {
      const {petName, petOwner, phone, date, time, symptoms, id } = appointment;

      const appointmentDOM = document.createElement('div');
      appointmentDOM.classList.add('cita', 'p-3');
      appointmentDOM.dataset.id = id;

      // DOM SCRIPTING 
      const petInfo = document.createElement('h2');
      petInfo.classList.add('card-title', 'font-weight-bolder');
      petInfo.innerHTML = `${petName}`;

      const ownerInfo = document.createElement('p');
      ownerInfo .innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${petOwner}`;

      const phoneInfo  = document.createElement('p');
      phoneInfo .innerHTML = `<span class="font-weight-bolder">Teléfono: </span> ${phone}`;

      const dateInfo  = document.createElement('p');
      dateInfo .innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${date}`;

      const timeInfo  = document.createElement('p');
      timeInfo .innerHTML = `<span class="font-weight-bolder">Hora: </span> ${time}`;

      const symptomsInfo  = document.createElement('p');
      symptomsInfo .innerHTML = `<span class="font-weight-bolder">Síntomas: </span> ${symptoms}`;

      const btnDelete = document.createElement('button');
      // btnEliminar.onclick = () => eliminarCita(id); // añade la opción de eliminar
      btnDelete.classList.add('btn', 'btn-danger', 'mr-2');
      btnDelete.innerHTML = 'Eliminar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

      // Añade un botón de editar...
      const btnEdit = document.createElement('button');
      // btnEditar.onclick = () => cargarEdicion(cita);

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
};

const ui = new UI();

// Functions
const onSubmit = (e) => {
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
    ui.alert('Cita añadida correctamente', 'success')
     // CREATE NEW ITEM OBJECT
    const newAppointmentItem = {
      id : Date.now(),
      petName: petNameDOM.value,
      petOwner: petOwnerDOM.value,
      phone: phoneDOM.value,
      date: dateDOM.value,
      time: timeDOM.value,
      symptoms: symptomsDOM.value
    }
    appointmentsAray = [...appointmentsAray,newAppointmentItem ];

    ui.addAppointmentToList(appointmentsAray);
  } else {
    // Error
    ui.alert('Todos los campos deben estar llenos', 'error')
    // console.log('there is at least one empty element');
  }

    //console.log(appointmentsAray);
};

// Listeners
formDOM.addEventListener('submit', onSubmit);
