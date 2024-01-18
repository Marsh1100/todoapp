import { CommonModule } from '@angular/common';
import { Component, signal, computed, effect, Injector, inject} from '@angular/core';
import { ITask } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks= signal<ITask[]>([]);

  constructor()
  {
   
  }
  injector = inject(Injector);
  ngOnInit()
  {
    const storage = localStorage.getItem('tasks');
    if(storage)
    {
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
    this.trackTasks();
  }

  trackTasks()
  {
    effect(()=> {
      const tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks)); 
    }, {injector : this.injector})
  }

  filter = signal('all');
  //Este es una nueva señal que de deriva otra
  taskByFilter = computed(()=>{
    const filter = this.filter();
    const tasks = this.tasks();

    if(filter === 'pending')
    {
      return tasks.filter(task => !task.completed);
    }
    if(filter === 'completed')
    {
      return tasks.filter(task => task.completed);
    }
    return tasks;
  });

  newTaskCtrl = new FormControl('',{
    nonNullable: true,
    validators: [
      Validators.required
    ]
  });


  placeholder : string = "Type new task";


  changeHandler()
  {
    if(this.newTaskCtrl.valid && this.newTaskCtrl.value.trim() !== '')
    {
      const value  = this.newTaskCtrl.value;
      this.addTask(value);
    }
    this.newTaskCtrl.setValue('');

  }

  changeEdit(index: number, $event :Event)
  {
    const input = $event.target as HTMLInputElement;
    this.tasks.update((tasks)=> {
      return tasks.map((task, position) => {
        if (position === index)
        {
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task;
      });
    });
  }

  addTask(title: string)
  {
    const newTask = {
      id : Date.now(),
      title,
      completed: false
    };

    this.tasks.update((tasks)=> [...tasks, newTask]);
  }

  deleteTask(index : number)
  {
    this.tasks.update((tasks)=> tasks.filter((task, position) => position !== index));
  }

  updateTask(index : number)
  {
    this.tasks.update((tasks)=> {
      return tasks.map((task, position) => {
        if (position === index)
        {
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task
      });
    });
  }

  updatTaskEditingMode(index:number)
  {
    if(this.tasks()[index].completed === false){
      this.tasks.update((tasks)=> {
        return tasks.map((task, position) => {
          if (position === index)
          {
            return {
              ...task,
              editing: true
            }
          }
          return {
            ...task,
            editing: false
          }
        });
      });
    }
  }


  changeFilter(filter : string)
  {
    this.filter.set(filter);
  }
  
}
