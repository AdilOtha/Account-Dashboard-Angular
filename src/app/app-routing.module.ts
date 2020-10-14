import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BotTransactionComponent } from './bot-transaction/bot-transaction.component';
import { AgentComponent } from './agent/agent.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { BillTransactionComponent } from './bill-transaction/bill-transaction.component';
import { SubUsersComponent } from './sub-users/sub-users.component';
import { AiBotComponent } from './ai-bot/ai-bot.component';
import { MyTemplateComponent } from './my-template/my-template.component';
import { EditTemplateComponent } from './edit-template/edit-template.component';
import { BotSettingsComponent } from './bot-settings/bot-settings.component';
import { AddAgentComponent } from './add-agent/add-agent.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { MyProfileComponent } from './my-profile/my-profile.component';


const routes: Routes = [
  {
    path: "bot-transaction",
    component: BotTransactionComponent
  },
  {
    path: "agent",
    component: AgentComponent
  },
  {
    path: "invoice",
    component: InvoiceComponent
  },
  {
    path: "bill-transaction",
    component: BillTransactionComponent
  },
  {
    path: "sub-users",
    component: SubUsersComponent
  },
  {
    path: "ai-bot",
    component: AiBotComponent
  },
  {
    path: "my-templates",
    component: MyTemplateComponent
  },
  {
    path: "edit-template",
    component: EditTemplateComponent
  },
  {
    path: "bot-settings",
    component: BotSettingsComponent
  },
  {
    path: "add-agent",
    component: AddAgentComponent
  },
  {
    path: "edit-password",
    component: EditPasswordComponent
  },
  {
    path: "my-profile",
    component: MyProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
