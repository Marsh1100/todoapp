import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
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

  person = {
    name : 'Flor',
    age : 20,
    avatar :'https://w3schools.com/howto/img_avatar.png'
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
