import { Component, Injectable } from '@angular/core';
import { AppService } from './app.service';
import { NotificationService } from './services/notification.service';
import { Tarea } from './tarea';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent {

	//save the tareas in a variable of tupe array
	tareas: Tarea[];

	//Model to save the works temporally
	public tareaModel: Tarea

	// Variable to handle form status
	public isCreating = false;

	constructor(
		//Initialize the service in memory to be used
		public service: AppService,
		public notificationService: NotificationService,
		public dialog: MatDialog
	) {
		this.tareaModel = new Tarea(null, null, null, false)
	}

	//When the life cycle of angular starts
	ngOnInit() {
		//Get the works
		this.obtenerTareas();
	}

	//We get the array of tareas with the service
	async obtenerTareas() {
		this.tareas = await this.service.obtenerTareas();
	}

	//Change the color of the hearth with the favorite state value
	changeFavorite(i) {
		if (this.tareas[i].favorite == true) {
			this.tareas[i].favorite = false;
		} else {
			this.tareas[i].favorite = true;
		}
	}

	delete(i) {
		//Delete the object into the array
		this.tareas.splice(i, 1)
		//Show notification message
		this.notificationService.showInfoToast("Tarea eliminada correctamente")
	}

	//order smallest to largest
	sortAsc() {
		this.tareas.sort((a, b) => a.minutos - b.minutos);
	}
	//order smallest to smallest
	sortDesc() {
		this.tareas.sort((a, b) => b.minutos - a.minutos);
	}

	//Show the form of create
	activateForm() {
		this.isCreating = true;
	}

	//Create a new work
	createWork() {
		//Get the value of length of array 
		//if the value of id is not null
		if (this.tareas.length > 0) {
			var position = this.tareas.length - 1
			//Set the last id in array+1
			this.tareaModel.id = this.tareas[position].id + 1
			//Save the new Tarea
			this.tareas.push(new Tarea(this.tareaModel.id, this.tareaModel.titulo, this.tareaModel.minutos, this.tareaModel.favorite))
			//Hide the form of create
			this.isCreating = false;
			this.notificationService.showInfoToast("Tarea agregada correctamente")
			this.tareaModel.titulo = ""
			this.tareaModel.minutos = 0
			//If cannot find the id we have to set 1
		} else if (this.tareas.length == 0) {
			this.tareaModel.id = 1
			//Save the new Tarea
			this.tareas.push(new Tarea(this.tareaModel.id, this.tareaModel.titulo, this.tareaModel.minutos, this.tareaModel.favorite))
			//Hide the form of create
			this.isCreating = false;
			this.notificationService.showInfoToast("Tarea agregada correctamente")
			this.tareaModel.titulo = ""
			this.tareaModel.minutos = 0
		}


	}

	//Hide the form of create
	inactivateForm() {
		this.isCreating = false;
	}

}
