import { Component } from '@angular/core';
import { EmailIconComponent } from 'core/UI/icons/email/email.component';
import { GitHubIconComponent } from 'core/UI/icons/github/github-icon.component';
import { LinkedInIconComponent } from 'core/UI/icons/linked-in/linked-in.component';
import { PhoneIconComponent } from 'core/UI/icons/phone/phone.component';

@Component({
  selector: 'app-site-footer',
  imports: [GitHubIconComponent, LinkedInIconComponent, PhoneIconComponent, EmailIconComponent],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
})
export class SiteFooterComponent {}
