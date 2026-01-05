import { updateEmployeeInState } from '../../state/state';

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'src/features/employee-edit-modal/employee-edit-modal.css';
document.head.appendChild(link);

export function renderEditEmployeePopUp(employee) {
  const background = document.createElement('div');
  background.classList.add('employee-edit-background');

  const card = document.createElement('article');
  card.classList.add('employee-edit-card');

  const form = createForm(employee);
  form.classList.add('employee-edit-form');

  card.append(form);
  background.append(card);

  card.addEventListener('click', (e) => e.stopPropagation());
  background.addEventListener('click', closeModal);

  document.body.prepend(background);
}

function createForm(employee) {
  const form = document.createElement('form');

  const name = createLabeledInput({
    label: 'Name',
    name: 'name',
    value: employee.name ? employee.name : '',
    placeholder: 'Name',
  });

  const location = createLabeledInput({
    label: 'Location',
    name: 'location',
    value: employee.location ? employee.location : '',
    placeholder: 'Location',
  });

  const status = createLabeledInput({
    label: 'Status',
    name: 'status',
    value: employee.status ? employee.status : '',
    placeholder: 'Status',
  });

  const desiredPresent = createLabeledInput({
    label: 'Desired Present',
    name: 'desiredPresent',
    value: employee.desiredPresent ? employee.desiredPresent : '',
    placeholder: 'Desired Present',
  });

  const notes = createLabeledInput({
    label: 'Notes',
    name: 'notes',
    value: employee.notes ? employee.notes : '',
    placeholder: 'Notes',
  });

  const actions = document.createElement('div');
  actions.classList.add('employee-edit-form-actions');

  const saveBtn = document.createElement('button');
  saveBtn.type = 'submit';
  saveBtn.textContent = 'Save';
  saveBtn.classList.add('success');

  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.textContent = 'Cancel';

  actions.append(saveBtn, cancelBtn);

  form.append(
    name.labelElement,
    location.labelElement,
    status.labelElement,
    desiredPresent.labelElement,
    notes.labelElement,
    actions
  );

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newEmployeeData = {
      id: employee.id,
      name: name.input.value.trim(),
      location: location.input.value.trim(),
      status: status.input.value.trim(),
      desiredPresent: desiredPresent.input.value.trim(),
      notes: notes.input.value.trim(),
    };

    updateEmployeeInState(newEmployeeData);
    closeModal();
  });

  cancelBtn.addEventListener('click', closeModal);

  return form;
}

function createLabeledInput({
  label,
  name,
  value = '',
  placeholder = '',
  type = 'text',
}) {
  const labelElement = document.createElement('label');
  labelElement.textContent = label;

  const input = document.createElement('input');
  input.type = type;
  input.name = name;
  input.value = value;
  input.placeholder = placeholder;

  labelElement.append(input);

  return { labelElement, input };
}

function closeModal() {
  document.querySelector('.employee-edit-background')?.remove();
}
