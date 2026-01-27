import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { PopoverModule } from 'primeng/popover';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginFormComponent } from '../login-form/login-form.component';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'app-header',
	imports: [ CommonModule, RouterModule, MenubarModule, ButtonModule, PopoverModule, InputTextModule, FormsModule,
				ReactiveFormsModule ],		
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent {
	isLoggedIn = false;
	isScrolled = false;
	searchControl = new FormControl();
	ref: DynamicDialogRef<LoginFormComponent> | null = null;
	private dialogService = inject(DialogService);
	private messageService = inject(MessageService);

	constructor() {}

	@HostListener('window:scroll')
	onScroll() {
		this.isScrolled = window.scrollY > 20;
	}

	
	onSearchSubmit() {
		const query = this.searchControl.value;

		this.messageService.add({
			severity: 'contrast	',
			summary: 'Your search:',
			detail: `${query}`,
			life: 3000,
		});
	}

	showLoginForm() {
		this.ref = this.dialogService.open(LoginFormComponent, {
			showHeader: false,
            width: '25vw',
			closable: true,
            modal: true,
			draggable:false,
			resizable: false,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
			}
		});
		this.ref?.onClose.subscribe((user?: { mail: string; password: string } | undefined) => {
			if (user) {
				this.isLoggedIn = true;
			}
		})
		/* this.ref?.onClose.subscribe((loggedIn?: boolean) => {
			if (loggedIn === true){
				setTimeout(() => {
					console.log('Logging in...');
				});
			}	
		}); */
		// TODO: Move this later
		//this.isLoggedIn = true;
	}
	logOut() {
		console.log('Logging out...');
		// TODO: clear tokens / call backend logout / redirect
		this.isLoggedIn = false;
	}
}
