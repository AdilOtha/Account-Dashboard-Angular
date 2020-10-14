import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BotTransactionComponent } from './bot-transaction/bot-transaction.component';
import { AgentComponent } from './agent/agent.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { BillTransactionComponent } from './bill-transaction/bill-transaction.component';
import { SubUsersComponent } from './sub-users/sub-users.component';
import { AiBotComponent } from './ai-bot/ai-bot.component';
import { MyTemplateComponent } from './my-template/my-template.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditTemplateComponent } from './edit-template/edit-template.component';
import { BotSettingsComponent } from './bot-settings/bot-settings.component';
import { AddAgentComponent } from './add-agent/add-agent.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { DecimalPipe } from '@angular/common';

import { NgbdSortableHeader } from './sortable.directive';
import { PswdMatchValidatorDirective } from './validators/pswd-match-validator.directive';

@NgModule({
  declarations: [
    AppComponent,    
    BotTransactionComponent,
    AgentComponent,
    InvoiceComponent,
    BillTransactionComponent,
    SubUsersComponent,
    AiBotComponent,
    MyTemplateComponent,
    EditTemplateComponent,
    BotSettingsComponent,
    AddAgentComponent,
    UpdatePasswordComponent,
    EditPasswordComponent,
    MyProfileComponent,
    NgbdSortableHeader,
    PswdMatchValidatorDirective    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,    
    HttpClientModule       
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
