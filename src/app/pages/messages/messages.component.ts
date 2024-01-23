import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessagesService} from "../../core/services/messages.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  message = '';
  messagesService = inject(MessagesService);
  private router = inject(Router);

  ngOnInit(): void {
  }

  onClose(): void {
    //to deactivate component we have to navigate to outletName with null path
    this.router.navigate([{outlets: {messagesOutletName: null}}]);
    this.messagesService.isDisplayed = false;
  }

  onSend(): void {
    if (this.message) {
      this.messagesService.addMessage(this.message);
      this.message = '';
    }
  }
}
