import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    { provide: Window, useValue: window }
  ],
})
export class AppComponent {
  title = 'angular-metamask';
  window : any  ;
  ethereum : any;
  account = "";
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView;


  }

  public async connect() {
    if (typeof this.window.ethereum !== 'undefined') {
      this.ethereum = this.window.ethereum;
      const accounts = await this.ethereum.request({method: 'eth_requestAccounts'});
      if (accounts.length > 0) {
        this.account = accounts[0];
      } else {
        console.log('No Account');
      }
    }
  }

  public async transaction(){
    let account = this.account;
    let params = [
      {
        from: account,
        to: '0xd46e8dd67c5d32be8058bb8eb970870f07244567',
        gas: '0x76c0', // 30400
        gasPrice: '0x9184e72a000', // 10000000000000
        value: '0x9184e72a', // 2441406250
        data:
          '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675',
      },
    ];

    this.ethereum
      .request({
        method: 'eth_sendTransaction',
        params,
      })
      .then((result: any) => {
        console.log(result);
        // The result varies by RPC method.
        // For example, this method will return a transaction hash hexadecimal string on success.
      })
      .catch((error : any) => {
        alert("Error " + error.message);
      });
  }
}
