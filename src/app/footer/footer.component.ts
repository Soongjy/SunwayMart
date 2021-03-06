import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  companyLogo !:string;
  companySlogan !:string;
  paymentOption !:string;
  contactNum !:string;
  address !:string;
  admindetails !:string;
  currentYear !:number;
  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();

    this.admindetails = JSON.parse(sessionStorage.getItem('admindetails')!);
    this.companyService.getCompanyInfo(1).subscribe(company=>{
      this.companyLogo = company.companyLogo;
      this.companySlogan = company.companySlogan;
      this.paymentOption = company.paymentOptionImage;
    })

    this.companyService.getContactUs(1).subscribe(contactUs=>{
      this.contactNum = contactUs.contactNum;
      this.address = contactUs.address;
    })
  }
}
