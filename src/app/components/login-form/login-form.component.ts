import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

type AuthMode = 'login' | 'register';

export const matchPasswordsValidator: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {
  const pwd = form.get('password')?.value;
  const confirmControl = form.get('confirmPassword');

  if (!pwd || !confirmControl) {
    return null;
  }
  if (pwd !== confirmControl.value) {
    confirmControl.setErrors({ passwordsMismatch: true });
  } else {
    const errors = confirmControl.errors;
    if (errors) {
      delete errors['passwordsMismatch'];
      if (Object.keys(errors).length === 0) {
        confirmControl.setErrors(null);
      } else {
        confirmControl.setErrors(errors);
      }
    }
  }
  return null;
};

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ CommonModule, ButtonModule, ReactiveFormsModule, InputTextModule, FormsModule, FloatLabelModule, MessageModule ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
	mode: AuthMode = 'login';
	loginForm!: FormGroup;
	loading = false;
	formSubmitted = false;

	private fb = inject(FormBuilder);
	private messageService = inject(MessageService);
	private ref = inject(DynamicDialogRef);

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			mail: ['', Validators.required],
			password: ['', Validators.required],
			confirmPassword: [''],
		});
	}

	isInvalid(controlName: string) {
		const control = this.loginForm.get(controlName);
		return control?.invalid && (control.touched || this.formSubmitted);
	}
	passwordsDontMatch() {
		const pwd = this.loginForm.get('password')?.value;
		const confirm = this.loginForm.get('confirmPassword')?.value;
		return this.mode === 'register' && confirm && pwd !== confirm;
	}
	setMode(mode: AuthMode) {
		this.mode = mode;
		const confirm = this.loginForm.get('confirmPassword');

		if (mode === 'register') {
		confirm?.setValidators([Validators.required]);
    	this.loginForm.setValidators(matchPasswordsValidator);
		} else {
		confirm?.clearValidators();
		confirm?.reset();
		this.loginForm.clearValidators(); 
		}
		confirm?.updateValueAndValidity();
		this.loginForm.updateValueAndValidity();
		this.formSubmitted = false;
	}

	loginSubmit() {
		this.formSubmitted = true;
		if (this.loginForm.invalid || this.passwordsDontMatch()) {
			this.loginForm.markAllAsTouched();
			return;
		}
		this.loading = true;
		const email = this.loginForm.value.mail;
		const password = this.loginForm.value.password;
		const maskedPassword = '*'.repeat(password.length);
		if (this.mode === 'login') {
			this.messageService.add({
				severity: 'success',
				summary: 'Login Submitted',
				detail: `Email: ${email}, Password: ${maskedPassword}`,
				life: 3000,
			});
		} else {
			this.messageService.add({
				severity: 'info',
				summary: 'Register Submitted',
				detail: `Email: ${email}, Password: ${maskedPassword}`,
				life: 3000,
			});
		}
		this.ref.close({
			mode: this.mode,
			...this.loginForm.value
		});
	}
	loginCancel() {
		this.ref.close();
	}
}
