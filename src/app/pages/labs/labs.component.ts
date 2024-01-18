import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome : string = '¿Cómo estáaan?';
  tasks = signal([
    "Intalar angular",
    "Crear proyecto",
    "Crear componentes",
    "Crear servicio"
  ]);

  name = signal("Miguel");
  disabled = true;
  img = 'https://w3schools.com/howto/img_avatar.png';

  person = signal({
    name : 'Flor',
    age : 20,
    avatar :'https://w3schools.com/howto/img_avatar.png'
  });

  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50,{
    nonNullable: true
  });

  nameCtrl = new FormControl('Edita aquí',{
    nonNullable: true,
    validators : [
      Validators.required,
      Validators.minLength(3)
    ]
  })

  constructor()
  {
    this.colorCtrl.valueChanges.subscribe(value =>{
      console.log(value);
    })
  }

  clickHandler()
  {
    alert('Hola');
  }

  changeHandler($event : Event)
  {
    const input = $event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }

  keydownHandler($event :KeyboardEvent)
  {
    const input = $event.target as HTMLInputElement;
    console.log(input.value);
  }
}
