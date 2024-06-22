import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoiceAccountComponent } from './choice-account.component';
import { RouterModule } from '@angular/router';
import { choiceAccountRoutes } from './choice-account.routing';

@NgModule({
    declarations: [ChoiceAccountComponent],
    imports: [RouterModule.forChild(choiceAccountRoutes)],
})
export class ChoiceAccountModule {}
