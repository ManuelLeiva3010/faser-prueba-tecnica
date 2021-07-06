import { Component, Injectable, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
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

	sortDesc() {
		this.tareas.sort((a, b) => b.minutos - a.minutos);
	}

	activateForm() {
		this.isCreating = true;
	}


	createWork() {
		var position = this.tareas.length - 1
		this.tareaModel.id = this.tareas[position].id + 1
		this.tareas.push(new Tarea(this.tareaModel.id, this.tareaModel.titulo, this.tareaModel.minutos, this.tareaModel.favorite))
		this.isCreating = false;
	}

	inactivateForm() {
		this.isCreating = false;
	}

}
